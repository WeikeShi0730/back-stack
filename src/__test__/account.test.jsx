import { render } from "@testing-library/react";
import Account from "../pages/account/account.component";

describe("<Account />", () => {
  test("<Account />", () => {
    const { baseElement } = render(<Account />);
    expect(baseElement).toMatchSnapshot();
  });
});
