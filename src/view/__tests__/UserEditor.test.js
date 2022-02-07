import UserEditor from "../user/UserEditor";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { makeUser } from "../../infra/user/makeUser";

const user = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};

const onSubmit = jest.fn();

function Wrapper({ children }) {
  return (
    <MemoryRouter initialEntries={["/test"]}>
      <Routes>
        <Route path="/" element={<div>HOME</div>} />
        <Route path="/test" element={children} />
      </Routes>
    </MemoryRouter>
  );
}

describe("view :: UserEditor", () => {
  describe("when click on cancel button", () => {
    it("should redirect to home", () => {
      render(
        <UserEditor editedUser={user} isLoading={false} onSubmit={onSubmit} />,
        {
          wrapper: Wrapper,
        }
      );

      fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

      expect(screen.getByText("HOME")).toBeInTheDocument();
    });
  });

  describe("when requiredOnly", () => {
    it("should hide all non required inputs", () => {
      render(
        <UserEditor
          editedUser={user}
          isLoading={false}
          onSubmit={onSubmit}
          requiredOnly
        />,
        {
          wrapper: Wrapper,
        }
      );

      expect(screen.queryByDisplayValue("Bret")).not.toBeInTheDocument();
    });
  });

  describe("when name and email are not empty", () => {
    it("should call onSubmit with user", () => {
      render(
        <UserEditor editedUser={user} isLoading={false} onSubmit={onSubmit} />,
        {
          wrapper: Wrapper,
        }
      );

      fireEvent.click(screen.getByRole("button", { name: /submit/i }));

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe("when name is empty", () => {
    it("should not submit", () => {
      render(
        <UserEditor
          editedUser={makeUser({})}
          isLoading={false}
          onSubmit={onSubmit}
        />,
        {
          wrapper: Wrapper,
        }
      );

      fireEvent.click(screen.getByRole("button", { name: /submit/i }));

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe("when email is empty", () => {
    it("should not submit", () => {
      render(
        <UserEditor
          editedUser={makeUser({})}
          isLoading={false}
          onSubmit={onSubmit}
        />,
        {
          wrapper: Wrapper,
        }
      );

      fireEvent.click(screen.getByRole("button", { name: /submit/i }));

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
