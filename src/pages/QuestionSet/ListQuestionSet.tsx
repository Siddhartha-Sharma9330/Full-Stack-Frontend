import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IListQuestionSet {
  _id: string;
  title: string;
  questionCount: number;
}

function ListQuestionSet() {
  const [questionSets, setQuestionSet] = useState<IListQuestionSet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      axios
        .get("http://localhost:3000/api/question/set/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setQuestionSet(response?.data?.questionSet);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="question-set-page-container">
        <div className="question-set-content">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (questionSets.length === 0) {
    return (
      <div className="question-set-page-container">
        <div className="question-set-content">
          <h1>My Question Sets</h1>
          <div className="no-data-message">
            <p>No question sets found.</p>
            <p>Create your first question set to get started!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="question-set-page-container">
      <div className="question-set-content">
        <h1>My Question Sets</h1>
        <div className="question-sets-grid">
          {questionSets.map((question) => {
            const TakeQuizHandler = () => {
              Navigate(`/questionset/${question._id}/attempt`);
            };
            return (
              <div key={question._id} className="question-set-card">
                <div className="question-set-info">
                  <h3 className="question-set-title">{question.title}</h3>
                  <p className="question-set-count">
                    {question.questionCount} questions
                  </p>
                </div>
                <button className="take-quiz-btn" onClick={TakeQuizHandler}>
                  Take Quiz
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ListQuestionSet;