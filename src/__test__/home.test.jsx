import { render, screen } from "@testing-library/react";
import Home from "../pages/home/home.component";

describe("<Home />", () => {
  test("<Home />", () => {
    const { baseElement } = render(<Home />);
    expect(screen.getByText("Back Stack")).toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();
  });
});
