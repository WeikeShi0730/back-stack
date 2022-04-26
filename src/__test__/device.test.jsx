import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Device from "../components/device/device.component";

test("<Device />", () => {
  const { container, getByText, baseElement } = render(
    <Device device={null} setDeviceList={() => {}} />
  );
  // beforeEach(() => {
  //   documentBody = render(<Comparison />);
  // });
  // it("shows content in <Device />", () => {
  // const { baseElement } = documentBody;
  expect(baseElement).toMatchSnapshot();
  // });
});
