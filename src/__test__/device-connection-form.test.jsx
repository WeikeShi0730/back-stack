import { render } from "@testing-library/react";
import DeviceConnectionForm from "../components/device-connection-form/device-connection-form.component";

describe("<DeviceConnectionForm />", () => {
  test("<DeviceConnectionForm />", () => {
    const { baseElement } = render(<DeviceConnectionForm />);
    expect(baseElement).toMatchSnapshot();
  });
});
