import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Footer from "./Footer";
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

describe("render footer", () => {
  test("get footer", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <StoreProvider>
          <SocketProvider>
            <Footer />
          </SocketProvider>
        </StoreProvider>
      </BrowserRouter>
    );

    const element = getByTestId("footer");

    expect(element).toBeInTheDocument();
  });
});
