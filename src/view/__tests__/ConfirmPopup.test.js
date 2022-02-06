import { render, fireEvent, screen } from "@testing-library/react";

const cancel = jest.fn();
const confirm = jest.fn();
describe("view :: ConfirmPopup", () => {
  describe("when click on cancel", () => {
    it("should call cancel", () => {
      render(<ConfirmPopup confirm={confirm} cancel={cancel} />);
      fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
      expect(cancel).toHaveBeenCalledTimes(1);
    });
  });
  describe("when click on confirm", () => {
    it("should call confirm", () => {
      render(<ConfirmPopup confirm={confirm} cancel={cancel} />);
      fireEvent.click(screen.getByRole("button", { name: /confirm/i }));
      expect(confirm).toHaveBeenCalledTimes(1);
    });
  });
});
