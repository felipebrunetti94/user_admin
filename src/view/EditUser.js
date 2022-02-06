import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, selectUserById } from "../features/dashboard/usersSlice";
import UserEditor from "./UserEditor";

export default function EditUser() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => selectUserById(state, userId));
  const isFetching = useSelector((state) => state.status === "edit_loading");

  useEffect(() => {
    console.log(currentUser, userId);
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate, userId]);

  return (
    <UserEditor
      onSubmit={(user) => {
        dispatch(editUser(user));
        navigate("/");
      }}
      editedUser={currentUser}
      cancel={() => navigate("/")}
      isFetching={isFetching}
    />
  );
}
