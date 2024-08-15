import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Link, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useLocalStorage } from "../hooks/useLocalStorage";
import MiniResult from "../enums/miniResult.enum.ts";
import LetterBoxedResult from "../enums/letterBoxedResult.enum.ts";
import Button from "../components/button.tsx";
import Input from "../components/input.tsx";
import * as GameHelper from "../helpers/game.helper.ts";
import ResultModal from "../components/modals/result.modal.tsx";

const GamePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');

  const [playing, setPlaying] = useState(true);
  const [startTime, setStartTime] = useLocalStorage<number | null>("startTime", null);
  const [endTime, setEndTime] = useLocalStorage<number | null>("endTime", null);
  const [wordle, setWordle] = useLocalStorage<string>("wordle", "");
  const [connections, setConnections] = useLocalStorage<string>("connections", "");
  const [mini, setMini] = useLocalStorage<MiniResult>("theMini", MiniResult.None);
  const [boxed, setBoxed] = useLocalStorage<LetterBoxedResult>("letterBoxed", LetterBoxedResult.None);

  const [showResult, setShowResult] = useState(false);

  const [time, setTime] = useState<number>(0);

  const intervalRef = useRef<number | undefined>(undefined);

  const createInterval = useCallback(() => {
    if (!startTime) {
      return;
    }
    intervalRef.current = window.setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      setTime(elapsedTime);
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
    const completed =  (
      wordle !== "" && connections !== "" && mini !== MiniResult.None && boxed !== LetterBoxedResult.None
    );

    if (completed) {
      setPlaying(false);
      setShowResult(true);
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
        setTime(elapsedTime);
      }
    }
  }, [wordle, connections, mini, boxed, endTime, setEndTime, startTime, createInterval]);

  const wordleScore = useMemo(() => {
    return GameHelper.calculateWordleScore(wordle);
  }, [wordle]);

  const connectionsScore = useMemo(() => {
    return GameHelper.calculateConnectionsScore(connections);
  }, [connections]);

  const miniScore = useMemo(() => {
    return GameHelper.calculateMiniScore(mini);
  }, [mini]);

  const boxedScore = useMemo(() => {
    return GameHelper.calculateBoxedScore(boxed);
  }, [boxed]);

  const totalScore = useMemo(() => {
    return time + (wordleScore || 0) + connectionsScore + miniScore + boxedScore;
  }, [time, wordleScore, connectionsScore, miniScore, boxedScore]);

  const formattedTime = useMemo(() => {
    return GameHelper.formatTime(time);
  }, [time]);

  const resumeGame = useCallback(() => {
    if (!playing) {
      createInterval();
      setEndTime(null);
      setPlaying(true);
    }
  }, [playing, createInterval, setEndTime, setPlaying]);

  const onClickMini = useCallback((result: MiniResult) => () => {
    resumeGame();
    if (mini === result) {
      setMini(MiniResult.None);
    } else {
      setMini(result);
    }
  }, [mini, resumeGame, setMini]);

  const onClickBoxed = useCallback((result: LetterBoxedResult) => () => {
    resumeGame();
    if (boxed === result) {
      setBoxed(LetterBoxedResult.None);
    } else {
      setBoxed(result);
    }
  }, [boxed, resumeGame, setBoxed]);

  return (
    <Stack bgcolor={theme.palette.background.default} spacing={4}>
      <Box width={120} alignSelf="center">
        <Typography variant="h1" color={theme.palette.common.black} fontSize={64}>
          {formattedTime}
        </Typography>
      </Box>

      <Stack width="100%" gap={1.5}>
        <Typography variant="h5" component="div" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
          <Link href="https://www.nytimes.com/games/wordle/index.html" target="_blank">
            Wordle
          </Link>
        </Typography>
        <Input
          value={wordle}
          onChange={value => {
            if (!value.includes("Wordle")) {
              setWordle("");
              return;
            }
            setWordle(value);
          }}
          placeholder="Paste your shared result from Wordle"
          disabled={!!wordle || !playing}
          onClearClick={() => {
            setWordle("");
            resumeGame();
          }}
        />
      </Stack>

      <Stack width="100%" gap={1.5}>
        <Typography variant="h5" component="div" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
          <Link href="https://www.nytimes.com/games/connections" target="_blank">
            Connections
          </Link>
        </Typography>
        <Input
          value={connections}
          onChange={value => {
            if (!value.includes("Connections")) {
              setConnections("");
              return;
            }
            setConnections(value);
          }}
          placeholder="Paste your shared result from Connections"
          disabled={!!connections || !playing}
          onClearClick={() => {
            setConnections("");
            resumeGame();
          }}
        />
      </Stack>

      <Stack width="100%" gap={1.5}>
        <Typography variant="h5" component="div" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
          <Link href="https://www.nytimes.com/puzzles/letter-boxed" target="_blank">
            Letter Boxed
          </Link>
        </Typography>
        <Box display="flex" sx={{ flexDirection: isMobile ? "column" : "row" }} gap={1}>
          <Button label="Under" selected={boxed === LetterBoxedResult.Fewer} onClick={onClickBoxed(LetterBoxedResult.Fewer)} />
          <Button label="On Par" selected={boxed === LetterBoxedResult.OnPar} onClick={onClickBoxed(LetterBoxedResult.OnPar)} />
          <Button label="Over/DNF" selected={boxed === LetterBoxedResult.More} onClick={onClickBoxed(LetterBoxedResult.More)} />
        </Box>
      </Stack>

      <Stack width="100%" gap={1.5}>
        <Typography variant="h5" component="div" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
          <Link href="https://www.nytimes.com/crosswords/game/mini" target="_blank">
            The Mini
          </Link>
        </Typography>
        <Box display="flex" sx={{ flexDirection: isMobile ? "column" : "row" }} gap={1}>
          <Button label="Finished" selected={mini === MiniResult.Finished} onClick={onClickMini(MiniResult.Finished)} />
          <Button label="Gave Up" selected={mini === MiniResult.GaveUp} onClick={onClickMini(MiniResult.GaveUp)} />
        </Box>
      </Stack>

      {!playing && (
        <Button label="Show Result" onClick={() => setShowResult(true)} />
      )}

      <ResultModal
        open={!playing && showResult}
        onClose={() => setShowResult(false)}
        rawTime={formattedTime}
        totalScore={totalScore}
        wordleScore={wordleScore}
        connectionsScore={connectionsScore}
        boxedScore={boxedScore}
        miniScore={miniScore}
      />
    </Stack>
  );
};

export default GamePage;
