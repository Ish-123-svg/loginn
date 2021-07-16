import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ActivationPage from "./ActivationPage";
import ThreatType from "./ThreatType";

describe("ActivationPage Component", () => {
  it("renders the ActivationPage component with activation button", () => {
    const { getByRole } = render(<ActivationPage />);
    const input = getByRole("button", { name: /Click here to activate FRS/i });
    expect(input).toBeTruthy();
  });
  it("Displays activation message on clicking the activation button", () => {
    const { getByRole } = render(<ActivationPage />);
    userEvent.click(
      screen.getByRole("button", {
        name: /Click here to activate FRS/i,
      })
    );
    expect(
      screen.getByText(/FRS Activated, authorities notified/i)
    ).toBeTruthy();
  });
});
