import React from "react"
import { graphql, Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"

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
        <nav className="next-previous">
          {next && (
            <div className="next">
              <Link className="next__link" to={`/studio-notes/${next.slug}`}>
                <span className="next__title">{next.title}</span>
                <FontAwesomeIcon className="next__icon" icon={faAngleRight} />
              </Link>
            </div>
          )}
          {previous && (
            <div className="previous">
              <Link
                className="previous__link"
                to={`/studio-notes/${previous.slug}`}
              >
                <FontAwesomeIcon
                  className="previous__icon"
                  icon={faAngleLeft}
                />
                <span className="previous__title">{previous.title}</span>
              </Link>
            </div>
          )}
        </nav>
      </PostContainer>
    </Layout>
  )
}

const PostContainer = styled.div`
  .title {
    padding-bottom: 2rem;
  }

  .body {
    max-width: 600px;
    margin: 0 auto;
    color: var(--gold);
  }

  img,
  video {
    padding: 1rem 0;
  }

  .next-previous {
    max-width: 600px;
    margin: 0 auto;
    padding-top: 2rem;
  }

  .next {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: var(--gold);
    margin-bottom: 0.5rem;
  }

  .previous {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: var(--gold);
  }

  .next__link,
  .previous__link {
    color: var(--gold);
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: 0.3s linear;
  }

  .next__title {
    padding-right: 0.75rem;
  }

  .previous__title {
    padding-left: 0.75rem;
  }

  .next__icon,
  .previous__icon {
    color: var(--sand);
    font-size: 1.25em;
  }

  @media (hover: hover) {
    .next__link:hover,
    .previous__link:hover {
      color: var(--pink);
    }
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
