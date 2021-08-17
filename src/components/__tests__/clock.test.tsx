import { render, screen } from "@testing-library/react";
import Clock from "../Clock";

test("should display the current time in the clock component", () => {
  render(<Clock />);

  const element = screen.getByTestId("clock");
  expect(element).toHaveTextContent(new Date().toLocaleTimeString());
});
