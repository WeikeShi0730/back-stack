import { render, screen } from "@testing-library/react";
import ForgotPassword from "../components/forgot-password/forgot-password.component";

let documentBody;
describe("<ForgotPassword />", () => {
  test("<ForgotPassword />", () => {
    documentBody = render(<ForgotPassword />);
    expect(
      screen.getByRole("button", { name: /Send a password reset email/i })
    ).toBeInTheDocument();
    const { baseElement } = documentBody;
    expect(baseElement).toMatchSnapshot();
  });
});
