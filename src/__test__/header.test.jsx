import { render } from "@testing-library/react";
import Header from "../components/header/header.component";

describe("<Header />", () => {
  test("<Header />", () => {
    const { baseElement } = render(
        <Header />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
