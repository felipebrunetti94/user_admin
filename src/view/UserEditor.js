export default function EditorUser({ updateField, onSubmit, user, cancel, isFetching }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit()
  }
  const handleChange = (fieldname) => (event) => {
    updateField({ fieldname, value: event.target.value })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input required type="text" id="name" name="name" value={user} onChange={handleChange("name")} />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input required type="email" id="email" name="email" value={user} onChange={handleChange("email")} />
        </div>
        <button name="cancel" onClick={cancel}>Cancel</button>
        <button name="submit" type="submit">Submit</button>
      </form>
    </div>
  )
}