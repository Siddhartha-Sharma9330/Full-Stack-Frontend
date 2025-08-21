import type { IAttempQuestionForm } from "../../pages/QuestionSet/AttemptQuizPage";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { p } from "framer-motion/client";

export interface IAttemptQuizFinalData {
  questionSet: string;
  responses: {
    questionId: string;
    selectedChoicesIds: string[];
  }[];
}

interface IAnswer{
  score: number;
  total: number;
}

function AttemptQuizForm({
  questionSet,
}: {
  questionSet: IAttempQuestionForm;
}) {

  const [answer, setAnswer] = useState<IAnswer | null>(null);
  const defaultValues: IAttempQuestionForm = {
    ...questionSet,
  };
  const methods = useForm({ defaultValues });

  const { watch, register, handleSubmit } = methods;
  console.log("form values => ", watch());

  const onSubmitHandler = (data: IAttempQuestionForm) => {
    const accessToken = localStorage.getItem("accessToken");

    const finalData: IAttemptQuizFinalData = {
      questionSet: data?._id,
      responses: data?.questions?.map((question) => {
        return {
          questionId: question?._id,
          selectedChoicesIds: question?.choices
            ?.filter((choice) => choice?.selected)
            ?.map((ch) => ch?._id),
        };
      }),
    };

    axios
      .post("http://localhost:3000/api/question/answer/attempt", finalData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        alert("Answer Updated Successfully");
        const data =res.data.data;
        setAnswer(data);
      })
      .catch((err) => {});
  };

  if(answer?.score){
    return (
      <p>
        Your score is {answer?.score} out of {answer?.total}.
      </p>
    );
  }

  return (
    <div className="attempt-quiz-form">
      <h1 className="quiz-title">{questionSet.title}</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="quiz-form">
          <CreateQuestions />
          <button type="submit" className="submit-quiz-btn">Submit Answer</button>
        </form>
      </FormProvider>
    </div>
  );
}

function CreateQuestions() {
  const { control } = useFormContext<IAttempQuestionForm>();

  const { fields } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <div className="questions-container">
      {fields?.map((field, index) => {
        return (
          <div key={index} className="question-card">
            <h3 className="question-text">Q{index + 1}. {field?.questionText}</h3>
            <CreateChoices questionIndex={index} />
          </div>
        );
      })}
    </div>
  );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
  const { register, control } = useFormContext<IAttempQuestionForm>();

  const { fields } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  return (
    <div className="choices-container">
      {fields?.map((field, index) => {
        return (
          <div key={index} className="choice-item">
            <input
              type="checkbox"
              className="choice-checkbox"
              {...register(
                `questions.${questionIndex}.choices.${index}.selected`
              )}
            />
            <label className="choice-label">{field?.text}</label>
          </div>
        );
      })}
    </div>
  );
}

export default AttemptQuizForm;