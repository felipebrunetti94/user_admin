import { useDispatch, useSelector } from "react-redux";
import { cancel, editUser, updateField } from "../features/dashboard/usersSlice";
import EditorUser from "./UserEditor";

export default function EditUser() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.current)
  const isFetching = useSelector(state => state.status === 'edit_loading')

  return <EditorUser
    updateField={(payload) => dispatch(updateField(payload))}
    onSubmit={() => dispatch(editUser())}
    user={user}
    cancel={() => dispatch(cancel())}
    isFetching={isFetching}
  />
}