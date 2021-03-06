import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const StudioNotes = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulBlogPost(sort: { fields: date, order: DESC }) {
        nodes {
          id
          slug
          title
          date(formatString: "MMMM Do YYYY")
        }
      }
    }
  `)

  const posts = data.allContentfulBlogPost.nodes
  const renderPosts = posts.map(post => {
    return (
      <li key={post.id} className="post">
        <Link className="post__link" to={`/studio-notes/${post.slug}`}>
          <h2 className="post__date">{post.date}</h2>
          <h2 className="post__title">{post.title}</h2>
        </Link>
      </li>
    )
  })
  return (
    <Layout>
      <SEO title="Thoughts" description="Blog of Erica Mahinay's Thoughts" />
      <NotesContainer>
        <ul className="post-list">{renderPosts}</ul>
      </NotesContainer>
    </Layout>
  )
}

const NotesContainer = styled.div`
  min-height: 80vh;

  .post-list {
    padding: 1rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .post {
    border-bottom: 1px var(--gold) solid;
    padding-bottom: 2rem;
  }

  .post__link {
    text-decoration: none;
  }

  .post__date {
    font-size: 1em;
    padding: 1rem 0;
    color: var(--sand);
    font-weight: 400;
  }

  .post__title {
    font-size: 2em;
    color: var(--gold);
  }

  @media screen and (min-width: 600px) {
    .post-list {
      padding: 1rem 0;
    }
  }

  @media screen and (min-width: 960px) {
    margin-left: 300px;
    margin-top: 0px;
    min-height: 90vh;
  }
`

export default StudioNotes
