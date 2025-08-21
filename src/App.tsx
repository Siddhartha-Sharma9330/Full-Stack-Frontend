import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import OtherProfilePage from './pages/OtherProfilePage';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import CreateQuestionSetPage from './pages/QuestionSet/CreateQuestionSetPage';
import { jwtDecode } from 'jwt-decode';
import ListQuestionSet from './pages/QuestionSet/ListQuestionSet';
import AttemptQuizPage from './pages/QuestionSet/AttemptQuizPage';

export interface IAuthState {
  isAuth: boolean;
  roleState: "admin" | "professional" | "guest";
}

export interface IAuthContext extends IAuthState {
  setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>;
}

export interface JWTDecode {
  role: "admin" | "professional";
  id: string;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  roleState: "guest",
  setAuthState: () => {},
});

function App() {
  const [authState, setAuthState] = useState<IAuthState>({
    isAuth: false,
    roleState: "guest",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log("state =>", authState);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLoading(false);
      alert("Access token not found. Please log in.");
      return;
    }

    async function fetchData() {
      try {
        await axios
          .get("http://localhost:3000/api/verify/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(() => {
            const { role }: JWTDecode = jwtDecode<JWTDecode>(accessToken as string);
            setAuthState((prev) => ({
              ...prev,
              roleState: role,
              isAuth: true,
            }));
            setIsLoading(false);
          });
      } catch (error) {
        localStorage.clear();
        setIsLoading(false);
        console.error("Authentication failed", error);
      }
    }

    fetchData();
  }, []);

  if (isLoading) return <p>Loading</p>;

  return (
    <AuthContext.Provider
      value={{
        isAuth: authState.isAuth,
        roleState: authState.roleState,
        setAuthState,
      }}
    >
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />

            {!authState?.isAuth && (
              <>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
              </>
            )}

            {authState?.isAuth && (
              <>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/edit" element={<ProfileEditPage />} />
                <Route path="/profile/view/:userId" element={<OtherProfilePage />} />
                <Route path="/questionset/list" element={<ListQuestionSet />} />
                <Route path="/questionset/:id/attempt" element={<AttemptQuizPage />} />
              </>
            )}

            {authState?.roleState === "admin" && (
              <>
                <Route path="/admin/questionset/create" element={<CreateQuestionSetPage />} />
              </>
            )}

            <Route path="/*" element={<div>404 Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
