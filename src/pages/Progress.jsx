import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      `http://localhost:4000/words?u_id=${user.id}`
    );
    setTotalWords(wordsRes.data.length);

    const quizRes = await axios.get(
      `http://localhost:4000/quizzes?u_id=${user.id}`
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
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-white to-[#ae24f6]">

     
      <div className="relative h-24 bg-[#641c93] flex justify-center items-center shadow-lg">
        <h1 className="text-3xl italic font-semibold text-white">
          Your Progress
        </h1>

       
        <Link
             to="/dashboard"
              className="absolute left-6 bottom-4
              bg-white text-[#641c93]
               px-4 py-2 rounded-xl
              border border-[#ae24f6]
             shadow-md hover:bg-violet-200 transition">
                    ← Back
        </Link>
      </div>

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

          <div className="p-6 bg-green-100 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-green-700">
              Quizzes Taken
            </h3>
            <p className="text-3xl font-bold mt-2">
              {quizCount}
            </p>
          </div>

          <div className="p-6 bg-purple-100 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-purple-700">
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
