import React, { useCallback } from 'react';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useThemeSelection } from "../context/themeContext.tsx";
import ThemeType from "../enums/themeType.enum.ts";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface PageProps {
  title: string;
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { theme: themeSelection, setTheme: setThemeSelection } = useThemeSelection();

  const onThemeClick = useCallback(() => {
    const newTheme = themeSelection === ThemeType.Light ? ThemeType.Dark : ThemeType.Light;
    setThemeSelection(newTheme);
  }, [themeSelection, setThemeSelection]);

  const onTitleClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Button onClick={onTitleClick} sx={{ color: "white" }}>
            <Typography variant="h6" textTransform="none">
              {title}
            </Typography>
          </Button>
          <IconButton onClick={onThemeClick} sx={{ color: "white" }}>
            {themeSelection === ThemeType.Light ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, mt: 3 }}>
        {children}
      </Container>

      <Box component="footer" sx={{ py: 3, textAlign: 'center', mt: 'auto' }}>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};

export default Page;
