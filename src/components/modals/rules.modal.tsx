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
            <ListItem bullet="👍">in 1 guess -3 min</ListItem>
            <ListItem bullet="👍">in 2 guesses -2 min</ListItem>
            <ListItem bullet="👍">in 3 guesses -1 min</ListItem>
            <ListItem bullet="👍">in 4 guesses -40s</ListItem>
            <ListItem bullet="👍">in 5 guesses -20s</ListItem>
            <ListItem bullet="🚫">Fail +3 min</ListItem>
          </List>
        </Stack>

        <Stack textAlign="center" gap={1}>
          <Typography variant="h2">
            Connections
          </Typography>
          <List>
            <ListItem bullet="👍">No mistakes -2 min</ListItem>
            <ListItem bullet="👍">1 mistake -1 min 30s</ListItem>
            <ListItem bullet="👍">2 mistakes -1 min</ListItem>
            <ListItem bullet="🚫">Each missing category +2 min</ListItem>
          </List>
        </Stack>

        <Stack textAlign="center" gap={1}>
          <Typography variant="h2">
            Letter Boxed
          </Typography>
          <List>
            <ListItem bullet="👍">Win under the recommended amount -2 min</ListItem>
            <ListItem bullet="🚫">Win over the recommended amount +2 min</ListItem>
          </List>
        </Stack>

        <Stack textAlign="center" gap={1}>
          <Typography variant="h2">
            The Mini
          </Typography>
          <List>
            <ListItem bullet="🚫">Give up/DNF +5 min</ListItem>
          </List>
        </Stack>
      </Stack>
    </Modal>
  );
}

export default RulesModal;
