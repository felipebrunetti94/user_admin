import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import UserTable from "./UserTable";
import EditUser from "./EditUser";
import CreateUser from "./CreateUser";
import {
  cancel,
  create,
  edit,
  remove,
  deleteUser,
  selectUsers,
  fetchUsers,
} from "../features/dashboard/usersSlice";
import DeletePopup from "./DeletePopup";

export default function Dashboard() {
  const users = useSelector((state) => selectUsers(state));
  const status = useSelector((state) => state.users.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const showDelete = status === "remove" || status === "remove_loading";
  const showTable = status === "loading" || status === "idle" || showDelete;
  const showEdit = status === "edit_loading" || status === "edit";
  const showCreate = status === "create_loading" || status === "create";

  return (
    <Stack spacing={4} sx={{ m: 2 }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
        Dashboard
      </Typography>
      <Paper elevation={1}>
        {showTable && (
          <UserTable
            create={() => dispatch(create())}
            edit={(user) => dispatch(edit(user))}
            remove={(user) => dispatch(remove(user))}
            users={users}
            isLoading={status === "loading"}
          />
        )}
        {showEdit && <EditUser isLoading={status === "edit_loading"} />}
        {showCreate && <CreateUser isLoading={status === "create_loading"} />}
        {showDelete && (
          <DeletePopup
            cancel={() => dispatch(cancel())}
            removeUser={() => dispatch(deleteUser())}
            isOpen={showDelete}
            isLoading={status === "remove_loading"}
          />
        )}
      </Paper>
    </Stack>
  );
}
