import { render, screen } from "@testing-library/react";
import SignOut from "../components/sign-out/sign-out.component";

let documentBody;
describe("<SignOut />", () => {
  it("Test <SignOut />", () => {
    documentBody = render(<SignOut />);
    expect(screen.getByText("Sign out")).toBeInTheDocument();

    const { baseElement } = documentBody;
    expect(baseElement).toMatchSnapshot();
  });
});
