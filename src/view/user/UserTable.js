import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectUsers,
  remove,
  cancel,
  deleteUser,
} from "../../state/user/usersSlice";

import DeletePopup from "./DeletePopup";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function UserTable() {
  const navigate = useNavigate();
  const [asc, setAsc] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.users.status);
  const user = useSelector((state) => state.users.current);
  const users = useSelector((state) => selectUsers(state));

  const showDelete = status === "remove" || status === "remove_loading";
  const isLoading = status === "loading";
  const isEmpty = users.length === 0;
  const showTable = !isEmpty && !isLoading;
  const showEmptyMessage = isEmpty && !isLoading;
  const order = asc ? "asc" : "desc";

  return (
    <>
      <Stack spacing={4} sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" component="h2">
            User list
          </Typography>
          <Button
            variant="contained"
            size="small"
            name="add"
            onClick={() => navigate("edit")}
            sx={{ px: 5 }}
          >
            Add new
          </Button>
        </Stack>
        {showEmptyMessage && <Alert severity="info">No user found!</Alert>}
        {isLoading && <Skeleton variant="rectangular" />}
        {showTable && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active
                      direction={order}
                      onClick={() => setAsc(!asc)}
                    >
                      Username
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">City</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.sort(getComparator(order, "username")).map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.address.city}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        color="warning"
                        name="edit"
                        onClick={() => {
                          navigate(`edit/${user.id}`);
                        }}
                      >
                        edit
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        name="delete"
                        onClick={() => dispatch(remove(user))}
                      >
                        delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
      {showDelete && (
        <DeletePopup
          cancel={() => dispatch(cancel())}
          removeUser={() => dispatch(deleteUser())}
          isOpen={showDelete}
          isLoading={status === "remove_loading"}
          user={user}
        />
      )}
    </>
  );
}
