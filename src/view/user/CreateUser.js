import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeUser } from "../../infra/user/makeUser";
import { createUser } from "../../state/user/usersSlice";
import UserEditor from "./UserEditor";

export default function CreateUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.status === "create_loading");

  return (
    <UserEditor
      onSubmit={(user) => {
        dispatch(createUser(user));
        navigate("/");
      }}
      editedUser={makeUser({})}
      isFetching={isFetching}
      requiredOnly
    />
  );
}
