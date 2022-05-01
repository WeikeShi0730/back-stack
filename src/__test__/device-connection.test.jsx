import { render } from "@testing-library/react";
import DeviceConnection from "../pages/device-connection/device-connection.component";

describe("<DeviceConnection />", () => {
  test("<DeviceConnection />", () => {
    const { baseElement } = render(<DeviceConnection />);
    expect(baseElement).toMatchSnapshot();
  });
});
