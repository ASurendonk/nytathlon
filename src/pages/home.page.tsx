import { Box, Button, Link, Stack, Typography, useTheme } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import Modal from "../components/modal.tsx";
import { List, ListItem } from "../components/list.tsx";

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [startTime, setStartTime] = useLocalStorage<number | null>("startTime", null);
  const [, setEndTime] = useLocalStorage<number | null>("endTime", null);
  const [, setWordle] = useLocalStorage<string>("wordle", "");
  const [, setConnections] = useLocalStorage<string>("connections", "");
  const [, setMini] = useLocalStorage<string>("theMini", "");
  const [, setBoxed] = useLocalStorage<string>("letterBoxed", "");

  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const onStartClick = useCallback(() => {
    navigate("/game");
  }, [navigate]);

  const onResetClick = useCallback(() => {
    setStartTime(null);
    setEndTime(null);
    setWordle("");
    setConnections("");
    setMini("");
    setBoxed("");
  }, [setStartTime, setEndTime, setWordle, setConnections, setMini, setBoxed]);

  const hasActiveGame = useMemo(() => !!startTime, [startTime]);

  return (
    <Stack bgcolor={theme.palette.background.default} gap={3} alignItems="center">
      <Typography textAlign="center">
        Play a marathon of <b>Wordle, Connections, The Mini and Letter Boxed</b> and try to get the best time
      </Typography>

      <Stack mt={1} gap={1}>
        <Typography variant="h2" textAlign="center">The Rules</Typography>
        <List>
          <ListItem>Play the four games in whatever order you want</ListItem>
          <ListItem>Start the timer when you start your first game</ListItem>
          <ListItem>You are allowed to fail games</ListItem>
        </List>
      </Stack>

      <Link onClick={handleOpen} sx={{ cursor: "pointer" }}>See penalties for each game</Link>

      <Stack gap={2} flexDirection="row">
        {!!startTime && (
          <Button variant="contained" onClick={onResetClick}>RESET TIME</Button>
        )}
        <Button variant="contained" onClick={onStartClick}>{hasActiveGame ? "CONTINUE" : "NEW GAME"}</Button>
      </Stack>

      <Modal open={open} onClose={handleClose}>
        <Stack gap={4}>
          <Stack textAlign="center" gap={1}>
            <Typography variant="h2">
              Wordle
            </Typography>
            <List>
              <ListItem>Fail +1 min</ListItem>
              <ListItem>in 5 guesses -20s</ListItem>
              <ListItem>in 4 guesses -30s</ListItem>
              <ListItem>in 3 guesses -40s</ListItem>
              <ListItem>in 2 guesses -50s</ListItem>
              <ListItem>in 1 guesses -60s</ListItem>
            </List>
          </Stack>

          <Stack textAlign="center" gap={1}>
            <Typography variant="h2">
              Connections
            </Typography>
            <List>
              <ListItem>Each missing category +1 min</ListItem>
            </List>
          </Stack>

          <Stack textAlign="center" gap={1}>
            <Typography variant="h2">
              The Mini
            </Typography>
            <List>
              <ListItem>Give up/DNG +2 min</ListItem>
            </List>
          </Stack>

          <Stack textAlign="center" gap={1}>
            <Typography variant="h2">
              Letter Boxed
            </Typography>
            <List>
              <ListItem>Win under the recommended amount -1 min</ListItem>
              <ListItem>Win over the recommended amount +1 min</ListItem>
            </List>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
}

export default HomePage;
