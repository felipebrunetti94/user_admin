import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { fetchUsers } from "../../state/user/usersSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

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
    </Stack>
  );
}
