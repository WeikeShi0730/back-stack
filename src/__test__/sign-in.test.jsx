import { render, fireEvent, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import SignIn from "../components/sign-in/sign-in.component";

let documentBody;
const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
describe("<SignIn />", () => {
  const history = createMemoryHistory();
  test("<SignIn />", () => {
    documentBody = render(<SignIn />);
    expect(
      screen.getByText("Alrady have an account? Sign in 🔐")
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Sign in/i })).toHaveLength(2);

    const { baseElement } = documentBody;
    expect(baseElement).toMatchSnapshot();
  });
  test("click router <SignIn />", () => {
    documentBody = render(
      <Router history={history}>
        <SignIn />
      </Router>
    );
    fireEvent.click(screen.getByRole("button", { name: /Forgot password?/i }));
    expect(mockHistoryPush).toHaveBeenCalledWith("/reset-password");
  });
});
