import { render } from "@testing-library/react";
import ExcerciseReport from "../pages/excercise-report/excercise-report.component";

describe("<ExcerciseReport />", () => {
  test("<ExcerciseReport />", () => {
    const { baseElement } = render(<ExcerciseReport />);
    expect(baseElement).toMatchSnapshot();
  });
});
