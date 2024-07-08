import { Stack, Typography } from "@mui/material";
import { List, ListItem } from "../list.tsx";
import Modal from "../modal.tsx";

interface RulesModalProps {
  open?: boolean;
  onClose(): void;
}

const RulesModal = ({ open, onClose }: RulesModalProps) => {
  return (
    <Modal open={!!open} onClose={onClose}>
      <Stack gap={4}>
        <Stack textAlign="center" gap={1}>
          <Typography variant="h2">
            Wordle
          </Typography>
          <List>
            <ListItem>Fail +3 min</ListItem>
            <ListItem>in 6 guesses +0s</ListItem>
            <ListItem>in 5 guesses -20s</ListItem>
            <ListItem>in 4 guesses -40s</ListItem>
            <ListItem>in 3 guesses -1 min</ListItem>
            <ListItem>in 2 guesses -2 min</ListItem>
            <ListItem>in 1 guesses -3 min</ListItem>
          </List>
        </Stack>

        <Stack textAlign="center" gap={1}>
          <Typography variant="h2">
            Connections
          </Typography>
          <List>
            <ListItem>All correct +0s</ListItem>
            <ListItem>Each missing category +2 min</ListItem>
          </List>
        </Stack>

        <Stack textAlign="center" gap={1}>
          <Typography variant="h2">
            The Mini
          </Typography>
          <List>
            <ListItem>Finished +0s</ListItem>
            <ListItem>Give up/DNF +5 min</ListItem>
          </List>
        </Stack>

        <Stack textAlign="center" gap={1}>
          <Typography variant="h2">
            Letter Boxed
          </Typography>
          <List>
            <ListItem>Win under the recommended amount -2 min</ListItem>
            <ListItem>Win on par +0s</ListItem>
            <ListItem>Win over the recommended amount +2 min</ListItem>
          </List>
        </Stack>
      </Stack>
    </Modal>
  );
}

export default RulesModal;
