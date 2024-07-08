import { Link, Stack, Typography, useTheme } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { List, ListItem } from "../components/list.tsx";
import Button from "../components/button.tsx";
import MiniResult from "../enums/miniResult.enum.ts";
import LetterBoxedResult from "../enums/letterBoxedResult.enum.ts";
import RulesModal from "../components/modals/rules.modal.tsx";
import { useIsMobile } from "../hooks/useIsMobile.ts";

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [startTime, setStartTime] = useLocalStorage<number | null>("startTime", null);
  const [, setEndTime] = useLocalStorage<number | null>("endTime", null);
  const [, setWordle] = useLocalStorage<string>("wordle", "");
  const [, setConnections] = useLocalStorage<string>("connections", "");
  const [, setMini] = useLocalStorage<string>("theMini", MiniResult.None);
  const [, setBoxed] = useLocalStorage<string>("letterBoxed", LetterBoxedResult.None);

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
    setMini(MiniResult.None);
    setBoxed(LetterBoxedResult.None);
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
          <ListItem>Timer starts when you click "New Game"</ListItem>
          <ListItem>You are allowed to fail games (with penalties)</ListItem>
          <ListItem>No checking on <b>The Mini!</b></ListItem>
        </List>
      </Stack>

      <Link onClick={handleOpen} sx={{ cursor: "pointer", fontFamily: "Chivo", fontWeight: 400, fontSize: 18 }}>
        See penalties for each game
      </Link>

      <Stack gap={2} flexDirection={isMobile ? "column" : "row" as "column" | "row"} alignSelf={isMobile ? "stretch" : ""}>
        {!!startTime && (
          <Button label="RESET TIME" onClick={onResetClick} />
        )}
        <Button label={hasActiveGame ? "CONTINUE" : "NEW GAME"} onClick={onStartClick} />
      </Stack>

      <RulesModal open={open} onClose={handleClose} />
    </Stack>
  );
}

export default HomePage;
