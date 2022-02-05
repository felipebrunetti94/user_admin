export default function Dashboard({ users, addUser, editUser, deleteUser }) {
  const emptyListMessage = "no user found"
  const showTable = users.length > 0
  return (
    <div>
      <div>
        <div>User list</div>
        <button name="add" onClick={addUser}>Add new</button>
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
              <div><button name="edit" onClick={editUser}>edit</button></div>
              <div><button name="delete" onClick={deleteUser}>delete</button></div>
            </div>
          )
          : emptyListMessage
        }
      </div>
    </div>
  )
}