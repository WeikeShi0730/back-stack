import { render } from "@testing-library/react";
import ResetPassword from "../pages/reset-password/reset-password.component";

describe("<ResetPassword />", () => {
  test("<ResetPassword />", () => {
    const { baseElement } = render(<ResetPassword />);
    expect(baseElement).toMatchSnapshot();
  });
});
