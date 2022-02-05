import EditorUser from '../EditorUser'
import { fireEvent, render, screen } from "@testing-library/react"

const user =
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
}



const cancel = jest.fn()
const updateField = jest.fn()
const onSubmit = jest.fn()

describe("view :: EditorUSer", () => {
  describe("when click on cancel button", () => {
    it("should call cancel", () => {
      render(<EditorUser
        user={user}
        cancel={cancel}
        updateField={updateField}
        onSubmit={onSubmit}
      />)
      fireEvent.click(screen.getByRole("button", { name: /cancel/i }))
      expect(cancel).toHaveBeenCalledTimes(1)
    })
  })

  describe("when click on submit button", () => {
    it("should call onSubmit", () => {
      render(<EditorUser
        user={user}
        onSubmit={onSubmit}
        updateField={updateField}
        cancel={cancel}
      />)
      fireEvent.click(screen.getByRole("button", { name: /submit/i }))
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })
  })

  describe("when change name field", () => {
    it("should call updateField with name and value", () => {
      render(<EditorUser
        user={user}
        onSubmit={onSubmit}
        updateField={updateField}
        cancel={cancel}
      />)
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "test" } })
      expect(updateField).toHaveBeenCalledWith("name", "test")
    })
  })

  describe("when change email field", () => {
    it("should call updateField with email and value", () => {
      render(<EditorUser
        user={user}
        onSubmit={onSubmit}
        updateField={updateField}
        cancel={cancel}
      />)
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@test.com" } })
      expect(updateField).toHaveBeenCalledWith("email", "test@test.com")
    })
  })
})