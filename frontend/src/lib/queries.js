import { gql } from "@apollo/client";

export async function fetchGraphQL(query, variables = {}) {
  try {
    const res = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // ensures SSR always fetches fresh data
      body: JSON.stringify({
        query,
        variables,
      }),
      cache:"no-store",
    });

    const json = await res.json();

    if (json.errors) {
      console.error("GraphQL Errors:", json.errors);
      throw new Error("Failed to fetch GraphQL data");
    }

    return json.data;
  } catch (error) {
    console.error("GraphQL Fetch Error:", error);
    throw error;
  }
}

// Queries as plain strings
export const GET_HERO = `
  query {
    heroBanners {
      documentId
      title
      subtitle
      image {
        url
      }
    }
  }
`;

export const GET_PROJECTS = `
  query Projects($status: PublicationStatus,$pagination: PaginationArg) {
    projects(status: $status,pagination: $pagination) {
      documentId
      name
      description
      thumbnail {
        url
        alternativeText
      }
      tasks {
        TaskStatus
        documentId
        title
        description
        dueDate
        updatedAt
        createdAt
        comments {
          content
          createdAt
          user {
            username
          }
        }
      }
    }
  }
`;


export const GET_USERS = gql`
  query UsersPermissionsUsers {
    usersPermissionsUsers {
      documentId
      username
      email
       role {
        type
      }
    }
  }
`;
export const GET_NAVBAR = gql`
  query GetNavbars {
    navbars {
      documentId
      title
      buttons {
        link
        label
        id
        type
      }
    }
  }
`;
