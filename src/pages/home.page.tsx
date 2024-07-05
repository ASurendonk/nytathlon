import { Button, Stack, useTheme } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [startTime, setStartTime] = useLocalStorage<number | null>("startTime", null);
  const [, setEndTime] = useLocalStorage<number | null>("endTime", null);
  const [, setWordle] = useLocalStorage<string>("wordle", "");
  const [, setConnections] = useLocalStorage<string>("connections", "");

  const onStartClick = useCallback(() => {
    navigate("/game");
  }, [navigate]);

  const onResetClick = useCallback(() => {
    setStartTime(null);
    setEndTime(null);
    setWordle("");
    setConnections("");
  }, [setStartTime, setEndTime, setWordle, setConnections]);

  const hasActiveGame = useMemo(() => !!startTime, [startTime]);

  return (
    <Stack bgcolor={theme.palette.background.default} gap={1}>
      <Button onClick={onStartClick}>{hasActiveGame ? "RESUME" : "START"}</Button>
      {!!startTime && (
        <Button onClick={onResetClick}>RESET</Button>
      )}
    </Stack>
  );
}

export default HomePage;
