import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { render, fireEvent } from "@testing-library/react";

import TechList from "~/components/TechList";

import { addTech } from "~/store/modules/techs/actions";

jest.mock("react-redux");

describe("TechList component", () => {
  it("should render tech list", () => {
    // Simulando o funcionamento da função useSelector
    // dentro de um mock para testes
    useSelector.mockImplementation(cb =>
      cb({
        techs: ["Node.js", "ReactJS"]
      })
    );

    const { getByText, getByTestId } = render(<TechList />);

    expect(getByTestId("tech-list")).toContainElement(getByText("Node.js"));
    expect(getByTestId("tech-list")).toContainElement(getByText("ReactJS"));
  });

  it("should be able to add new tech", () => {
    const { getByLabelText, getByTestId } = render(<TechList />);

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    fireEvent.change(getByLabelText("Tech"), {
      target: {
        value: "Node.js" // e.target.value
      }
    });

    fireEvent.submit(getByTestId("tech-form"));

    //console.log(dispatch.mock.calls);

    expect(dispatch).toHaveBeenCalledWith(addTech());
  });
});
