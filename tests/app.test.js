
const { computeScore, validateAnswerIndex } = require('../src/quizCore');

describe('quizCore', () => {
  const questions = [
    { text: 'Q1', options: ['A','B','C'], answerIndex: 1 },
    { text: 'Q2', options: ['A','B','C'], answerIndex: 2 },
    { text: 'Q3', options: ['A','B','C'], answerIndex: 0 },
  ];

  test('computeScore counts correct answers', () => {
    expect(computeScore([1,2,0], questions)).toBe(3);
    expect(computeScore([0,2,0], questions)).toBe(2);
    expect(computeScore([], questions)).toBe(0);
  });

  test('validateAnswerIndex validates bounds', () => {
    expect(validateAnswerIndex(0, questions[0])).toBe(true);
    expect(validateAnswerIndex(2, questions[0])).toBe(true);
    expect(validateAnswerIndex(3, questions[0])).toBe(false);
    expect(validateAnswerIndex(-1, questions[0])).toBe(false);
    expect(validateAnswerIndex('1', questions[0])).toBe(false);
  });
});
