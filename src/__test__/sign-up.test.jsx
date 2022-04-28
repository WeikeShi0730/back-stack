import { render, screen } from "@testing-library/react";
import SignUp from "../components/sign-up/sign-up.component";

let documentBody;
describe("<SignUp />", () => {
  it("Test <SignUp />", () => {
    documentBody = render(<SignUp />);
    expect(
      screen.getByRole("button", { name: /Sign up/i })
    ).toBeInTheDocument();

    const { baseElement } = documentBody;
    expect(baseElement).toMatchSnapshot();
  });
});
