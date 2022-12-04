import { gql } from "@apollo/client";

export const USER_QUERY = gql`
  {
    users {
      id
      name
      email
    }
  }
`;

export const ORGANIZED_EVENTS = gql`
   query OrganizedEvents($userid: ID!){
    organizedEvents(id: $userid){
      id
      name
      organizer{
        id
      }
    }
  }

`;

export const EVENT_QUERY = gql`
  {
    events {
      id
      name
      organizer{
        id
      }
    }
  }
`;

export const USER_BY_ID_QUERY = gql`
  query UserByID($userid: ID!){
    userByID(id: $userid) {
      id
      name
    }
  }
`;

export const EVENT_BY_ID_QUERY = gql`
  query EventByID($id: ID!){
    eventByID(id: $id) {
      id
      name
      organizer{
        id
      }
      round
      maxRounds
      roundEnd
      lastCalled
      eventUserRecords{
        id
      }
      eventGameRecords{
        id
      }
    }
  }
`;

export const GET_EVENT_USER_RECORD_FROM_USER_QUERY = gql`
    query GetEventUserRecordForUser($userid: ID!){
      getEventUserRecordForUser(id: $userid){
        id
        user{
          id
        }
        event{
          id
        }
        rounds
        points
        wins
        loses
        list
      }
    }
`;

export const GET_EVENT_USER_RECORD_FROM_EVENT_QUERY = gql`
    query GetEventUserRecordForEvent($eventid: ID!){
      getEventUserRecordForEvent(id: $eventid){
        id
        user{
          id
          name
        }
        event{
          id
          name
          organizer{
            id
          }
        }
        rounds
        points
        wins
        loses
        list
        bonusPoints
      }
    }
`;

export const GET_EVENT_USER_RECORD_FROM_EVENT_SUMMARY_QUERY = gql`
    query GetEventUserRecordForEventSummary($eventid: ID!){
      getEventUserRecordForEventSummary(id: $eventid){
        id
        user{
          id
          name
        }
        event{
          id
          name
        }
        rounds
        points
        wins
        loses
        list
        bonusPoints
      }
    }
`;

export const ADD_USER_TO_EVENT_QUERY = gql`
    mutation AddUserToEvent($userID: ID!,$eventID: ID!){
      addUserToEvent(userID: $userID, eventID: $eventID)
    }
`;

export const SET_BONUS_POINTS = gql`
    mutation SetBonusPoints($id: ID!, $bonusPoints: Int!){
      setBonusPoints(id: $id, bonusPoints: $bonusPoints)
    }
`;

export const GET_EVENT_GAME_RECORD_FROM_EVENT_QUERY = gql`
    query GetEventGameRecordForEvent($eventid: ID!){
      getEventGameRecordForEvent(id: $eventid){
        id
        event{
          id
        }
        round
        playerOne{
          id
          name
        }
        playerTwo{
          id
          name
        }
        playerOnePoints
        playerTwoPoints
      }
    }
`;
export const GET_EVENT_GAME_RECORD_FROM_EVENT_FOR_GAME_QUERY = gql`
    query GetEventGameRecordForEventForGame($eventid: ID!, $round: Int!){
      getEventGameRecordForEventForGame(id: $eventid, round: $round){
        id
        event{
          id
        }
        round
        playerOne{
          id
          name
        }
        playerTwo{
          id
          name
        }
        playerOnePoints
        playerTwoPoints
        done
      }
    }
`;

export const SET_MATCH_POINTS = gql`
mutation SetMatchPoints($matchID: ID!, $playerOnePoints: Int!, $playerTwoPoints: Int!){
  setMatchPoints(matchID: $matchID, playerOnePoints: $playerOnePoints, playerTwoPoints: $playerTwoPoints )
}  
`;

export const LOGIN_MUTATION = gql`
mutation Login($email: String!, $password: String!){
  login(email: $email, password: $password)
}
`;

export const MAKE_PARINGS = gql`
mutation MakeParings($eventID: ID!){
  makeParings(eventID: $eventID)
}
`;

export const GET_LIST_FOR_USER_IN_EVENT = gql`
query GetListForUserInEvent($userID: ID!,$eventID: ID!){
  getListForUserInEvent(userID: $userID,eventID: $eventID)
}
`;

export const SET_LIST_FOR_USER_IN_EVENT = gql`
mutation SetListForUserInEvent($userID: ID!,$eventID: ID!, $list: String!){
  setListForUserInEvent(userID: $userID, eventID: $eventID, list:$list)
}
`;

export const ADD_USER_MUTATION = gql`
mutation AddUser($name: String!, $email: String!, $password: String!){
  addUser(name: $name, email: $email, password: $password)
}
`;

export const ADD_EVENT_MUTATION = gql`
mutation AddEvent($name: String!, $organizer: ID!, $maxRounds: Int!, $roundTime: Int!){
  addEvent(name: $name, organizer: $organizer, maxRounds: $maxRounds, roundTime: $roundTime)
}
`;

export const USER_IN_EVENT = gql`
  query UserInEvent($userID: ID!, $eventID: ID!){
    userInEvent(userID: $userID, eventID: $eventID)
  }
`;

export const GET_QUEUE_OF_EVENT = gql`
  query GetQueueOfEvent($eventID: ID!){
    getQueueOfEvent(id: $eventID){
      id
      eventID
      userID
    }
  }
`;

export const ADD_TO_QUEUE_EVENT = gql`
  mutation AddToQueue($userID: ID!, $eventID: ID!){
    addToQueue(userID: $userID, eventID: $eventID)
  }
`;

export const DELETE_FROM_QUEUE = gql`
  mutation DeleteFromQueue($id: ID!){
    deleteFromQueue(id: $id)
  }
`;

export const DELETE_USER_FROM_EVENT = gql`
  mutation DeleteUserFromEvent($id: ID!){
    deleteUserFromEvent(id: $id)
  }
`;