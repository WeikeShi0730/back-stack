import { render, renderer } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/header/header.component";

describe("<Header />", () => {
  test("<Header />", () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(baseElement).toMatchSnapshot();
  });
});
