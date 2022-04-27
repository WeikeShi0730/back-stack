import { render } from "@testing-library/react";
import DeviceList from "../components/device-list/device-list.component";

describe("<DeviceList />", () => {
  test("<DeviceList />", () => {
    const { baseElement } = render(<DeviceList />);
    expect(baseElement).toMatchSnapshot();
  });
});
