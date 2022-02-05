import Dashboard from "../Dashboard"
import { fireEvent, render, screen } from "@testing-library/react"

const mock = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
]

const mockedUser = mock[0]
const addUser = jest.fn()
const editUser = jest.fn()
const deleteUser = jest.fn()

describe("view :: Dashboard", () => {
  describe("when users list is not empty", () => {
    it("should render id", () => {
      render(<Dashboard
        users={mock}
        addUser={addUser}
        deleteUser={deleteUser}
        editUser={editUser}
      />)

      expect(screen.getByText(`${mockedUser.id}`))
    })
    it("should render name", () => {
      render(<Dashboard
        users={mock}
        addUser={addUser}
        deleteUser={deleteUser}
        editUser={editUser}
      />)
      expect(screen.getByText(mockedUser.name))
    })
    it("should render username", () => {
      render(<Dashboard
        users={mock}
        addUser={addUser}
        deleteUser={deleteUser}
        editUser={editUser}
      />)
      expect(screen.getByText(mockedUser.username))
    })
    it("should render city", () => {
      render(<Dashboard
        users={mock}
        addUser={addUser}
        deleteUser={deleteUser}
        editUser={editUser}
      />)
      expect(screen.getByText(mockedUser.address.city))
    })
    it("should render email", () => {
      render(<Dashboard
        users={mock}
        addUser={addUser}
        deleteUser={deleteUser}
        editUser={editUser}
      />)
      expect(screen.getByText(mockedUser.email))
    })
  })

  describe("when users list is empty", () => {
    it("should show empty message", () => {
      render(<Dashboard users={[]} addUser={addUser} deleteUser={deleteUser} editUser={editUser} />)
      expect(screen.getByText('no user found'))
    })
  })

  describe("when click on add button", () => {
    it("should call addUser", () => {
      render(<Dashboard
        users={mock}
        addUser={addUser}
        deleteUser={deleteUser}
        editUser={editUser}
      />)
      fireEvent.click(screen.getByRole("button", { name: /add/i }))
      expect(addUser).toHaveBeenCalledTimes(1)
    })
  })

  describe("when click on edit button", () => {
    it("should call editUser", () => {
      render(<Dashboard
        users={mock}
        addUser={addUser}
        deleteUser={deleteUser}
        editUser={editUser}
      />)
      fireEvent.click(screen.getByRole("button", { name: /edit/i }))
      expect(editUser).toHaveBeenCalledTimes(1)
    })
  })

  describe("when click on delete button", () => {
    it("should call deleteUser", () => {
      render(<Dashboard
        users={mock}
        addUser={addUser}
        deleteUser={deleteUser}
        editUser={editUser}
      />)
      fireEvent.click(screen.getByRole("button", { name: /delete/i }))
      expect(deleteUser).toHaveBeenCalledTimes(1)
    })
  })
})