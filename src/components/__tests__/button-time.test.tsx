import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import ButtonTime from "../ButtonTime";

test("should move to the home component", () => {
  const history = createMemoryHistory();

  render(<ButtonTime onClick={() => history.push("/")} />);

  const element = screen.getByTestId("button-time");
  userEvent.click(element);
  expect(history.length).toBe(2);
  expect(history.location.pathname).toBe("/");
});
