import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeUser } from "../features/dashboard/usersApi";
import { createUser } from "../features/dashboard/usersSlice";
import UserEditor from "./UserEditor";

export default function CreateUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.users.errors);
  const isFetching = useSelector((state) => state.status === "create_loading");

  return (
    <UserEditor
      onSubmit={(user) => {
        dispatch(createUser(user));
        navigate("/");
      }}
      editedUser={makeUser({})}
      isFetching={isFetching}
      errors={errors}
      requiredOnly
    />
  );
}
