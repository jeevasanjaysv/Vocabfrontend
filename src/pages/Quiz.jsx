import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from '../assets/Lixiphile.png'

function Quiz() {
  const [words, setWords] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [options, setOptions] = useState([]);
  const [mistakes,setmistakes]=useState([]);
  let updateScore;

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    const res = await axios.get(
      `https://vocabbackend-5h4t.onrender.com/words?u_id=${user.id}`
    );
    setWords(shuffle(res.data).slice(0, 5));
  };

  const shuffle = (arr) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  updateScore = score;

  const nextQuestion = () => {
    if (selected === words[current].Meaning) {
      updateScore = score + 1;
      setScore(updateScore);
    } else {
      setmistakes([...mistakes, words[current].word]);
    }

    setSelected("");

    if (current + 1 < words.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
      saveQuiz(updateScore);
    }
  };

  useEffect(() => {
    if (words.length > 0) {
      const correct = words[current].Meaning;
      const meanings = words.map(w => w.Meaning);

      const wrongOptions = shuffle(
        meanings.filter(m => m !== correct)
      ).slice(0, 3);

      setOptions(shuffle([correct, ...wrongOptions]));
    }
  }, [current, words]);

  const saveQuiz = async (updateScore) => {
    await axios.post("https://vocabbackend-5h4t.onrender.com/quizzes", {
      id: Date.now(),
      u_id: user.id,
      Score: updateScore,
      totalQuestions: words.length,
      date: new Date().toLocaleString()
    });
  };

  if (words.length === 0) {
    return <p className="text-center mt-10 text-lg sm:text-xl">Add words first to take quiz.</p>;
  }

  return (
    <>
    <div > 

      {/* Header */}
      <div className="relative h-20 sm:h-24 bg-[#2563eb] flex justify-center items-center shadow-lg">
        <h1 className="text-2xl sm:text-3xl italic font-semibold text-white">
          Vocabulary Quiz
           <img
            src={logo}
            alt="App Logo"
            className="absolute
                      left-4
                      bottom-2
                      h-25 w-60"
          />

        </h1>

        <Link
          to="/dashboard"
          className="absolute left-4 sm:left-6 bottom-3 sm:bottom-2
                     bg-white text-[#2563eb]
                     px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl
                     border border-[#3b82f6]
                     shadow-md hover:bg-blue-100 transition">
          ← Back
        </Link>
      </div>

      {/* Quiz Container */}
      <div className="max-w-2xl mx-auto mt-12 sm:mt-16
                      p-6 sm:p-10
                      bg-white rounded-3xl shadow-2xl">

        {showResult ? (
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-green-600">
              Quiz Completed 🎉
            </h2>

            <p className="italic text-gray-600 text-sm sm:text-lg">
              Great job for completing the quiz — every attempt makes you smarter! 🚀
            </p>

            <p className="text-lg sm:text-xl">
              Score: <span className="font-bold">{score}</span> / {words.length}
            </p>

            {mistakes.length !== 0 && (
              <div className="mt-6 p-4 sm:p-5 rounded-2xl
                              border-2 border-red-300 bg-red-50 space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-red-600">
                  Wrong Answers ❌
                </h3>

                <p className="text-sm text-gray-600 italic">
                  Don’t worry — mistakes are proof that you’re learning.
                </p>

                <ul className="space-y-1">
                  {mistakes.map((e, i) => (
                    <li
                      key={i}
                      className="px-4 py-2 rounded-xl
                                 bg-white border border-red-200
                                 shadow-sm text-sm sm:text-base">
                      {e}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/wordlist"
                  className="inline-block mt-4 px-6 py-2 rounded-2xl
                             bg-[#2563eb] text-white
                             border-2 border-black
                             hover:bg-[#1d4ed8] transition">
                  Word List
                </Link>
              </div>
            )}

            <button
              onClick={() => navigate("/dashboard")}
              className="mt-6 px-6 py-2 rounded-2xl
                         bg-[#2563eb] text-white
                         border-2 border-black
                         hover:bg-[#1d4ed8] transition">
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-sm sm:text-lg text-gray-600">
              Question {current + 1} / {words.length}
            </h3>

            <h2 className="text-lg sm:text-2xl font-semibold">
              What is the meaning of
              <span className="text-[#2563eb]"> "{words[current].word}"</span>?
            </h2>

            <div className="space-y-3">
              {options.map((opt, i) => (
                <label
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-xl
                              border cursor-pointer
                              ${selected === opt
                                ? "bg-blue-100 border-[#2563eb]"
                                : "hover:bg-gray-100"}`}
                >
                  <input
                    type="radio"
                    name="option"
                    value={opt}
                    checked={selected === opt}
                    onChange={() => setSelected(opt)}
                  />
                  <span className="text-sm sm:text-base">{opt}</span>
                </label>
              ))}
            </div>

            <button
              disabled={!selected}
              onClick={nextQuestion}
              className={`mt-4 px-5 sm:px-6 py-2 rounded-2xl border-2 border-black
                ${selected
                  ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                  : "bg-gray-300 cursor-not-allowed"}`}
            >
              Next
            </button>
          </div>
        )}
      </div>

    </div>
    </>
  );
}

export default Quiz;
