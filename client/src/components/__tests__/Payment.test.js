import React from "react";
import Payment from "../Payment";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "redux-mock-store";
import renderer from "react-test-renderer";

const mockStore = configureStore([]);

const store = mockStore({
  users: {
    user: { email: "test@gmail.com" },
    isSuccess: false,
    isError: false,
    isLoading: false,
  },
});

test("Match the Payment UI snapshot...", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <Payment />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("Card number accepts only 16 digits", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Payment />
      </BrowserRouter>
    </Provider>
  );

  const cardInput = screen.getByPlaceholderText(/card number/i);
  fireEvent.change(cardInput, {
    target: { value: "12345678901234567890" },
  });

  expect(cardInput.value.length).toBe(16);
});

test("CVV accepts only 3 digits", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Payment />
      </BrowserRouter>
    </Provider>
  );

  const cvvInput = screen.getByPlaceholderText(/cvv/i);
  fireEvent.change(cvvInput, {
    target: { value: "12345" },
  });

  expect(cvvInput.value.length).toBe(3);
});

test("Pay button is disabled until valid data is entered", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Payment />
      </BrowserRouter>
    </Provider>
  );

 const payButton = screen.getAllByRole("button").find(
  (btn) => btn.textContent.trim() === "Pay");
  expect(payButton).toBeDisabled();

  fireEvent.change(screen.getByPlaceholderText(/card number/i), {
    target: { value: "1234567890123456" },
  });

  fireEvent.change(screen.getByPlaceholderText(/expired date/i), {
    target: { value: "12/2030" },
  });

  fireEvent.change(screen.getByPlaceholderText(/cvv/i), {
    target: { value: "123" },
  });

  expect(payButton).not.toBeDisabled();
});
