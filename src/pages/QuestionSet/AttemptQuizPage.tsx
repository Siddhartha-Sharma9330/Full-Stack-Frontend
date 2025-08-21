import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AttemptQuizForm from "../../components/QuestionSet/AttemptQuizForm";

export interface IAttempQuestionForm {
  _id: string;
  title: string;
  questions: IQuestion[];
  createdBy: string;
  __v: number;
}

export interface IQuestion {
  questionText: string;
  choices: IChoice[];
  _id: string;
}

export interface IChoice {
  label: string;
  text: string;
  _id: string;
  selected?: boolean;
}

function AttemptQuizPage() {
  const { id } = useParams();

  const [questionSets, setQuestionSet] = useState<IAttempQuestionForm>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken || !id) {
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      axios
        .get(`http://localhost:3000/api/question/set/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setQuestionSet(response?.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="attempt-quiz-page-container">
        <div className="attempt-quiz-content">
          <div className="loading-spinner">Loading Quiz...</div>
        </div>
      </div>
    );
  }

  if (!questionSets) {
    return (
      <div className="attempt-quiz-page-container">
        <div className="attempt-quiz-content">
          <h1>Quiz Not Found</h1>
          <div className="no-data-message">
            <p>The requested quiz could not be found.</p>
            <p>Please check the quiz ID and try again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="attempt-quiz-page-container">
      <div className="attempt-quiz-content">
        <AttemptQuizForm questionSet={questionSets} />
      </div>
    </div>
  );
}

export default AttemptQuizPage;