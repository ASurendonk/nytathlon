import { Button as MUIButton } from "@mui/material";

interface ButtonProps {
  label: string;
  selected?: boolean;
  onClick?(): void;
}

const Button = ({ label, selected, onClick }: ButtonProps) => {
  return (
    <MUIButton
      variant="contained" color={selected ? "secondary" : "primary"  as "primary" | "secondary"}
      sx={{ flex: 1 }}
      onClick={onClick}
    >
      {label}
    </MUIButton>
  );
}

export default Button;
