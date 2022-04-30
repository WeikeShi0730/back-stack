import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/header/header.component";

describe("<Header />", () => {
  test("<Header />", () => {
    window.innerWidth = 2400;
    window.dispatchEvent(new Event("resize"));
    const { baseElement } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText("Home 🏠")).toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();
  });
});
