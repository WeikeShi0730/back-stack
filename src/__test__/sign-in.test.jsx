import { render, screen } from "@testing-library/react";
// import { Router } from "react-router-dom";
// import { createMemoryHistory } from "history";
import SignIn from "../components/sign-in/sign-in.component";

let documentBody;
describe("<SignIn />", () => {
//   const history = createMemoryHistory();
  test("<SignIn />", () => {
    documentBody = render(<SignIn />);
    expect(
      screen.getByText("Alrady have an account? Sign in 🔐")
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Sign in/i })).toHaveLength(2);
    const { baseElement } = documentBody;
    expect(baseElement).toMatchSnapshot();
  });
});
