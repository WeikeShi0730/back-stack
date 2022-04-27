import { render } from "@testing-library/react";
import Loading from "../components/loading/loading.component";

describe("<Loading />", () => {
  test("<Loading />", () => {
    const { baseElement } = render(<Loading />);
    expect(baseElement).toMatchSnapshot();
  });
});
