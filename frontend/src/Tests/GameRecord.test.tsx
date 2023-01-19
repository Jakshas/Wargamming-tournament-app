import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { EventGameRecord } from "../GameRecord/EventGameRecord";
import { EventGameRecordFromEvent } from "../GameRecord/EventGameRecordFromEvent";
import { GET_EVENT_GAME_RECORD_FROM_EVENT_FOR_GAME_QUERY } from "../GraphQL";

describe("GameRecord", () => {
    it("GameRecord for event display corect numer of games test", async () => {
        const getEventGameRecordForEventForGame = [{
            id: 1,
            event: { id: 1, organizer: { id: 1 } },
            round: 1,
            playerOne: { id: 1 },
            playerTwo: { id: 1 },
            playerOnePoints: 1,
            playerTwoPoints: 1,
            done: true
        }];

        const mocks = [
            {
                request: {
                    query: GET_EVENT_GAME_RECORD_FROM_EVENT_FOR_GAME_QUERY,
                    variables: {
                        eventid: undefined,
                        round: undefined
                    }
                },
                result: {
                    data: {
                        getEventGameRecordForEventForGame,
                    },
                },
            },
        ];
        render(
            <MockedProvider mocks={mocks}>
                <BrowserRouter>
                    <EventGameRecordFromEvent />
                </BrowserRouter>
            </MockedProvider>
        );
        const items = await screen.findAllByRole("row");

        expect(items).toHaveLength(getEventGameRecordForEventForGame.length + 1);
    })
    it("GameRecord display test", async () => {

        render(
            <MockedProvider >
                <BrowserRouter>
                    <EventGameRecord record={{
                        id: 1,
                        event: { id: 1, roundStart: "", lastCalled: "", eventGameRecords: [null as any], eventUserRecords: [null as any], state: "BEFORE", name: "", participants: [null as any], maxRounds: 1, round: 1, organizer: { id: 1, name: "", email: "", password: "", events: [null as any] } },
                        round: 1,
                        playerOne: { id: 1, name: "", email: "", password: "", events: [null as any] },
                        playerTwo: { id: 1, name: "", email: "", password: "", events: [null as any] },
                        playerOnePoints: 1,
                        playerTwoPoints: 1,
                        done: true
                    }} index={0} />
                </BrowserRouter>
            </MockedProvider>
        );
        const items = await screen.findAllByRole("row");
    })
})