import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from '../assets/Lixiphile.png'

function Progress() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [totalWords, setTotalWords] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    const wordsRes = await axios.get(
      `https://vocabbackend-5h4t.onrender.com/words?u_id=${user.id}`
    );
    setTotalWords(wordsRes.data.length);

    const quizRes = await axios.get(
      `https://vocabbackend-5h4t.onrender.com/quizzes?u_id=${user.id}`
    );
    setQuizCount(quizRes.data.length);

    if (quizRes.data.length > 0) {
      const totalScore = quizRes.data.reduce(
        (sum, q) => sum + q.Score,
        0
      );
      const totalQuestions = quizRes.data.reduce(
        (sum, q) => sum + q.totalQuestions,
        0
      );
      setAvgScore(Math.round((totalScore / totalQuestions) * 100));
    } else {
      setAvgScore(0);
    }
  };

  return (
    <div >

      {/* Header */}
      <div className="relative h-24 bg-[#2563eb] flex justify-center items-center shadow-lg">
        <h1 className="text-3xl italic font-semibold text-white">
          Your Progress
          <img
            src={logo}
            alt="App Logo"
            className="absolute
                      left-4
                      bottom-2
                      h-25 w-50"
          />
        </h1>

        <Link
          to="/dashboard"
          className="absolute left-6 bottom-2
                     bg-white text-[#2563eb]
                     px-4 py-2 rounded-xl
                     border border-[#3b82f6]
                     shadow-md hover:bg-blue-100 transition">
          ← Back
        </Link>
      </div>

      {/* Progress Card */}
      <div className="max-w-3xl mx-auto mt-20 p-10
                      bg-white rounded-3xl shadow-2xl">

        <p className="text-center italic text-gray-600 mb-8 text-lg">
          “Consistency beats intensity. Every word you learn is a step forward 🚀”
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

          <div className="p-6 bg-blue-100 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-blue-700">
              Total Words
            </h3>
            <p className="text-3xl font-bold mt-2">
              {totalWords}
            </p>
          </div>

          <div className="p-6 bg-emerald-100 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-emerald-700">
              Quizzes Taken
            </h3>
            <p className="text-3xl font-bold mt-2">
              {quizCount}
            </p>
          </div>

          <div className="p-6 bg-blue-100 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-blue-700">
              Average Score
            </h3>
            <p className="text-3xl font-bold mt-2">
              {avgScore}%
            </p>
          </div>

        </div>

        <p className="text-center mt-10 text-lg text-gray-700">
          Keep practicing daily — your vocabulary power is growing 💪📘
        </p>

      </div>

    </div>
  );
}

export default Progress;
