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
        }
        playerTwo{
          id
        }
        playerOnePoints
        playerTwoPoints
      }
    }
`;

export const LOGIN_MUTATION = gql`
mutation Login($email: String!, $password: String!){
  login(email: $email, password: $password)
}
`;

export const ADD_USER_MUTATION = gql`
mutation AddUser($name: String!, $email: String!, $password: String!){
  addUser(name: $name, email: $email, password: $password)
}
`;

export const ADD_EVENT_MUTATION = gql`
mutation AddEvent($name: String!, $organizer: ID!, $maxRounds: Int!){
  addEvent(name: $name, organizer: $organizer, maxRounds: $maxRounds)
}
`;