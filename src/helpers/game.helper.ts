import MiniResult from "../enums/miniResult.enum.ts";
import LetterBoxedResult from "../enums/letterBoxedResult.enum.ts";

const CONNECTIONS_SCORE_FACTOR = 120;
const MINI_SCORE_FACTOR = 300;
const LETTER_BOXED_SCORE_FACTOR = 120;

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const remainingSeconds = time % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function calculateWordleScore(result: string) {
  if (!result.includes("Wordle")) {
    return 0;
  }

  try {
    const totalWordCount = parseInt(result.split(" ")[2].split("/")[0]);
    if (isNaN(totalWordCount) || totalWordCount === 0) {
      return 180;
    }
    switch (totalWordCount) {
      case 6: return 180;
      case 5: return -20;
      case 4: return -40;
      case 3: return -60;
      case 2: return -120;
      case 1: return -180;
    }
  } catch (error) {
    return 0;
  }
}

function calculateConnectionsScore(result: string) {
  if (!result.includes("Connections")) {
    return 0;
  }

  const lines = result.trim().split("\n");
  const colorRows = lines.slice(2);

  function isFullCategory(row: string[]) {
    const firstColor = row[0];
    return row.every((color: string) => color === firstColor);
  }

  function splitEmojis(row: string) {
    return [...row];
  }

  let correctRows = 0;
  for (const row of colorRows) {
    const colors = splitEmojis(row.trim());
    if (isFullCategory(colors)) {
      correctRows++;
    }
  }

  return (4 - correctRows) * CONNECTIONS_SCORE_FACTOR;
}

function calculateMiniScore(result?: MiniResult) {
  switch (result) {
    case MiniResult.Finished:
      return 0;
    case MiniResult.GaveUp:
      return MINI_SCORE_FACTOR;
    default:
      return 0;
  }
}

function calculateBoxedScore(result?: LetterBoxedResult) {
  switch (result) {
    case LetterBoxedResult.Fewer:
      return -LETTER_BOXED_SCORE_FACTOR;
    case LetterBoxedResult.OnPar:
      return 0;
    case LetterBoxedResult.More:
      return LETTER_BOXED_SCORE_FACTOR;
    default:
      return 0;
  }
}

export { formatTime, calculateWordleScore, calculateConnectionsScore, calculateMiniScore, calculateBoxedScore }
