
// UMD module exposing quiz core functions to both browser and Node (for tests)
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.quizCore = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  function computeScore(userAnswers, questions) {
    if (!Array.isArray(userAnswers) || !Array.isArray(questions)) return 0;
    const len = Math.min(userAnswers.length, questions.length);
    let score = 0;
    for (let i = 0; i < len; i++) {
      const q = questions[i];
      const a = userAnswers[i];
      if (q && Number.isInteger(a) && a === q.answerIndex) score += 1;
    }
    return score;
  }
  function validateAnswerIndex(answerIndex, question) {
    if (!question || !Array.isArray(question.options)) return false;
    return Number.isInteger(answerIndex) && answerIndex >= 0 && answerIndex < question.options.length;
  }
  return { computeScore, validateAnswerIndex };
});
