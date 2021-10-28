import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query tasks {
    tasks {
      id
      name
      startdate
      contacts {
        fullname
      }
      timerecords {
        id
        notes
        enddate
        startdate
        timespent
        contact {
          fullname
        }
      }
    }
  }
`;
