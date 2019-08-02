import React from "react"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      date(formatString: "MMMM Do YYYY")
      childContentfulBlogPostTextRichTextNode {
        json
      }
    }
  }
`

const PostTemplate = ({ data, pageContext }) => {
  const { title, previous, next } = pageContext

  // Options to render images and videos in the markdown
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        const contentType = node.data.target.fields.file[
          "en-US"
        ].contentType.split("/")[0]

        if (contentType === "image") {
          return <img src={url} alt={alt} />
        } else if (contentType === "video") {
          return (
            <video
              width="100%"
              max-height="100%"
              src={url}
              controls
              style={{ outline: "0" }}
            >
              Your browser does not support embedded videos.
            </video>
          )
        }
      },
    },
  }

  return (
    <Layout>
      <SEO title={title} />
      <PostContainer>
        <div className="body">
          <h2 className="title">{title}</h2>
          {documentToReactComponents(
            data.contentfulBlogPost.childContentfulBlogPostTextRichTextNode
              .json,
            options
          )}
        </div>
      </PostContainer>
    </Layout>
  )
}

const PostContainer = styled.div`
  .body {
    max-width: 600px;
    margin: 0 auto;
    color: var(--gold);
  }

  img,
  video {
    padding: 1rem 0;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
  }

  @media screen and (min-width: 960px) {
    margin-left: 300px;

    .body {
      padding-top: 2rem;
    }
  }
`

export default PostTemplate
