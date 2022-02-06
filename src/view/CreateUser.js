import { useDispatch, useSelector } from "react-redux";
import { cancel, createUser, updateField } from "../features/dashboard/usersSlice";
import EditorUser from "./UserEditor";

export default function CreateUser() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.current)
  const isFetching = useSelector(state => state.status === 'create_loading')

  return <EditorUser
    updateField={(payload) => dispatch(updateField(payload))}
    onSubmit={() => dispatch(createUser())}
    user={user}
    cancel={() => dispatch(cancel())}
    isFetching={isFetching}
  />
}