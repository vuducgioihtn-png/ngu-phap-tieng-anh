/**
 * Pure helper for grammar answer normalization and validation
 */

export function normalizeAnswer(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    // Replace typographic quotes
    .replace(/[‘’`]/g, "'")
    .replace(/[“”]/g, '"')
    // Remove ending period, question mark or exclamation mark
    .replace(/[.?!]+$/, '')
    // Normalize spaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Standard contractions expansion for English
 */
const CONTRACTIONS_MAP: Record<string, string> = {
  "don't": "do not",
  "doesn't": "does not",
  "didn't": "did not",
  "haven't": "have not",
  "hasn't": "has not",
  "hadn't": "had not",
  "won't": "will not",
  "wouldn't": "would not",
  "can't": "cannot",
  "couldn't": "could not",
  "shouldn't": "should not",
  "isn't": "is not",
  "aren't": "are not",
  "wasn't": "was not",
  "weren't": "were not",
  "i'm": "i am",
  "you're": "you are",
  "he's": "he is",
  "she's": "she is",
  "it's": "it is",
  "we're": "we are",
  "they're": "they are",
  "i'll": "i will",
  "you'll": "you will",
  "he'll": "he will",
  "she'll": "she will",
  "we'll": "we will",
  "they'll": "they will",
  "i've": "i have",
  "you've": "you have",
  "we've": "we have",
  "they've": "they have",
  "i'd": "i would",
  "you'd": "you would",
  "he'd": "he would",
  "she'd": "she would",
  "we'd": "we would",
  "they'd": "they would",
};

export function expandContractions(text: string): string {
  let result = text;
  for (const [contraction, expansion] of Object.entries(CONTRACTIONS_MAP)) {
    const regex = new RegExp(`\\b${contraction}\\b`, 'gi');
    result = result.replace(regex, expansion);
  }
  return result;
}

export function checkAnswer(
  userAnswer: string,
  correctAnswer: string | string[]
): { isCorrect: boolean; matchedAnswer: string } {
  const normUser = normalizeAnswer(userAnswer);
  const normUserExpanded = normalizeAnswer(expandContractions(normUser));

  const validAnswers = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];

  for (const ans of validAnswers) {
    const normAns = normalizeAnswer(ans);
    const normAnsExpanded = normalizeAnswer(expandContractions(normAns));

    // Direct match
    if (normUser === normAns || normUserExpanded === normAnsExpanded) {
      return { isCorrect: true, matchedAnswer: ans };
    }

    // Check optional parentheses, e.g. "is being repaired (by them)" matching "is being repaired"
    const withoutParens = normalizeAnswer(normAns.replace(/\([^)]*\)/g, ''));
    if (normUser === withoutParens || normUserExpanded === normalizeAnswer(expandContractions(withoutParens))) {
      return { isCorrect: true, matchedAnswer: ans };
    }

    // Check slash alternatives, e.g. "walked / would walk"
    if (normAns.includes('/')) {
      const parts = normAns.split('/').map(p => normalizeAnswer(p));
      if (parts.includes(normUser) || parts.map(p => normalizeAnswer(expandContractions(p))).includes(normUserExpanded)) {
        return { isCorrect: true, matchedAnswer: ans };
      }
    }
  }

  return { isCorrect: false, matchedAnswer: validAnswers[0] };
}
