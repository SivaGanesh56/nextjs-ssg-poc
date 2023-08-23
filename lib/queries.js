import { gql } from "@apollo/client";
import { TEMPLATE_HERO_BLEED_NODE } from "../templates/hero/hero.fragment";
import { LAYOUT_NODE } from "../templates/layout/layout.fragment";

const PAGE_CONTENT_FRAGMENT = gql`
  fragment PageContentNode on PageContent {
    templatesCollection {
      items {
        ...TemplateHeroBleedNode
        ...LayoutSectionNode
      }
    }
  }
  ${TEMPLATE_HERO_BLEED_NODE}
  ${LAYOUT_NODE}
`;

export const FETCH_PAGES = gql`
  query FetchPages {
    pageCollection {
      items {
        sys {
          id
        }
        navSlug
        translations {
          languagesToRenderIn
        }
      }
    }
  }
`;

export const FETCH_PAGE_CONTENT = gql`
  query fetchPageContent($id: String!, $locale: String) {
    page(id: $id, locale: $locale) {
      navSlug
      pageContent {
        ...PageContentNode
      }
    }
  }
  ${PAGE_CONTENT_FRAGMENT}
`;

export const FETCH_BLOG_POST_PAGES = gql`
  query BlogPostPages {
    blogPostPageCollection {
      items {
        slug
        sys {
          id
        }
      }
    }
  }
`;

export const FETCH_BLOG_POST_PAGE_CONTENT = gql`
  query fetchBlogPostPageContent($id: String!) {
    blogPostPage(id: $id) {
      blogPostTitle
    }
  }
`;

export const FETCH_BLOG_AUTHOR_PAGES = gql`
  query BlogAuthorPages {
    blogAuthorPageCollection {
      items {
        sys {
          id
        }
        person {
          slug
        }
      }
    }
  }
`;

export const FETCH_BLOG_AUTHOR_PAGE_CONTENT = gql`
  query BlogAuthorPageContent($id: String!) {
    blogAuthorPage(id: $id) {
      authorName
    }
  }
`;

export const FETCH_BLOG_POST_PAGE = gql`
  query fetchBlogPage($id: String!, $locale: String) {
    blogPostPage(id: $id, locale: $locale) {
      blogPostTitle
    }
  }
`;
