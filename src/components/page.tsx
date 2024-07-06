import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Logo from "../assets/logo.svg";

interface PageProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  const theme = useTheme();

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
      <AppBar position="static" elevation={0} sx={{ borderBottom: 1, borderColor: theme.palette.common.black, backgroundColor: 'white' }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <img src={Logo} alt="logo" height={40} style={{ maxWidth: "100%" }} />
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, px: 2.5, mt: 3, maxWidth: "600px !important" }}>
        {children}
      </Container>
    </Box>
  );
};

export default Page;
