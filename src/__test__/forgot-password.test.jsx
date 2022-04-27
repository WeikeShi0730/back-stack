import { render } from "@testing-library/react";
import ForgotPassword from "../components/forgot-password/forgot-password.component";

describe("<ForgotPassword />", () => {
  test("<ForgotPassword />", () => {
    const { baseElement } = render(<ForgotPassword />);
    expect(baseElement).toMatchSnapshot();
  });
});
