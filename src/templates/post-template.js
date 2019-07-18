import React from "react"
import { graphql, Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLongArrowAltRight,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons"

// import { StyledPost } from "../styles/post.css"
import Layout from "../components/layout"
import SEO from "../components/SEO"

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

  // Options to render images in the markdown
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img src={url} alt={alt} />
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
  border: 1px green solid;

  > div {
    margin: 0 auto;
  }

  .body {
    border: 1px red solid;
    max-width: 600px;
  }

  @media screen and (min-width: 960px) {
    margin-left: 300px;
  }
`

export default PostTemplate
