import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import StoreProvider from "./contexts/StoreProvider";
import SocketProvider from "./contexts/SocketProvider";

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

describe("render application", () => {
  test("get app", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StoreProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </StoreProvider>
      </BrowserRouter>
    );

    const element = getByTestId("app");

    expect(element).toBeInTheDocument();
  });

  test("get header", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StoreProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </StoreProvider>
      </BrowserRouter>
    );

    const element = getByTestId("header");

    expect(element).toBeInTheDocument();
  });

  test("get footer", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StoreProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </StoreProvider>
      </BrowserRouter>
    );

    const element = getByTestId("footer");

    expect(element).toBeInTheDocument();
  });
});
