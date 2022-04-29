import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Account from "../pages/account/account.component";

describe("<Header />", () => {
  test("<Header />", () => {
    const { baseElement } = render(<Account />);
    expect(baseElement).toMatchSnapshot();
  });
});
