import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { STATS_FOR_USER } from "../GraphQL";
import { UserDetails } from "../User/UserDetails";

describe("User", () => {
    it("UserDetails display test", async () => {
        const mocks1 = [
            {
                request: {
                    query: STATS_FOR_USER,
                    variables: {
                        id: ""
                    }
                },
                result: {
                    data: {
                        statsForUser: { wins: 1, loses: 2, averagePoints: 10 },
                    },
                },
            },
        ];
        render(
            <MockedProvider mocks={mocks1}>
                <BrowserRouter>
                    <UserDetails />
                </BrowserRouter>
            </MockedProvider>
        );
        const items = await screen.findAllByRole("row");

        expect(items).toHaveLength(2);
        const items1 = await screen.findAllByText("1");
        expect(items1).toHaveLength(1);
        const items2 = await screen.findAllByText("2");
        expect(items2).toHaveLength(1);
        const items3 = await screen.findAllByText("10");
        expect(items3).toHaveLength(1);
    })
})