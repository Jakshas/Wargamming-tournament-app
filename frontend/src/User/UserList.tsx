import { useQuery } from "@apollo/client";
import React from "react";
import { USER_QUERY } from "../GraphQL";
import { IUser, User } from "./User";
import Spinner from 'react-spinner-material';

export function UserList() {
    const { data, error, loading } = useQuery(USER_QUERY);
  
  if (loading) {
    return <Spinner radius={120} color={"rgb(218, 218, 218)"} stroke={2} visible={true} />
  }
    return (<div>
            <table>  
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>              
                {data?.users.map((user: IUser, idx: number) => (
                  <User key={idx} user={user} />
                ))}
              </tbody>
            </table>  
          </div>
    );
  }