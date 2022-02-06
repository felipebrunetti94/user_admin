import { useDispatch, useSelector } from "react-redux";
import {
  cancel,
  editUser,
  updateField,
} from "../features/dashboard/usersSlice";
import UserEditor from "./UserEditor";

export default function EditUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.current);
  const errors = useSelector((state) => state.users.errors);
  const isFetching = useSelector((state) => state.status === "edit_loading");

  return (
    <UserEditor
      updateField={(payload) => dispatch(updateField(payload))}
      onSubmit={() => dispatch(editUser())}
      user={user}
      cancel={() => dispatch(cancel())}
      isFetching={isFetching}
      errors={errors}
    />
  );
}
