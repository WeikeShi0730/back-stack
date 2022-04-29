import { render } from "@testing-library/react";
import Login from "../pages/login/login.component";

describe("<Login />", () => {
  test("<Login />", () => {
    const { baseElement } = render(<Login />);
    expect(baseElement).toMatchSnapshot();
  });
});
