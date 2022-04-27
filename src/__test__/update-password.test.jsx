import { render } from "@testing-library/react";
import UpdatePassword from "../components/update-password/update-password.component";

describe("<UpdatePassword />", () => {
  test("<UpdatePassword />", () => {
    const { baseElement } = render(<UpdatePassword />);
    expect(baseElement).toMatchSnapshot();
  });
});
