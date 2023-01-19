import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { ADD_EVENT_MUTATION, EVENTS_OF_USER, EVENT_BY_ID_QUERY, EVENT_QUERY, GET_EVENT_USER_RECORD_FROM_EVENT_SUMMARY_QUERY, ORGANIZED_EVENTS, USER_BY_ID_QUERY, USER_IN_EVENT } from "../GraphQL";
import { EventList } from "../Event/EventList";
import { BrowserRouter } from "react-router-dom";
import { Event } from "../Event/Event";
import { EventDetails } from "../Event/EventDetails";
import { AddEvent } from "../Event/AddEvent";
import { RoundsList } from "../Event/RoundsList";
import userEvent from "@testing-library/user-event";
import { EventOrgaznizingList } from "../Event/EventOrganizingList";
import { EventsForUser } from "../Event/EventsForUser";
import { EventSumarry } from "../Event/EventSumarry";

const events = [
  { id: 1, name: "One", organizer: { id: 1, name: "!" }, participants: [], maxRounds: 1, round: 0, state: "BEFORE" },
  { id: 2, name: "Two", organizer: { id: 1, name: "!" }, participants: [], maxRounds: 1, round: 0, state: "BEFORE" }
]

const userInEvent = "Not";

const userByID = { id: 1, name: "JS" }

