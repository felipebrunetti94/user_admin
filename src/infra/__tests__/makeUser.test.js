import { makeUser } from "../user/makeUser";

describe("infra :: makeUser", () => {
  it("should create user with empty fields", () => {
    expect(makeUser({}).name).toBe("");
  });

  it("should create user with params", () => {
    expect(makeUser({ name: "test" }).name).toBe("test");
  });
});
