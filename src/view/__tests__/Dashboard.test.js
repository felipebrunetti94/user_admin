import App from "../../App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen } from "../../test/test-utils";

const users = [
  {
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
  },
];
export const handlers = [
  rest.get(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data",
    (req, res, ctx) => {
      return res(ctx.json(users), ctx.delay(150));
    }
  ),
  rest.delete(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/1",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.delay(150));
    }
  ),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("view :: Dashboard", () => {
  describe("when successfully fetch users", () => {
    it("should render user info", async () => {
      render(<App />);

      expect(screen.getByTestId("table-loader"));

      expect(await screen.findByText("Leanne Graham")).toBeInTheDocument();
    });
  });

  describe("when click on delete button", () => {
    it("should open popup with user name", async () => {
      render(<App />);

      fireEvent.click(await screen.findByRole("button", { name: "delete" }));

      expect(
        screen.getByText("Are you sure you want to delete user Leanne Graham")
      ).toBeInTheDocument();
    });
  });

  describe("when delete only user", () => {
    it("should show no user message", async () => {
      render(<App />);

      fireEvent.click(await screen.findByRole("button", { name: "delete" }));

      fireEvent.click(screen.getByRole("button", { name: "Delete" }));

      expect(await screen.findByText("No user found!")).toBeInTheDocument();
      expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
    });
  });

  describe("when edit user", () => {
    it("should redirect to edit page", async () => {
      render(<App />);

      fireEvent.click(await screen.findByRole("button", { name: "edit" }));

      expect(screen.getByText("Form")).toBeInTheDocument();
    });
    it("should fill inputs with user data", async () => {
      render(<App />);

      fireEvent.click(await screen.findByRole("button", { name: "edit" }));

      expect(screen.getByDisplayValue("Leanne Graham")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Kulas Light")).toBeInTheDocument();
    });
  });

  describe("when create user", () => {
    it("should redirect to edit page", async () => {
      render(<App />);

      fireEvent.click(await screen.findByRole("button", { name: "Add new" }));

      expect(screen.getByText("Form")).toBeInTheDocument();
    });
  });
});
