import { gql } from "@apollo/client";

export const GET_HERO = gql`
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

export const GET_PROJECTS = gql`
  query Projects($pagination: PaginationArg) {
    projects(pagination: $pagination) {
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
export const GET_ACTIONS = gql`
  query GetActions {
    actions {
      documentId
      buttons {
        link
        label
        id
      }
    }
  }
`;