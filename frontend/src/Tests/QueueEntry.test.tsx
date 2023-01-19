import { MockedProvider } from "@apollo/client/testing";
import { idID } from "@mui/material/locale";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { GET_QUEUE_OF_EVENT, USER_BY_ID_QUERY } from "../GraphQL";
import { QueueEntry } from "../Queue/QueueEntry";
import { QueueForEvent } from "../Queue/QueueForEvent";

describe("QueueEntry", () => {
    it("QueueForEvent test", async () => {
        const getQueueOfEvent = [{ eventID: 1, userID: 1 }];
        const userByID = { id: 1, name: "JS" }
        const mocks1 = [
            {
                request: {
                    query: GET_QUEUE_OF_EVENT,
                    variables: {
                        eventID: 1
                    }
                },
                result: {
                    data: {
                        getQueueOfEvent,
                    },
                },
            },
            {
                request: {
                    query: USER_BY_ID_QUERY,
                    variables: {
                        userid: 1
                    }
                },
                result: {
                    data: {
                        userByID,
                    },
                },
            },
        ];
        render(
            <MockedProvider mocks={mocks1}>
                <BrowserRouter>
                    <QueueForEvent eventID={1} organizerID={1} token={1} />
                </BrowserRouter>
            </MockedProvider>
        );

        const items = await screen.findAllByRole("row");

        expect(items).toHaveLength(2);
    })
    it("QueueEntry test", async () => {
        const getQueueOfEvent = [{ eventID: 1, userID: 1 }];
        const userByID = { id: 1, name: "JS" }
        const mocks1 = [
            {
                request: {
                    query: GET_QUEUE_OF_EVENT,
                    variables: {
                        eventID: 1
                    }
                },
                result: {
                    data: {
                        getQueueOfEvent,
                    },
                },
            },
            {
                request: {
                    query: USER_BY_ID_QUERY,
                    variables: {
                        userid: 1
                    }
                },
                result: {
                    data: {
                        userByID,
                    },
                },
            },
        ];
        render(
            <MockedProvider mocks={mocks1}>
                <BrowserRouter>
                    <QueueEntry queue={{ id: 1, userID: 1, eventID: 1 }} organizerID={1} lookinguserID={1} eventID={1} />
                </BrowserRouter>
            </MockedProvider>
        );

        const items = await screen.findAllByRole("row");

        expect(items).toHaveLength(1);
    })
})