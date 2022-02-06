import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function DeletePopup({ cancel, removeUser, isOpen, isLoading }) {
  const user = useSelector((state) => state.users.current);
  return (
    <Modal
      open={isOpen}
      onClose={cancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack borderRadius={2} spacing={4} sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h3"
          sx={{ fontWeight: "bold" }}
        >
          Delete
        </Typography>

        <Typography id="modal-modal-description" variant="h6" component="p">
          Are you sure you want to delete user {user.name}
        </Typography>

        <Stack justifyContent="flex-end" direction="row" spacing={2}>
          <Button
            disabled={isLoading}
            variant="outlined"
            size="small"
            color="primary"
            name="cancel"
            onClick={cancel}
          >
            Cancel
          </Button>
          <Button
            sx={{ px: 5 }}
            onClick={removeUser}
            disabled={isLoading}
            variant="contained"
            size="small"
            color="error"
            name="delete"
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
