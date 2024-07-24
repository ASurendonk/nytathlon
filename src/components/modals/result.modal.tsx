import { Box, Stack, Typography, useTheme } from "@mui/material";
import * as GameHelper from "../../helpers/game.helper.ts";
import Button from "../button.tsx";
import Modal from "../modal.tsx";
import { useCallback } from "react";
import { toast } from "react-toastify";

interface ResultModalProps {
  open?: boolean;
  onClose(): void;
  rawTime: string;
  totalScore: number;
  wordleScore: number;
  connectionsScore: number;
  boxedScore: number;
  miniScore: number;
}

const ResultModal = ({ open, onClose, rawTime, totalScore, ...scores }: ResultModalProps) => {
  const theme = useTheme();

  const formatTimeResult = useCallback((time: number | undefined, isMini?: boolean) => {
    if (!time) {
      if (isMini) {
        return <Box component="span" sx={{ color: theme.palette.success.main, fontWeight: 700 }}>0:00</Box>;
      }
      return "0:00";
    }
    const minutes = Math.floor(Math.abs(time) / 60);
    const remainingSeconds = Math.abs(time) % 60;
    const formattedTime = `${time < 0 ? '-' : time > 0 ? '+' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

    let color = theme.palette.common.black;
    if (time < 0) {
      color = theme.palette.success.main;
    } else if (time > 0) {
      color = theme.palette.error.main;
    }

    return <Box component="span" sx={{ color, fontWeight: 700 }}>{formattedTime}</Box>;
  }, [theme]);

  const onShareResult = useCallback(() => {
    const w = calculateBubble(scores.wordleScore);
    const c = calculateBubble(scores.connectionsScore);
    const lb = calculateBubble(scores.boxedScore);
    const tm = calculateMiniBubble(scores.miniScore);
    navigator.clipboard.writeText(`I got ${GameHelper.formatTime(totalScore)} in the NYTathlon\n${w} ${c} ${lb} ${tm}\nhttps://asurendonk.github.io/nytathlon/`);
    toast.success("Result copied to clipboard");
  }, [totalScore, scores]);

  return (
    <Modal open={!!open} onClose={onClose}>
      <Stack textAlign="center" alignItems="center" gap={3} py={4}>
        <Typography>Your time score</Typography>

        <Box width={160} alignSelf="center" mt={-3}>
          <Typography variant="h1" color={theme.palette.common.black} fontSize={64}>
            {GameHelper.formatTime(totalScore)}
          </Typography>
        </Box>

        <Stack gap={1}>
          <Typography>Score breakdown</Typography>
          <Typography>Raw time <b>{rawTime}</b></Typography>
          <Typography>Wordle {formatTimeResult(scores.wordleScore)}</Typography>
          <Typography>Connections {formatTimeResult(scores.connectionsScore)}</Typography>
          <Typography>Letter Boxed {formatTimeResult(scores.boxedScore)}</Typography>
          <Typography>The Mini {formatTimeResult(scores.miniScore, true)}</Typography>
        </Stack>

        <Box mt={3}>
          <Button label="Share Result" onClick={onShareResult} />
        </Box>
      </Stack>
    </Modal>
  );
}

export default ResultModal;

function calculateBubble(score: number) {
  if (score < 0) {
    return "🟩";
  } else if (score === 0) {
    return "⬜";
  } else if (score > 0) {
    return "🟥";
  } else {
    return "";
  }
}

function calculateMiniBubble(score: number) {
  if (score <= 0) {
    return "🟩";
  } else if (score > 0) {
    return "🟥";
  } else {
    return "";
  }
}
