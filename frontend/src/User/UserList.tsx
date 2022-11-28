import { useQuery } from "@apollo/client";
import React from "react";
import { USER_QUERY } from "../GraphQL";
import { IUser, User } from "./User";

export function UserList() {
    const { data, error, loading } = useQuery(USER_QUERY);
  
    return (<div>
      {loading ? <span>LOADING</span> :
            <table>  
              <thead>
                <tr>
                  <th>ID</th>
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
          }
          </div>
    );
  }