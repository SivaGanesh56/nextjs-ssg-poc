import { gql } from "graphql-request";

export const TEMPLATE_HERO_BLEED_NODE = gql`
  fragment TemplateHeroBleedNode on TemplateHeroFullBleed {
    __typename
    name
  }
`;
