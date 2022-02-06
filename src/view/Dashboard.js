import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { create, edit, remove, selectUsers, fetchUsers } from "../features/dashboard/usersSlice"

export default function Dashboard() {
  const users = useSelector(state => selectUsers(state))
  const status = useSelector(state => state.users.status)
  const dispatch = useDispatch()
  const emptyListMessage = "no user found"
  const showTable = users.length > 0 && status === 'idle'

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])
  return (
    <div>
      <div>
        <div>User list</div>
        <button name="add" onClick={() => dispatch(create())}>Add new</button>
      </div>
      <div>
        {showTable
          ? users.map((u) =>
            <div key={u.id}>
              <div>{u.id}</div>
              <div>{u.name}</div>
              <div>{u.username}</div>
              <div>{u.email}</div>
              <div>{u.address.city}</div>
              <div><button name="edit" onClick={() => dispatch(edit(u))}>edit</button></div>
              <div><button name="delete" onClick={() => dispatch(remove(u))}>delete</button></div>
            </div>
          )
          : emptyListMessage
        }
        {status === 'loading' && <span>CARREGANDO</span>}
      </div>
    </div>
  )
}