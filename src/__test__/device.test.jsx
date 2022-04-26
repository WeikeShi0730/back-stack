import { render, screen } from "@testing-library/react";
import Device from "../components/device/device.component";

describe("<Device />", () => {
  test("<Device /> activate", () => {
    const { baseElement } = render(
      <Device
        device={{
          activate: true,
          name: "test",
        }}
        setDeviceList={() => {}}
      />
    );
    expect(screen.queryByText("Activate")).not.toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();
  });

  test("<Device /> not activate", () => {
    const { baseElement } = render(
      <Device
        device={{
          activate: false,
          name: "test",
        }}
        setDeviceList={() => {}}
      />
    );
    expect(
      screen.getByRole("button", { name: /activate/i })
    ).toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();
  });
});
