import { render, screen } from "@testing-library/react";
import Card from "../Card";

test("should show the children prop in the card component", () => {
  render(<Card>test</Card>);

  const element = screen.getByTestId("card");
  expect(element).toHaveTextContent("test");
});
