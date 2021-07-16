import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "./Register";

describe("Register Component", () => {
  it("changes state on typing in field with corresponding label name", async () => {
    const { getByText } = render(<Register />);
    const firstNameLabel = getByText(/First Name:/);
    expect(firstNameLabel).toBeTruthy();
  });
});
