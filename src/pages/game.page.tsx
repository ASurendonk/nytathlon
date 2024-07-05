import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IconButton, InputAdornment, Link, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Clear } from "@mui/icons-material";

const GamePage = () => {
  const theme = useTheme();
  const [playing, setPlaying] = useState(true);
  const [startTime, setStartTime] = useLocalStorage<number | null>("startTime", null);
  const [endTime, setEndTime] = useLocalStorage<number | null>("endTime", null);
  const [wordle, setWordle] = useLocalStorage<string>("wordle", "");
  const [connections, setConnections] = useLocalStorage<string>("connections", "");
  const [score, setScore] = useState<number>(1000);

  const intervalRef = useRef<number | undefined>(undefined);

  const createInterval = useCallback(() => {
    if (!startTime) {
      return;
    }
    intervalRef.current = window.setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      setScore(1000 - elapsedTime);
    }, 1000) as unknown as number;
  }, [startTime]);

  useEffect(() => {
    if (startTime !== null) {
      createInterval();
    }

    return () => {
      if (intervalRef.current !== undefined) {
        // noinspection TypeScriptValidateTypes
        clearInterval(intervalRef.current);
      }
    };
  }, [startTime, createInterval]);

  useEffect(() => {
    if (startTime === null) {
      setStartTime(Date.now());
    }
  }, [startTime, setStartTime]);

  useEffect(() => {
    const values = [wordle, connections];
    if (values.every(v => v !== "")) {
      setPlaying(false);
      if (intervalRef.current !== undefined) {
        // noinspection TypeScriptValidateTypes
        clearInterval(intervalRef.current);
        let gameEndTime = Date.now();
        if (!endTime) {
          setEndTime(Date.now());
        } else {
          gameEndTime = endTime;
        }
        if (!startTime) {
          return;
        }
        const elapsedTime = Math.floor((gameEndTime - startTime) / 1000);
        setScore(1000 - elapsedTime);
      }
    }
  }, [wordle, connections, endTime, setEndTime, startTime, createInterval]);

  const worldeScore = useMemo(() => {
    try {
      const result = parseInt(wordle.split(" ")[2].split("/")[0]);
      return (7 - result) * 10;
    } catch (error) {
      return 0;
    }
  }, [wordle]);

  const connectionsScore = useMemo(() => {
    return calculateConnectionsScore(connections);
  }, [connections]);

  const totalScore = useMemo(() => {
    let total = score;
    total += worldeScore;
    total += connectionsScore;
    return total;
  }, [score, worldeScore, connectionsScore]);

  return (
    <Stack
      bgcolor={theme.palette.background.default}
      p={4}
      spacing={4}
    >
      <Typography variant="h1" color={theme.palette.text.secondary}>
        TIME SCORE: {score}
      </Typography>

      <Stack width="100%" gap={1}>
        <Typography variant="h5" component="div" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
          <Link href="https://www.nytimes.com/games/wordle/index.html" target="_blank">
            Wordle
          </Link>
        </Typography>
        <TextField
          placeholder="Paste your result from Wordle"
          value={wordle}
          onChange={(e) => setWordle(e.target.value)}
          fullWidth
          disabled={!!wordle || !playing}
          multiline
          minRows={5}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear input"
                  onClick={() => {
                    setWordle("");
                    if (!playing) {
                      createInterval();
                      setEndTime(null);
                      setPlaying(true);
                    }
                  }}
                  edge="end"
                >
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="h6" color={theme.palette.text.secondary}>WORDLE SCORE: {worldeScore}</Typography>
      </Stack>

      <Stack width="100%" gap={1}>
        <Typography variant="h5" component="div" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
          <Link href="https://www.nytimes.com/games/connections" target="_blank">
            Connections
          </Link>
        </Typography>
        <TextField
          placeholder="Paste your result from Connections"
          value={connections}
          onChange={(e) => setConnections(e.target.value)}
          fullWidth
          disabled={!!connections || !playing}
          multiline
          minRows={5}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear input"
                  onClick={() => {
                    setConnections("");
                    if (!playing) {
                      createInterval();
                      setEndTime(null);
                      setPlaying(true);
                    }
                  }}
                  edge="end"
                >
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="h6" color={theme.palette.text.secondary}>CONNECTIONS SCORE: {connectionsScore}</Typography>
      </Stack>

      {!playing && (
        <Typography variant="h1" color={theme.palette.text.secondary}>TOTAL: {totalScore}</Typography>
      )}
    </Stack>
  );
};

function calculateConnectionsScore(puzzleResult: string) {
  const lines = puzzleResult.trim().split("\n");
  const colorRows = lines.slice(2);

  function isFullCategory(row: string[]) {
    const firstColor = row[0];
    return row.every((color: string) => color === firstColor);
  }

  function splitEmojis(row: string) {
    return [...row];
  }

  let score = 0;
  for (const row of colorRows) {
    const colors = splitEmojis(row.trim());
    if (isFullCategory(colors)) {
      score += 60;
    }
  }

  return score;
}

export default GamePage;
