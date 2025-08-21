import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import axios from 'axios';
import { useRef } from 'react';
import "../../index.css"; // Ensure your CSS file is imported

interface QuestionSetForm {
    title: string;
    file: FileList | null; // Add file property
    questions: {
        questionText: string;
        choices: {
            label: string;
            text: string;
            correctAnswer: boolean;
        }[];
    }[];
}

function CreateQuestionSetForm() {
    const defaultValues: QuestionSetForm = {
        title: '',
        file: null, // Initialize file as null
        questions: [{
            questionText: '',
            choices: []
        }],
    };

    const methods = useForm({ defaultValues });
    const { register, handleSubmit, reset } = methods;
    const accessToken = localStorage.getItem("accessToken");

    const onSubmitHandler = (data: QuestionSetForm) => {
        const formData = new FormData();
        formData.append('title', data.title);
        if (data.file) {
            formData.append('file', data.file[0]); // Append the first file
        }
        formData.append('questions', JSON.stringify(data.questions)); // Append questions as JSON string

        axios.post("http://localhost:3000/api/admin/questionset/create", formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data', // Set content type for file upload
            }
        })
        .then((response) => {
            alert("Question set Created Successfully");
            reset(); // Reset the form after successful submission
        })
        .catch((error) => {
            alert("Failed to create question set");
        });
    };

    return (
        <div>
            <FormProvider {...methods}>
                <form className="create-question-form" onSubmit={handleSubmit(onSubmitHandler)}>
                    <label>Enter your Title</label>
                    <input {...register('title')} placeholder={"Title"} />

                    <label>Upload a File</label>
                    <input type="file" {...register('file')} className="file-input" />

                    <CreateQuestions />
                    <button type="submit" className="submit-question-set-btn">Create QuestionSet</button>
                </form>
            </FormProvider>
        </div>
    );
}

function CreateQuestions() {
    const { register, control } = useFormContext<QuestionSetForm>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions"
    });

    const AddQuestionHandler = () => {
        append({ questionText: '', choices: [] });
    };

    return (
        <div className="questions-section">
            <h1>Add your Questions</h1>
            {fields.map((field, index) => {
                const RemoveQuestionHandler = () => remove(index);

                return (
                    <div key={field.id} className="question-container">
                        <input {...register(`questions.${index}.questionText`)} placeholder="Enter your Question" />
                        <div className="question-actions">
                            <button type="button" className="btn-danger" onClick={RemoveQuestionHandler}>Remove Question</button>
                        </div>
                        <CreateChoices questionIndex={index} />
                    </div>
                );
            })}
            <div className="action-buttons">
                <button type="button" className="btn-primary" onClick={AddQuestionHandler}>Add Questions</button>
            </div>
        </div>
    );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
    const { register, control } = useFormContext<QuestionSetForm>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `questions.${questionIndex}.choices`,
    });

    const AddChoicesHandler = () => {
        append({ label: fields?.length.toString(), text: '', correctAnswer: false });
    };

    return (
        <div className="choices-section">
            {fields.map((field, index) => {
                const RemoveChoiceHandler = () => remove(index);

                return (
                    <div key={field.id} className="choice-container">
                        <input type="checkbox" {...register(`questions.${questionIndex}.choices.${index}.correctAnswer`)} />
                        <input {...register(`questions.${questionIndex}.choices.${index}.text`)} placeholder="Enter your Choice" />
                        <button type="button" className="btn-danger" onClick={RemoveChoiceHandler}>Remove Choice</button>
                    </div>
                );
            })}
            <div className="choice-actions">
                <button type="button" className="btn-secondary" onClick={AddChoicesHandler}>Add Choices</button>
            </div>
        </div>
    );
}

export default CreateQuestionSetForm;
