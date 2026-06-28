import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  HelpCircle, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Grid, 
  Award, 
  Sparkles, 
  Zap,
  Tag,
  Coins,
  ChevronRight,
  ShieldAlert,
  X
} from 'lucide-react';
import { Quiz, QuizQuestion, LeaderboardEntry } from '../types';

interface PuzzlesTabProps {
  quizzes: Quiz[];
  userPoints: number;
  onAddPoints: (points: number) => void;
  leaderboard: LeaderboardEntry[];
}

export default function PuzzlesTab({
  quizzes,
  userPoints,
  onAddPoints,
  leaderboard
}: PuzzlesTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<'quizzes' | 'sudoku' | 'logo' | 'rewards'>('quizzes');
  
  // 1. Quizzes state
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedPointsThisSession, setEarnedPointsThisSession] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // 2. Sudoku state
  const initialSudokuGrid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  const sudokuSolution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ];

  const [sudokuGrid, setSudokuGrid] = useState<number[][]>(initialSudokuGrid.map(row => [...row]));
  const [sudokuStatus, setSudokuStatus] = useState<'idle' | 'success' | 'fail'>('idle');
  const [sudokuErrors, setSudokuErrors] = useState<boolean[][]>(Array(9).fill(null).map(() => Array(9).fill(false)));

  // 3. Guess Logo state
  const logoItems = [
    {
      id: 'logo-1',
      imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=150', // curry mix / butter represent
      title: 'Which historical Indian brand is famous for "Tinned Butter" with a polka-dotted blue haired girl?',
      options: ['Britannia', 'Mother Dairy', 'Amul', 'Nandini'],
      correctAnswer: 2,
      hint: 'Utterly Butterly Delicious!',
      explanation: 'Amul is India\'s largest dairy cooperative, famous for its Amul Girl mascot launched in 1966.'
    },
    {
      id: 'logo-2',
      imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=150', // Coffee bean
      title: 'Which coffee house chain originated in Bengaluru in 1996 and is known as the popular student hangout?',
      options: ['Cafe Coffee Day', 'Starbucks', 'Third Wave Coffee', 'Blue Tokai'],
      correctAnswer: 0,
      hint: 'A lot can happen over coffee.',
      explanation: 'Cafe Coffee Day (CCD) opened its very first outlet on Brigades Road, Bengaluru, pioneering cyber cafes and coffee culture.'
    },
    {
      id: 'logo-3',
      imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=150', // Spicy powder
      title: 'Which Bengaluru spices enterprise was founded in 1924 by the Maiya family and makes iconic sambar mixes?',
      options: ['Everest', 'MDH', 'MTR Foods', 'Eastern Spices'],
      correctAnswer: 2,
      hint: 'Known for inventing Rava Idli during WWII.',
      explanation: 'Mavalli Tiffin Room (MTR) established its food packing unit, MTR Foods, bringing signature South Indian sambars and instant mixes globally.'
    }
  ];

  const [logoIndex, setLogoIndex] = useState(0);
  const [logoOptionSelected, setLogoOptionSelected] = useState<number | null>(null);
  const [logoSubmitted, setLogoSubmitted] = useState(false);
  const [logoPointsEarned, setLogoPointsEarned] = useState(0);

  // 4. Rewards redemption list
  const rewardsList = [
    { id: 'rw-1', title: '₹100 Swiggy Money Coupon', cost: 150, code: 'SWIGGYTADKA100' },
    { id: 'rw-2', title: 'Ultimate Bengaluru Foodie Guide PDF', cost: 200, code: 'BLRFOODIEPDF' },
    { id: 'rw-3', title: '1-Month Tadka Time Premium Pass', cost: 300, code: 'TADKAFREE30' },
    { id: 'rw-4', title: 'Restaurant Profitability spreadsheet', cost: 250, code: 'BIZTEMPLATEXLS' }
  ];

  const [redeemedReward, setRedeemedReward] = useState<{title: string, code: string} | null>(null);

  // Quiz helper functions
  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setQuizSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setEarnedPointsThisSession(0);
  };

  const handleOptionClick = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedOptionIdx(idx);
  };

  const handleQuizSubmit = () => {
    if (selectedOptionIdx === null || !selectedQuiz) return;
    const isCorrect = selectedOptionIdx === selectedQuiz.questions[currentQuestionIdx].correctAnswer;
    if (isCorrect) {
      setScore(s => s + 1);
    }
    setQuizSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (!selectedQuiz) return;
    const isLast = currentQuestionIdx === selectedQuiz.questions.length - 1;
    if (isLast) {
      const finalPercentage = score / selectedQuiz.questions.length;
      let pointsToAward = 0;
      if (finalPercentage === 1) pointsToAward = selectedQuiz.rewardPoints;
      else if (finalPercentage >= 0.5) pointsToAward = Math.floor(selectedQuiz.rewardPoints * 0.5);
      
      onAddPoints(pointsToAward);
      setEarnedPointsThisSession(pointsToAward);
      setQuizFinished(true);
    } else {
      setCurrentQuestionIdx(idx => idx + 1);
      setSelectedOptionIdx(null);
      setQuizSubmitted(false);
    }
  };

  // Sudoku helper functions
  const handleSudokuInput = (row: number, col: number, val: string) => {
    const num = parseInt(val);
    const newGrid = sudokuGrid.map((r, rIdx) => 
      r.map((c, cIdx) => {
        if (rIdx === row && cIdx === col) {
          return isNaN(num) || num < 1 || num > 9 ? 0 : num;
        }
        return c;
      })
    );
    setSudokuGrid(newGrid);
  };

  const verifySudoku = () => {
    let hasError = false;
    const newErrors = Array(9).fill(null).map(() => Array(9).fill(false));

    // Simple comparison against actual correct solution
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (sudokuGrid[r][c] !== 0 && sudokuGrid[r][c] !== sudokuSolution[r][c]) {
          newErrors[r][c] = true;
          hasError = true;
        }
      }
    }

    setSudokuErrors(newErrors);

    // Check if fully solved & correct
    const isFullySolved = sudokuGrid.every((row, rIdx) => 
      row.every((val, cIdx) => val === sudokuSolution[rIdx][cIdx])
    );

    if (isFullySolved) {
      setSudokuStatus('success');
      onAddPoints(200);
    } else if (hasError) {
      setSudokuStatus('fail');
    } else {
      // no conflicts but incomplete
      setSudokuStatus('idle');
      alert('Grid is looking correct so far, but incomplete. Keep solving!');
    }
  };

  const resetSudoku = () => {
    setSudokuGrid(initialSudokuGrid.map(row => [...row]));
    setSudokuStatus('idle');
    setSudokuErrors(Array(9).fill(null).map(() => Array(9).fill(false)));
  };

  // Guess the Logo helper
  const handleLogoOptionClick = (idx: number) => {
    if (logoSubmitted) return;
    setLogoOptionSelected(idx);
  };

  const handleLogoSubmit = () => {
    if (logoOptionSelected === null) return;
    const item = logoItems[logoIndex];
    const isCorrect = logoOptionSelected === item.correctAnswer;
    if (isCorrect) {
      onAddPoints(30);
      setLogoPointsEarned(30);
    } else {
      setLogoPointsEarned(0);
    }
    setLogoSubmitted(true);
  };

  const handleNextLogo = () => {
    if (logoIndex === logoItems.length - 1) {
      // finish loop, go back to first
      setLogoIndex(0);
    } else {
      setLogoIndex(idx => idx + 1);
    }
    setLogoOptionSelected(null);
    setLogoSubmitted(false);
    setLogoPointsEarned(0);
  };

  // Rewards redemption helper
  const handleRedeemReward = (reward: {id: string, title: string, cost: number, code: string}) => {
    if (userPoints < reward.cost) {
      alert(`Insufficient points. You need ${reward.cost - userPoints} more points to redeem this!`);
      return;
    }
    onAddPoints(-reward.cost);
    setRedeemedReward({ title: reward.title, code: reward.code });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8" id="puzzles-arena">
      {/* Tab Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6 sm:p-8 text-white shadow-xl shadow-amber-500/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <span className="bg-white/20 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
            Tadka Games Hub
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">
            Play & Earn Loyalty Rewards
          </h2>
          <p className="text-sm text-amber-50/90 mt-1 max-w-md">
            Solve our food trivia quizzes, decode Sudoku, or guess iconic logos to rack up points to redeem for free guidebooks and premium coupons!
          </p>
        </div>
        <div className="flex flex-col items-center justify-center bg-white/10 px-6 py-4 rounded-2xl backdrop-blur-sm border border-white/20">
          <span className="text-xs text-amber-100 font-semibold uppercase">Your Wallet Balance</span>
          <div className="flex items-center gap-2 mt-1">
            <Coins className="h-6 w-6 text-yellow-300 animate-spin" />
            <span className="text-3xl font-black text-white">{userPoints} pts</span>
          </div>
        </div>
      </div>

      {/* Internal Navigation Subtabs */}
      <div className="flex border-b mb-8 dark:border-neutral-800 overflow-x-auto scrollbar-none gap-2">
        <button
          onClick={() => { setActiveSubTab('quizzes'); setSelectedQuiz(null); }}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'quizzes' 
              ? 'border-amber-500 text-amber-600 dark:text-amber-400' 
              : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          Daily Quizzes
        </button>

        <button
          onClick={() => setActiveSubTab('sudoku')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'sudoku' 
              ? 'border-amber-500 text-amber-600 dark:text-amber-400' 
              : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
          }`}
        >
          <Grid className="h-4 w-4" />
          Interactive Sudoku
        </button>

        <button
          onClick={() => setActiveSubTab('logo')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'logo' 
              ? 'border-amber-500 text-amber-600 dark:text-amber-400' 
              : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
          }`}
        >
          <Zap className="h-4 w-4" />
          Guess the Logo
        </button>

        <button
          onClick={() => setActiveSubTab('rewards')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'rewards' 
              ? 'border-amber-500 text-amber-600 dark:text-amber-400' 
              : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
          }`}
        >
          <Award className="h-4 w-4" />
          Leaderboard & Rewards
        </button>
      </div>

      {/* Render Subtab Core */}
      <div>
        {/* 1. DAILY QUIZZES SUBTAB */}
        {activeSubTab === 'quizzes' && (
          <div>
            {!selectedQuiz ? (
              // Quiz selection grid
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                  <div 
                    key={quiz.id}
                    className="group border rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition dark:border-neutral-800 dark:bg-neutral-950 flex flex-col justify-between min-h-[190px]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full dark:bg-amber-950/40">
                          {quiz.category}
                        </span>
                        <span className="text-xs text-neutral-400 font-semibold">{quiz.questions.length} Questions</span>
                      </div>
                      <h4 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-amber-500 transition line-clamp-1">
                        {quiz.title}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                        {quiz.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t flex items-center justify-between dark:border-neutral-900">
                      <div className="text-xs font-semibold text-neutral-400 flex items-center gap-1">
                        <Coins className="h-3.5 w-3.5 text-amber-500" />
                        <span className="text-amber-600 dark:text-amber-400">+{quiz.rewardPoints} points potential</span>
                      </div>
                      <button
                        onClick={() => handleQuizSelect(quiz)}
                        className="rounded-lg bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1"
                      >
                        <span>Start Play</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Quiz Active Playboard
              <div className="max-w-2xl mx-auto border rounded-2xl bg-white p-6 shadow-md dark:border-neutral-800 dark:bg-neutral-950">
                {!quizFinished ? (
                  <div>
                    {/* Header progress bar */}
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-4 font-semibold">
                      <span>{selectedQuiz.title}</span>
                      <span>Question {currentQuestionIdx + 1} of {selectedQuiz.questions.length}</span>
                    </div>

                    <div className="w-full bg-neutral-100 h-1.5 rounded-full mb-6 overflow-hidden dark:bg-neutral-900">
                      <div 
                        className="bg-orange-600 h-full transition-all duration-300 shadow-sm"
                        style={{ width: `${((currentQuestionIdx + 1) / selectedQuiz.questions.length) * 100}%` }}
                      />
                    </div>

                    {/* Question text */}
                    <h3 className="text-lg font-extrabold text-neutral-950 dark:text-white leading-snug mb-6">
                      {selectedQuiz.questions[currentQuestionIdx].question}
                    </h3>

                    {/* Options list */}
                    <div className="space-y-3 mb-6">
                      {selectedQuiz.questions[currentQuestionIdx].options.map((opt, idx) => {
                        let btnStyle = "border-neutral-200 hover:border-orange-200 hover:bg-orange-50/20 dark:border-neutral-800 dark:hover:border-neutral-700";
                        
                        if (selectedOptionIdx === idx) {
                          btnStyle = "border-orange-500 bg-orange-50/30 text-orange-600 dark:bg-orange-950/20";
                        }
                        
                        if (quizSubmitted) {
                          const isCorrect = idx === selectedQuiz.questions[currentQuestionIdx].correctAnswer;
                          if (isCorrect) {
                            btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20";
                          } else if (selectedOptionIdx === idx) {
                            btnStyle = "border-red-500 bg-red-50 text-red-600 dark:bg-red-950/20";
                          } else {
                            btnStyle = "border-neutral-200 opacity-60 dark:border-neutral-800";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            disabled={quizSubmitted}
                            onClick={() => handleOptionClick(idx)}
                            className={`w-full p-4 rounded-xl border text-left text-sm font-semibold transition flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && idx === selectedQuiz.questions[currentQuestionIdx].correctAnswer && (
                              <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                            )}
                            {quizSubmitted && selectedOptionIdx === idx && idx !== selectedQuiz.questions[currentQuestionIdx].correctAnswer && (
                              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Submit and Next footer controls */}
                    <div className="flex justify-end gap-3">
                      {!quizSubmitted ? (
                        <button
                          onClick={handleQuizSubmit}
                          disabled={selectedOptionIdx === null}
                          className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50 px-6 py-2.5 text-xs font-bold transition"
                        >
                          Submit Answer
                        </button>
                      ) : (
                        <button
                          onClick={handleNextQuestion}
                          className="rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 px-6 py-2.5 text-xs font-bold transition flex items-center gap-1 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
                        >
                          <span>{currentQuestionIdx === selectedQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Explanation window */}
                    {quizSubmitted && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 rounded-xl bg-neutral-50 border dark:bg-neutral-900 dark:border-neutral-800"
                      >
                        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block mb-1">Culinary Trivia Fact:</span>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                          {selectedQuiz.questions[currentQuestionIdx].explanation}
                        </p>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  // Quiz Finish results summary
                  <div className="text-center py-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 shadow-inner">
                      <Trophy className="h-8 w-8 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-extrabold text-neutral-950 dark:text-white">Quiz Completed!</h3>
                    <p className="text-sm text-neutral-500 mt-2">
                      You scored <span className="font-bold text-orange-500">{score} out of {selectedQuiz.questions.length}</span> correct answers.
                    </p>

                    <div className="mt-6 inline-flex flex-col items-center bg-orange-50/50 border border-orange-200 rounded-xl p-4 dark:bg-orange-950/10 dark:border-orange-900/30">
                      <span className="text-xs text-neutral-500">Reward points added:</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Coins className="h-5 w-5 text-yellow-500 animate-spin" />
                        <span className="text-2xl font-black text-orange-600 dark:text-orange-400">+{earnedPointsThisSession} PTS</span>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-4">
                      <button
                        onClick={() => setSelectedQuiz(null)}
                        className="rounded-lg border border-neutral-200 hover:bg-neutral-50 px-6 py-2.5 text-xs font-bold transition dark:border-neutral-800 dark:hover:bg-neutral-900"
                      >
                        Back to Quizzes
                      </button>
                      <button
                        onClick={() => handleQuizSelect(selectedQuiz)}
                        className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 text-xs font-bold transition shadow-sm"
                      >
                        Retry Quiz
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 2. INTERACTIVE SUDOKU SUBTAB */}
        {activeSubTab === 'sudoku' && (
          <div className="max-w-2xl mx-auto">
            <div className="border border-slate-200 rounded-xl bg-white p-6 shadow-md dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div>
                  <h4 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-1.5">
                    <Grid className="h-4.5 w-4.5 text-orange-600 animate-pulse" />
                    <span>Daily Spicy Sudoku Challenge</span>
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">Fill the blank slots with numbers 1-9 without duplicate conflicts.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={resetSudoku}
                    className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-bold text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* 9x9 Sudoku Board Container */}
              <div className="flex justify-center mb-6">
                <div className="grid grid-cols-9 border-2 border-neutral-950 bg-neutral-950 gap-[1px] p-[1px] rounded-lg max-w-[360px] sm:max-w-[400px] w-full aspect-square">
                  {sudokuGrid.map((row, rIdx) => 
                    row.map((val, cIdx) => {
                      const isPrepopulated = initialSudokuGrid[rIdx][cIdx] !== 0;
                      const isErroneous = sudokuErrors[rIdx][cIdx];
                      
                      // Add heavy boundaries between 3x3 blocks
                      const rightBorder = (cIdx + 1) % 3 === 0 && cIdx < 8 ? 'border-r-2 border-r-neutral-950' : '';
                      const bottomBorder = (rIdx + 1) % 3 === 0 && rIdx < 8 ? 'border-b-2 border-b-neutral-950' : '';

                      let cellColor = isPrepopulated 
                        ? 'bg-neutral-100 text-neutral-800 font-extrabold dark:bg-neutral-900 dark:text-neutral-200' 
                        : 'bg-white text-orange-600 font-semibold dark:bg-neutral-950';

                      if (isErroneous) {
                        cellColor = 'bg-red-50 text-red-600 font-bold dark:bg-red-950/40';
                      }

                      return (
                        <div 
                          key={`${rIdx}-${cIdx}`}
                          className={`flex items-center justify-center relative ${rightBorder} ${bottomBorder}`}
                        >
                          {isPrepopulated ? (
                            <span className={`w-full h-full flex items-center justify-center text-sm ${cellColor}`}>
                              {val}
                            </span>
                          ) : (
                            <input
                              type="text"
                              maxLength={1}
                              pattern="[1-9]"
                              value={val === 0 ? '' : val}
                              onChange={(e) => handleSudokuInput(rIdx, cIdx, e.target.value)}
                              className={`w-full h-full text-center text-sm focus:bg-orange-50 outline-none transition-colors ${cellColor}`}
                            />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Status Alert */}
              {sudokuStatus === 'success' && (
                <div className="mb-6 p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 flex items-center gap-3 dark:bg-emerald-950/20 dark:border-emerald-900 dark:text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <div>
                    <h5 className="text-xs font-bold uppercase">Sudoku Decoded Successfully!</h5>
                    <p className="text-xs">Congratulations! We awarded +200 loyalty points to your account.</p>
                  </div>
                </div>
              )}

              {sudokuStatus === 'fail' && (
                <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 flex items-center gap-3 dark:bg-red-950/20 dark:border-red-900 dark:text-red-400">
                  <ShieldAlert className="h-5 w-5" />
                  <div>
                    <h5 className="text-xs font-bold uppercase">Validation Conflicts Found</h5>
                    <p className="text-xs">Some cells (highlighted in red) do not match the target solution. Try reviewing your values!</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={verifySudoku}
                  className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 text-xs font-bold transition shadow-md shadow-orange-500/10"
                >
                  Verify Solutions
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. GUESS THE LOGO SUBTAB */}
        {activeSubTab === 'logo' && (
          <div className="max-w-xl mx-auto">
            <div className="border border-slate-200 rounded-xl bg-white p-6 shadow-md dark:border-neutral-800 dark:bg-neutral-950 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 px-3 py-1 rounded-full dark:bg-orange-950/40">
                Logo Quiz Mini-Game
              </span>
              <h4 className="text-lg font-extrabold text-neutral-950 dark:text-white mt-3">
                Can You Guess the Indian Culinary Brand?
              </h4>

              {/* Blurred / descriptive visual container */}
              <div className="my-6 mx-auto w-32 h-32 rounded-xl overflow-hidden border border-neutral-100 bg-gradient-to-tr from-orange-500/10 to-red-500/10 flex items-center justify-center p-4 shadow-inner dark:border-neutral-900">
                <div className="text-center">
                  <HelpCircle className="h-10 w-10 text-orange-500/40 mx-auto animate-pulse" />
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-2 block">Logo Hidden</span>
                </div>
              </div>

              {/* Title / Question */}
              <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200 leading-relaxed px-4 mb-6">
                {logoItems[logoIndex].title}
              </p>

              {/* Options */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {logoItems[logoIndex].options.map((opt, idx) => {
                  let btnStyle = "border-neutral-200 hover:border-orange-200 hover:bg-orange-50/20 dark:border-neutral-800 dark:hover:border-neutral-700";
                  
                  if (logoOptionSelected === idx) {
                    btnStyle = "border-orange-500 bg-orange-50/30 text-orange-600 dark:bg-orange-950/20";
                  }

                  if (logoSubmitted) {
                    const isCorrect = idx === logoItems[logoIndex].correctAnswer;
                    if (isCorrect) {
                      btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20";
                    } else if (logoOptionSelected === idx) {
                      btnStyle = "border-red-500 bg-red-50 text-red-600 dark:bg-red-950/20";
                    } else {
                      btnStyle = "border-neutral-200 opacity-60 dark:border-neutral-800";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={logoSubmitted}
                      onClick={() => handleLogoOptionClick(idx)}
                      className={`p-3 rounded-xl border text-center text-xs sm:text-sm font-bold transition ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation / Result */}
              {logoSubmitted && (
                <div className="mb-6 p-4 rounded-xl bg-neutral-50 border text-left dark:bg-neutral-900 dark:border-neutral-800">
                  <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-neutral-800 dark:text-neutral-100">
                    {logoOptionSelected === logoItems[logoIndex].correctAnswer ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span className="text-emerald-600 font-black">Correct! (+{logoPointsEarned} pts)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-red-600 font-black">Wrong Choice!</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {logoItems[logoIndex].explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end">
                {!logoSubmitted ? (
                  <button
                    onClick={handleLogoSubmit}
                    disabled={logoOptionSelected === null}
                    className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50 px-6 py-2 text-xs font-bold transition shadow-md"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextLogo}
                    className="rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 px-6 py-2 text-xs font-bold transition flex items-center gap-1 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
                  >
                    <span>Next Brand</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4. LEADERBOARD & REWARDS CATALOG */}
        {activeSubTab === 'rewards' && (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Col: Leaderboard */}
            <div className="md:col-span-1 border border-slate-200 rounded-xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
              <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-1">
                <Trophy className="h-4.5 w-4.5 text-orange-600" />
                <span>Namma Leaderboard</span>
              </h4>

              <div className="space-y-3">
                {leaderboard.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-bold ${
                      idx === 0 
                        ? 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950/20' 
                        : 'border-neutral-50 dark:border-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] ${
                        idx === 0 ? 'bg-orange-600 text-white shadow-sm' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                      }`}>
                        {item.rank}
                      </span>
                      <span className="dark:text-neutral-200 truncate max-w-[100px]">{item.name}</span>
                    </div>
                    <span className="text-neutral-500 dark:text-neutral-400 text-[11px]">{item.points} pts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Rewards Catalog Grid */}
            <div className="md:col-span-2 space-y-6">
              <div className="border border-slate-200 rounded-xl bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="h-4.5 w-4.5 text-orange-600" />
                  <span>Rewards Catalog</span>
                </h4>

                {/* Core Rewards list */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {rewardsList.map((reward) => {
                    const isAffordable = userPoints >= reward.cost;
                    return (
                      <div 
                        key={reward.id}
                        className="p-4 rounded-xl border border-neutral-100 bg-neutral-50/50 flex flex-col justify-between dark:border-neutral-900 dark:bg-neutral-900/40"
                      >
                        <div>
                          <h5 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white leading-snug">{reward.title}</h5>
                          <div className="flex items-center gap-1 mt-1 text-xs font-bold text-orange-600 dark:text-orange-400">
                            <Coins className="h-3.5 w-3.5 animate-pulse" />
                            <span>{reward.cost} points cost</span>
                          </div>
                        </div>

                        <button
                          disabled={!isAffordable}
                          onClick={() => handleRedeemReward(reward)}
                          className={`mt-4 w-full py-1.5 rounded-lg text-xs font-extrabold text-center transition ${
                            isAffordable
                              ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-sm'
                              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed dark:bg-neutral-800 dark:text-neutral-600'
                          }`}
                        >
                          Redeem Reward
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Redemption Display Modal / Toast */}
              {redeemedReward && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 border border-orange-200 rounded-xl bg-orange-50/50 text-left relative dark:bg-orange-950/20 dark:border-orange-900"
                >
                  <button 
                    onClick={() => setRedeemedReward(null)}
                    className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-orange-600 animate-bounce" />
                    <h5 className="text-sm font-bold text-orange-800 dark:text-orange-300">Congratulations! Code Unlocked</h5>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    You spent points to unlock: <span className="font-extrabold text-neutral-800 dark:text-white">{redeemedReward.title}</span>.
                  </p>
                  
                  <div className="mt-3 flex items-center justify-between bg-white border border-dashed p-3 rounded-lg dark:bg-neutral-950 dark:border-neutral-800">
                    <span className="font-mono text-xs font-bold text-neutral-500 tracking-wider">Your Promo Code:</span>
                    <span className="font-mono text-sm font-extrabold text-orange-600 select-all tracking-widest">{redeemedReward.code}</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-2">Double click code to copy. Use at payment gateway checks!</p>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
