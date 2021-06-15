import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";
import Form from "components/Appointment/Form";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Appointment />);
});
