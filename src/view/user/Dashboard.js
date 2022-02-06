import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

import { fetchUsers, cancel } from "../../state/user/usersSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const hasError = useSelector((state) => state.users.status === "error");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Stack spacing={4} sx={{ m: 2 }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
        Dashboard
      </Typography>
      <Paper elevation={1}>
        <Outlet />
      </Paper>
      <Snackbar
        open={hasError}
        autoHideDuration={6000}
        onClose={() => dispatch(cancel())}
      >
        <Alert
          onClose={() => dispatch(cancel())}
          severity="error"
          sx={{ width: "100%" }}
        >
          There was an error with your request
        </Alert>
      </Snackbar>
    </Stack>
  );
}
