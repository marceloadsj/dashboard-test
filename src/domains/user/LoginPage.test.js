import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import LoginPage from "./LoginPage";
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

describe("render login page", () => {
  test("get login page", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StoreProvider>
          <SocketProvider>
            <LoginPage />
          </SocketProvider>
        </StoreProvider>
      </BrowserRouter>
    );

    const element = getByTestId("login-page");

    expect(element).toBeInTheDocument();
  });

  test("get login card", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StoreProvider>
          <SocketProvider>
            <LoginPage />
          </SocketProvider>
        </StoreProvider>
      </BrowserRouter>
    );

    const element = getByTestId("login-card");

    expect(element).toBeInTheDocument();
  });

  test("get welcome text", () => {
    const { getByText } = render(
      <BrowserRouter>
        <StoreProvider>
          <SocketProvider>
            <LoginPage />
          </SocketProvider>
        </StoreProvider>
      </BrowserRouter>
    );

    const element = getByText(/Welcome to/);

    expect(element.innerHTML).toBe(`Welcome to ${process.env.REACT_APP_NAME}`);
  });
});
