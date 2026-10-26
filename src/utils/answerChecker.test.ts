import test from 'node:test';
import assert from 'node:assert/strict';
import { checkAnswer, normalizeAnswer, expandContractions } from './answerChecker';

test('normalizeAnswer removes punctuation and trims whitespace', () => {
  assert.equal(normalizeAnswer('  Hello World!  '), 'hello world');
  assert.equal(normalizeAnswer("It's cold today."), "it's cold today");
});

test('expandContractions expands common English forms', () => {
  assert.equal(expandContractions("don't like"), 'do not like');
  assert.equal(expandContractions("she's a student"), 'she is a student');
});

test('checkAnswer matches identical and case-insensitive answers', () => {
  const result = checkAnswer('plays', 'plays');
  assert.equal(result.isCorrect, true);

  const resultCase = checkAnswer('Plays', 'plays');
  assert.equal(resultCase.isCorrect, true);
});

test('checkAnswer matches contractions correctly', () => {
  const result1 = checkAnswer("don't like", 'do not like');
  assert.equal(result1.isCorrect, true);

  const result2 = checkAnswer("didn't go", "didn't go");
  assert.equal(result2.isCorrect, true);
});

test('checkAnswer handles optional parenthetical parts', () => {
  const result = checkAnswer('is cleaned', 'is cleaned (by someone)');
  assert.equal(result.isCorrect, true);
});

test('checkAnswer handles slash alternatives', () => {
  const result1 = checkAnswer('used to play', 'used to play / would play');
  assert.equal(result1.isCorrect, true);
  const result2 = checkAnswer('would play', 'used to play / would play');
  assert.equal(result2.isCorrect, true);
});

test('checkAnswer flags incorrect answers', () => {
  const result = checkAnswer('will go', 'went');
  assert.equal(result.isCorrect, false);
});
