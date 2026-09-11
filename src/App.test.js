import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the CareerForge home page", () => {
  render(<App />);
  expect(screen.getAllByText(/careerforge/i).length).toBeGreaterThan(0);
});
