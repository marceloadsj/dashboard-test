import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ChartPage from "./ChartPage";
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

describe("render chart page", () => {
  test("get chart page", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StoreProvider>
          <SocketProvider>
            <ChartPage />
          </SocketProvider>
        </StoreProvider>
      </BrowserRouter>
    );

    const element = getByTestId("chart-page");

    expect(element).toBeInTheDocument();
  });

  test("get chart-first card", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StoreProvider>
          <SocketProvider>
            <ChartPage />
          </SocketProvider>
        </StoreProvider>
      </BrowserRouter>
    );

    const element = getByTestId("chart-first-card");

    expect(element).toBeInTheDocument();
  });

  test("get chart second card", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StoreProvider>
          <SocketProvider>
            <ChartPage />
          </SocketProvider>
        </StoreProvider>
      </BrowserRouter>
    );

    const element = getByTestId("chart-second-card");

    expect(element).toBeInTheDocument();
  });
});
