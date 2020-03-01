import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ListPage from "./ListPage";
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

describe("render list page", () => {
  test("get list page", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StoreProvider>
          <SocketProvider>
            <ListPage />
          </SocketProvider>
        </StoreProvider>
      </BrowserRouter>
    );

    const element = getByTestId("list-page");

    expect(element).toBeInTheDocument();
  });

  test("get list card", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StoreProvider>
          <SocketProvider>
            <ListPage />
          </SocketProvider>
        </StoreProvider>
      </BrowserRouter>
    );

    const element = getByTestId("list-card");

    expect(element).toBeInTheDocument();
  });
});
