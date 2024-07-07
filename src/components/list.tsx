import { Box } from "@mui/material";

interface ListProps {
  children: React.ReactNode;
}

const List = ({ children }: ListProps) => {
  return (
    <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: 0, fontSize: '18px', lineHeight: '28px' }}>
      {children}
    </Box>
  );
}

interface ListItemProps {
  children: React.ReactNode | string;
}

const ListItem = ({ children }: ListItemProps) => {
  return (<Box textAlign="center" mt={0.5}>▪️ {children}</Box>);
}

export { List, ListItem };
