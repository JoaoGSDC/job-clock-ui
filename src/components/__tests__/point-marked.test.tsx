import { render, screen } from "@testing-library/react";
import PointMarked from "../PointMarked";

test("should display the date and hour in the point marked component", () => {
  render(<PointMarked hour="12:00:00" date="Tue Aug 17 2021" sense="A" />);

  const hourElement = screen.getByTestId("hour");
  const dateElement = screen.getByTestId("date");
  const circleElement = screen.getByTestId("circle");

  expect(hourElement).toHaveTextContent("12:00:00");
  expect(dateElement).toHaveTextContent("Tue Aug 17 2021");

  const circleStyle = window.getComputedStyle(circleElement);
  expect(circleStyle.backgroundColor).toBe("rgb(0, 213, 0)"); // #00d500
});
