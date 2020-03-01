import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import RegisterPage from "./RegisterPage";
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

describe("render register page", () => {
  test("get register page", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StoreProvider>
          <SocketProvider>
            <RegisterPage />
          </SocketProvider>
        </StoreProvider>
      </BrowserRouter>
    );

    const element = getByTestId("register-page");

    expect(element).toBeInTheDocument();
  });

  test("get register form", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StoreProvider>
          <SocketProvider>
            <RegisterPage />
          </SocketProvider>
        </StoreProvider>
      </BrowserRouter>
    );

    const element = getByTestId("register-form");

    expect(element).toBeInTheDocument();
  });

  test("get welcome text", () => {
    const { getByText } = render(
      <BrowserRouter>
        <StoreProvider>
          <SocketProvider>
            <RegisterPage />
          </SocketProvider>
        </StoreProvider>
      </BrowserRouter>
    );

    const element = getByText(/Register a new Account at/);

    expect(element.innerHTML).toBe(
      `Register a new Account at ${process.env.REACT_APP_NAME}`
    );
  });
});
