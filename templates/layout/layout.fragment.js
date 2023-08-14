import { gql } from "graphql-request";

export const LAYOUT_NODE = gql`
  fragment LayoutSectionNode on LayoutSection {
    __typename
    name
  }
`;
