import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { GET_EVENT_USER_RECORD_FROM_EVENT_QUERY, GET_EVENT_USER_RECORD_FROM_USER_QUERY, SET_BONUS_POINTS } from "../GraphQL";
import { EventUserRecord } from "../UserRecord/EventUserRecord";
import { EventUserRecordDetails } from "../UserRecord/EventUserRecordDetails";
import { EventUserRecordFromEvent } from "../UserRecord/EventUserRecordFromEvent";
import { EventUserRecordFromUser } from "../UserRecord/EventUserRecordFromUser";
import { EventUserRecordSummary } from "../UserRecord/EventUserRecordSummary";

describe("EventUserRecord", () => {
    it("EventUserRecord display test", async () => {
        render(
            <MockedProvider>
                <BrowserRouter>
                    <EventUserRecord record={{
                        id: 1,
                        user: { id: 1, name: "", email: "", password: "", events: [null as any] },
                        event: { id: 1, name: "One", organizer: { id: 1, name: "!", email: "", password: "", events: [null as any] }, participants: [null as any], maxRounds: 1, round: 0, state: "BEFORE", roundStart: "", lastCalled: "", eventGameRecords: [null as any], eventUserRecords: [null as any] },
                        rounds: 1,
                        points: 1,
                        wins: 1,
                        loses: 1,
                        list: "",
                        bonusPoints: 1,
                    }} index={0} />
                </BrowserRouter>
            </MockedProvider>
        );
        const items = await screen.findAllByRole("row");

        expect(items).toHaveLength(1);
    })
    it("EventUserRecordDetails display test", async () => {
        render(
            <MockedProvider>
                <BrowserRouter>
                    <EventUserRecordDetails record={{
                        id: 1,
                        user: { id: 1, name: "", email: "", password: "", events: [null as any] },
                        event: { id: 1, name: "One", organizer: { id: 0, name: "!", email: "", password: "", events: [null as any] }, participants: [null as any], maxRounds: 1, round: 0, state: "BEFORE", roundStart: "", lastCalled: "", eventGameRecords: [null as any], eventUserRecords: [null as any] },
                        rounds: 1,
                        points: 1,
                        wins: 100,
                        loses: 1,
                        list: "s",
                        bonusPoints: 10,
                        place: 1
                    }} index={0} />
                </BrowserRouter>
            </MockedProvider>
        );
        const items = await screen.findAllByRole("row");

        expect(items).toHaveLength(1);
    })
    it("EventUserRecordSummary display test", async () => {
        render(
            <MockedProvider>
                <BrowserRouter>
                    <EventUserRecordSummary record={{
                        id: 1,
                        user: { id: 1, name: "", email: "", password: "", events: [null as any] },
                        event: { id: 1, name: "One", organizer: { id: 0, name: "!", email: "", password: "", events: [null as any] }, participants: [null as any], maxRounds: 1, round: 0, state: "BEFORE", roundStart: "", lastCalled: "", eventGameRecords: [null as any], eventUserRecords: [null as any] },
                        rounds: 1,
                        points: 1,
                        wins: 100,
                        loses: 1,
                        list: "s",
                        bonusPoints: 10,
                        sos: 1
                    }} index={0} />
                </BrowserRouter>
            </MockedProvider>
        );
        const items = await screen.findAllByRole("row");

        expect(items).toHaveLength(1);
    })

    it("Correct number of records is displayed", async () => {
        const mock = [
            {
                request: {
                    query: GET_EVENT_USER_RECORD_FROM_EVENT_QUERY,
                    variables: {
                        eventid: undefined
                    }
                },
                result: {
                    data: {
                        getEventUserRecordForEvent: [{
                            id: 1,
                            user: { id: 1, name: "", email: "", password: "", events: [null as any] },
                            event: { id: 1, name: "One", organizer: { id: 0, name: "!", email: "", password: "", events: [null as any] }, participants: [null as any], maxRounds: 1, round: 0, state: "BEFORE", roundStart: "", lastCalled: "", eventGameRecords: [null as any], eventUserRecords: [null as any] },
                            rounds: 1,
                            points: 1,
                            wins: 1,
                            loses: 1,
                            list: "",
                            bonusPoints: 1
                        }],
                    },
                },
            },
        ];
        render(
            <MockedProvider mocks={mock}>
                <BrowserRouter>
                    <EventUserRecordFromEvent />
                </BrowserRouter>
            </MockedProvider>
        );
        const items = await screen.findAllByRole("row");

        expect(items).toHaveLength(2);
    })
    it("Correct number of records is displayed", async () => {
        const mock = [
            {
                request: {
                    query: GET_EVENT_USER_RECORD_FROM_USER_QUERY,
                    variables: {
                        userid: undefined
                    }
                },
                result: {
                    data: {
                        getEventUserRecordForUser: [{
                            id: 1,
                            user: { id: 1, name: "", email: "", password: "", events: [null as any] },
                            event: { id: 1, name: "One", organizer: { id: 0, name: "!", email: "", password: "", events: [null as any] }, participants: [null as any], maxRounds: 1, round: 0, state: "BEFORE", roundStart: "", lastCalled: "", eventGameRecords: [null as any], eventUserRecords: [null as any] },
                            rounds: 1,
                            points: 1,
                            wins: 1,
                            loses: 1,
                            list: "",
                            bonusPoints: 1
                        }],
                    },
                },
            },
        ];
        render(
            <MockedProvider mocks={mock}>
                <BrowserRouter>
                    <EventUserRecordFromUser />
                </BrowserRouter>
            </MockedProvider>
        );
        const items = await screen.findAllByRole("row");

        expect(items).toHaveLength(2);
    })

    it("EventUserRecord change score test", async () => {
        const mock = [
            {
                request: {
                    query: SET_BONUS_POINTS,
                    variables: { id: 1, bonusPoints: 101 }
                },
                newData: jest.fn(() => {
                    return { data: { setBonusPoints: "added" } };
                }),
            },
        ];
        render(
            <MockedProvider mocks={mock}>
                <BrowserRouter>
                    <EventUserRecord record={{
                        id: 1,
                        user: { id: 1, name: "", email: "", password: "", events: [null as any] },
                        event: { id: 1, name: "One", organizer: { id: 0, name: "!", email: "", password: "", events: [null as any] }, participants: [null as any], maxRounds: 1, round: 0, state: "BEFORE", roundStart: "", lastCalled: "", eventGameRecords: [null as any], eventUserRecords: [null as any] },
                        rounds: 1,
                        points: 1,
                        wins: 100,
                        loses: 1,
                        list: "s",
                        bonusPoints: 10,
                    }} index={0} />
                </BrowserRouter>
            </MockedProvider>
        );

        let input = screen.getByDisplayValue('10');
        await userEvent.type(input, "1");
        await expect(input).toHaveValue(101);
        await fireEvent.blur(input);
        await userEvent.keyboard("{enter}");
        await expect(mock[0].newData).toHaveBeenCalledTimes(1);
    })
    it("EventUserRecord change score test", async () => {
        const mock = [
            {
                request: {
                    query: SET_BONUS_POINTS,
                    variables: { id: 1, bonusPoints: 101 }
                },
                newData: jest.fn(() => {
                    return { data: { setBonusPoints: "added" } };
                }),
            },
        ];
        render(
            <MockedProvider mocks={mock}>
                <BrowserRouter>
                    <EventUserRecord record={{
                        id: 1,
                        user: { id: 1, name: "", email: "", password: "", events: [null as any] },
                        event: { id: 1, name: "One", organizer: { id: 0, name: "!", email: "", password: "", events: [null as any] }, participants: [null as any], maxRounds: 1, round: 0, state: "BEFORE", roundStart: "", lastCalled: "", eventGameRecords: [null as any], eventUserRecords: [null as any] },
                        rounds: 1,
                        points: 1,
                        wins: 100,
                        loses: 1,
                        list: "s",
                        bonusPoints: 10,
                    }} index={0} />
                </BrowserRouter>
            </MockedProvider>
        );

        let input = screen.getByDisplayValue('10');
        await userEvent.type(input, "1");
        await expect(input).toHaveValue(101);
        await fireEvent.blur(input);
        await userEvent.keyboard("{enter}");
        await expect(mock[0].newData).toHaveBeenCalledTimes(1);
    })
})