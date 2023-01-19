import "@testing-library/jest-dom";
import { ADD_USER_MUTATION, LOGIN_MUTATION } from "../GraphQL";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Login } from "../Login/Login";
import { Register } from "../Login/Register";

describe("Login", () => {
    it("Login display  test", async () => {
        const mocks = [
            {
                request: {
                    query: LOGIN_MUTATION,
                    variables: {
                        email: "1",
                        password: "1"
                    }
                },
                newData: jest.fn(() => {
                    return { data: { login: "added" } };
                }),
            },
        ];
        render(
            <MockedProvider mocks={mocks}>
                <BrowserRouter>
                    <Login setToken={() => { }} setID={() => { }} />
                </BrowserRouter>
            </MockedProvider>
        );
        let input = screen.getByLabelText("Email");
        await userEvent.type(input, "1");
        await expect(input).toHaveValue("1");
        input = screen.getByLabelText("Password");
        await userEvent.type(input, "1");
        await expect(input).toHaveValue("1");
        userEvent.click(screen.getByText('Submit'))
        await expect(mocks[0].newData).toHaveBeenCalledTimes(1);
    })
    it("Register and submit  test", async () => {
        const mocks = [
            {
                request: {
                    query: ADD_USER_MUTATION,
                    variables: {
                        name: "1234567890",
                        email: "1234567890@gmail.com",
                        password: "1234567890"
                    }
                },
                newData: jest.fn(() => {
                    return { data: { addUser: "added" } };
                }),
            },
        ];
        render(
            <MockedProvider mocks={mocks}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </MockedProvider>
        );
        let input = screen.getByLabelText("Email");
        await userEvent.type(input, "1234567890@gmail.com");
        await expect(input).toHaveValue("1234567890@gmail.com");
        input = screen.getByLabelText("Password");
        await userEvent.type(input, "1234567890");
        await expect(input).toHaveValue("1234567890");
        input = screen.getByLabelText("Username");
        await userEvent.type(input, "1234567890");
        await expect(input).toHaveValue("1234567890");
        input = screen.getByLabelText("Repeat password");
        await userEvent.type(input, "1234567890");
        await expect(input).toHaveValue("1234567890");
        userEvent.click(screen.getByText('Submit'))
        await expect(mocks[0].newData).toHaveBeenCalledTimes(1);
    })
    it("Register and wrong data submit test", async () => {
        const mocks = [
            {
                request: {
                    query: ADD_USER_MUTATION,
                    variables: {
                        name: "1234567890",
                        email: "1234567890@gmail.com",
                        password: "1234567890"
                    }
                },
                newData: jest.fn(() => {
                    return { data: { addUser: "added" } };
                }),
            },
        ];
        render(
            <MockedProvider mocks={mocks}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </MockedProvider>
        );
        let input = screen.getByLabelText("Email");
        await userEvent.type(input, "1234567890@gmail.com");
        await expect(input).toHaveValue("1234567890@gmail.com");
        input = screen.getByLabelText("Password");
        await userEvent.type(input, "1");
        await expect(input).toHaveValue("1");
        input = screen.getByLabelText("Username");
        await userEvent.type(input, "1234567890");
        await expect(input).toHaveValue("1234567890");
        input = screen.getByLabelText("Repeat password");
        await userEvent.type(input, "1234567890");
        await expect(input).toHaveValue("1234567890");
        userEvent.click(screen.getByText('Submit'))
        await expect(mocks[0].newData).toHaveBeenCalledTimes(0);
    })
})