describe("Event", () => {
  it("correct number of events is displayed", async () => {
    const mocks1 = [
      {
        request: {
          query: EVENT_QUERY,
        },
        result: {
          data: {
            events,
          },
        },
      },
      {
        request: {
          query: USER_IN_EVENT,
        },
        result: {
          data: {
            userInEvent,
          },
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks1}>
        <BrowserRouter>
          <EventList user={1} />
        </BrowserRouter>
      </MockedProvider>
    );
    const items = await screen.findAllByRole("rowgroup");

    expect(items).toHaveLength(events.length);
  })


  it("correct number of organized events is displayed", async () => {
    const organizedEvents = [
      { id: 1, name: "One", organizer: { id: 1, name: "!" }, participants: [], maxRounds: 1, round: 0, state: "BEFORE", description: "" },
      { id: 2, name: "Two", organizer: { id: 1, name: "!" }, participants: [], maxRounds: 1, round: 0, state: "BEFORE", description: "" }
    ]
    const mocks1 = [
      {
        request: {
          query: ORGANIZED_EVENTS,
          variables: {
            userid: 1
          }

        },
        result: {
          data: {
            organizedEvents,
          },
        },
      },
      {
        request: {
          query: USER_IN_EVENT,
        },
        result: {
          data: {
            userInEvent,
          },
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks1}>
        <BrowserRouter>
          <EventOrgaznizingList user={1} />
        </BrowserRouter>
      </MockedProvider>
    );
    const items1 = await screen.findByText("One");
    const items2 = await screen.findByText("Two");
  })

  it("correct number of events of user is displayed", async () => {
    const eventsOfUser = [
      { id: 1, name: "One", organizer: { id: 1, name: "!" }, participants: [], maxRounds: 1, round: 0, state: "BEFORE", description: "" },
      { id: 2, name: "Two", organizer: { id: 1, name: "!" }, participants: [], maxRounds: 1, round: 0, state: "BEFORE", description: "" }
    ]
    const mocks1 = [
      {
        request: {
          query: EVENTS_OF_USER,
          variables: {
            userid: 1
          }

        },
        result: {
          data: {
            eventsOfUser,
          },
        },
      },
      {
        request: {
          query: USER_IN_EVENT,
        },
        result: {
          data: {
            userInEvent,
          },
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks1}>
        <BrowserRouter>
          <EventsForUser user={1} />
        </BrowserRouter>
      </MockedProvider>
    );
    const items1 = await screen.findByText("One");
    const items2 = await screen.findByText("Two");
  })
  it("correct number of events summary is displayed", async () => {
    const getEventUserRecordForEventSummary = [
      {
        id: 1,
        user: {},
        event: {},
        rounds: 1,
        points: 10,
        wins: 1,
        loses: 0,
        list: String,
        bonusPoints: 2,
        sos: 10
      },
      {
        id: 2,
        user: {},
        event: {},
        rounds: 1,
        points: 10,
        wins: 1,
        loses: 0,
        list: String,
        bonusPoints: 2,
        sos: 10
      },
    ]
    const mocks1 = [
      {
        request: {
          query: GET_EVENT_USER_RECORD_FROM_EVENT_SUMMARY_QUERY,
          variables: {
            eventid: undefined
          }

        },
        result: {
          data: {
            getEventUserRecordForEventSummary,
          },
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks1}>
        <BrowserRouter>
          <EventSumarry />
        </BrowserRouter>
      </MockedProvider>
    );
    const items = await screen.findAllByRole("rowgroup");

    expect(items).toHaveLength(getEventUserRecordForEventSummary.length);
  })

  it("status Before and not is corectly displayed", async () => {
    const mocks1 = [
      {
        request: {
          query: USER_IN_EVENT,
          variables: {
            userID: 0,
            eventID: 1
          }
        },
        result: {
          data: {
            userInEvent,
          },
        },
      },
      {
        request: {
          query: USER_BY_ID_QUERY,
          variables: {
            userid: 0
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
          <Event event={{ id: 1, name: "One", organizer: { id: 1, name: "!", email: "", password: "", events: [null as any] }, participants: [null as any], maxRounds: 1, round: 0, state: "BEFORE", roundStart: "", lastCalled: "", eventGameRecords: [null as any], eventUserRecords: [null as any] }} user={0} />
        </BrowserRouter>
      </MockedProvider>
    );
    const items = await screen.findAllByText("Sign up");
    expect(items).toHaveLength(1);
  })
  it("status Before and queue is corectly displayed", async () => {
    const userInEvent = "In Queue";
    const mocks1 = [
      {
        request: {
          query: USER_IN_EVENT,
          variables: {
            userID: 0,
            eventID: 1
          }
        },
        result: {
          data: {
            userInEvent,
          },
        },
      },
      {
        request: {
          query: USER_BY_ID_QUERY,
          variables: {
            userid: 0
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
          <Event event={{ id: 1, name: "One", organizer: { id: 1, name: "!", email: "", password: "", events: [null as any] }, participants: [null as any], maxRounds: 1, round: 0, state: "BEFORE", roundStart: "", lastCalled: "", eventGameRecords: [null as any], eventUserRecords: [null as any] }} user={0} />
        </BrowserRouter>
      </MockedProvider>
    );
    const items = await screen.findAllByText("In Queue");
    expect(items).toHaveLength(1);
  })
  it("status Before and Signed is corectly displayed", async () => {
    const userInEvent = "Signed";
    const mocks1 = [
      {
        request: {
          query: USER_IN_EVENT,
          variables: {
            userID: 0,
            eventID: 1
          }
        },
        result: {
          data: {
            userInEvent,
          },
        },
      },
      {
        request: {
          query: USER_BY_ID_QUERY,
          variables: {
            userid: 0
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
          <Event event={{ id: 1, name: "One", organizer: { id: 1, name: "!", email: "", password: "", events: [null as any] }, participants: [null as any], maxRounds: 1, round: 0, state: "BEFORE", roundStart: "", lastCalled: "", eventGameRecords: [null as any], eventUserRecords: [null as any] }} user={0} />
        </BrowserRouter>
      </MockedProvider>
    );
    const items = await screen.findAllByText("Signed");
    expect(items).toHaveLength(1);
  })
  it("status INPROGRESS is corectly displayed", async () => {
    const userInEvent = "Signed";
    const mocks1 = [
      {
        request: {
          query: USER_IN_EVENT,
          variables: {
            userID: 0,
            eventID: 1
          }
        },
        result: {
          data: {
            userInEvent,
          },
        },
      },
      {
        request: {
          query: USER_BY_ID_QUERY,
          variables: {
            userid: 0
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
          <Event event={{ id: 1, name: "One", organizer: { id: 1, name: "!", email: "", password: "", events: [null as any] }, participants: [null as any], maxRounds: 1, round: 0, state: "INPROGRESS", roundStart: "", lastCalled: "", eventGameRecords: [null as any], eventUserRecords: [null as any] }} user={0} />
        </BrowserRouter>
      </MockedProvider>
    );
    const items = await screen.findAllByText("In Progress");
    expect(items).toHaveLength(1);
  })
  it("Event Deatils test", async () => {
    const userInEvent = "Signed";
    const eventByID = { id: 1, name: "One", organizer: { id: 1, name: "!" }, participants: [], maxRounds: 1, round: 0, state: "BEFORE", eventUserRecords: [null as any] }
    const mocks1 = [
      {
        request: {
          query: USER_IN_EVENT,
          variables: {
            userID: "",
            eventID: undefined
          }
        },
        result: {
          data: {
            userInEvent,
          },
        },
      },
      {
        request: {
          query: EVENT_BY_ID_QUERY,
          variables: {
            id: undefined
          }
        },
        result: {
          data: {
            eventByID,
          },
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks1}>
        <BrowserRouter>
          <EventDetails token={0} />
        </BrowserRouter>
      </MockedProvider>
    );
    const items1 = await screen.findAllByText("Event name");
    expect(items1).toHaveLength(1);
    const items2 = await screen.findAllByText("Rounds");
    expect(items2).toHaveLength(1);
    const items3 = await screen.findAllByText("Number of participants");
    expect(items3).toHaveLength(1);
  })
  it("Check users in Event Details test", async () => {
    const userInEvent = "Signed";
    const eventByID = { id: 1, name: "One", organizer: { id: 1, name: "one" }, participants: [{ id: 1, name: "one" }, { id: 1, name: "two" }], maxRounds: 1, round: 0, state: "BEFORE", eventUserRecords: [null as any] }
    const mocks1 = [
      {
        request: {
          query: USER_IN_EVENT,
          variables: {
            userID: "",
            eventID: undefined
          }
        },
        result: {
          data: {
            userInEvent,
          },
        },
      },
      {
        request: {
          query: EVENT_BY_ID_QUERY,
          variables: {
            id: undefined
          }
        },
        result: {
          data: {
            eventByID,
          },
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks1}>
        <BrowserRouter>
          <EventDetails token={0} />
        </BrowserRouter>
      </MockedProvider>
    );

    const items = await screen.findAllByRole("rowgroup");

    expect(items).toHaveLength(eventByID.participants.length);
  })
  it("Check if mutation is sent", async () => {
    const mocks = [
      {
        request: {
          query: ADD_EVENT_MUTATION,
          variables: {
            name: "name",
            maxRounds: 1,
            organizer: 1,
            roundTime: 10,
            description: ""
          }
        },
        newData: jest.fn(() => {
          return { data: { addEvent: "added" } };
        }),
      },

    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <AddEvent organizer={1} />
        </BrowserRouter>
      </MockedProvider>
    );
    let input = screen.getByLabelText("Name");
    await userEvent.type(input, "name");
    await expect(input).toHaveValue("name");
    input = screen.getByLabelText("Rounds");
    await userEvent.type(input, "1");
    await expect(input).toHaveValue(1);
    input = screen.getByLabelText("Round time in minutes");
    await userEvent.type(input, "10");
    await expect(input).toHaveValue(10);
    userEvent.click(screen.getByText('Submit'))
    await expect(mocks[0].newData).toHaveBeenCalledTimes(1);
  })
  it("Check Roundlist displaying corect", async () => {

    render(
      <MockedProvider addTypename={false}>
        <BrowserRouter>
          <RoundsList eventID={0} rounds={1} maxRounds={3} />
        </BrowserRouter>
      </MockedProvider>
    );
    const items = await screen.findAllByRole("link");

    expect(items).toHaveLength(1);
  })
})