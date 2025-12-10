import React from "react";
import Login from "../Login"
import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "redux-mock-store";
import reducer from "../../features/UserSlice";


// mock store
const myMockStore = configureStore([])
const myStore = myMockStore(
    {
        users: {
            user: null,
            isSuccess: false,
            isError: false,
            isLoading: false
        }
    }
)

// to match UI snapshot
test("Match the Login UI snapshot...", () => {
    const { container } = render(
        <Provider store={myStore}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </Provider>
    )
    screen.debug(container)

    expect(container).toMatchSnapshot()
})


// check the initial state
const myState = {
    user: {},
    message : "",
    isSuccess: false,
    isError: false,
    isLoading: false
}

test("To match the initial state....", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(myState)
})

test("checking email format....", () => {
    render(
    <Provider store={myStore}>
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/email/i)
    fireEvent.change(emailInput,{target:{value:"abc@gmail.com"}});

    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegEx.test(emailInput.value)).toBe(true);
})


test("checking Password format....", () => {
    render(
    <Provider store={myStore}>
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    </Provider>
    );

    const PasswordInput = screen.getByPlaceholderText(/password/i)
    fireEvent.change(PasswordInput,{target:{value:"Abc@123"}});

    const PassRegEx = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    expect(PassRegEx.test(PasswordInput.value)).toBe(true);
})
