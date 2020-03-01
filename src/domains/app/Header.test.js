import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Header from "./Header";
import StoreProvider from "contexts/StoreProvider";
import SocketProvider from "contexts/SocketProvider";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    value: jest.fn(() => {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    })
  });
});

describe("render header", () => {
  test("get header", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StoreProvider>
          <SocketProvider>
            <Header />
          </SocketProvider>
        </StoreProvider>
      </BrowserRouter>
    );

    const element = getByTestId("header");

    expect(element).toBeInTheDocument();
  });
});
