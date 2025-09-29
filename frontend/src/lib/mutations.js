import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($data: ProjectInput!, $status: PublicationStatus) {
    createProject(data: $data, status: $status) {
      documentId
      name
      description
      startDate
      endDate
      publishedAt
      createdAt
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($data: TaskInput!) {
    createTask(data: $data) {
      documentId
      title
      description
      TaskStatus
      dueDate
      createdAt
      updatedAt
      publishedAt
      project {
        documentId
        name
      }
      assignedTo {
        documentId
        username
        email
      }
      comments {
        content
        createdAt
        user {
          documentId
          username
        }
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($data: CommentInput!) {
    createComment(data: $data) {
      documentId
      content
      user {
        username
        documentId
      }
      task {
        title
        documentId
      }
    }
  }
`;
export const UPDATE_TASK = gql`
  mutation UpdateTask($documentId: ID!, $data: TaskInput!, $status: PublicationStatus) {
    updateTask(documentId: $documentId, data: $data, status: $status) {
      documentId
      TaskStatus
    }
  }
`;
