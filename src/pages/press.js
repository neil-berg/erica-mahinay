import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import SEO from "../components/seo"
import Layout from "../components/layout"

const Press = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulPress(sort: { fields: order, order: DESC }) {
        nodes {
          id
          date
          title
          attachment {
            file {
              url
            }
          }
          link
        }
      }
    }
  `)

  const pressItems = data.allContentfulPress.nodes

  const renderPressItems = pressItems.map(item => (
    <li className="press-list__item" key={item.id}>
      {item.link && (
        <a
          className="press-list__item-link"
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.title}
        </a>
      )}
      {item.attachment && (
        <a
          className="press-list__item-link"
          href={item.attachment.file.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.title}
        </a>
      )}
    </li>
  ))

  return (
    <Layout>
      <SEO title="Press" description="Press articles for Erica Mahinay" />
      <PressContainer>
        <h2 className="press-header">Press</h2>
        <ul className="press-list">{renderPressItems}</ul>
      </PressContainer>
    </Layout>
  )
}

const PressContainer = styled.section`
  min-height: 90vh;
  padding: 1rem;
  margin-top: 2rem;

  .press-header {
    max-width: 600px;
    margin: 0 auto;
    padding-bottom: 1rem;
    font-size: 1.75em;
    color: var(--gold);
  }

  .press-list {
    max-width: 600px;
    margin: 0 auto;
  }

  .press-list__item {
    padding-bottom: 1rem;
  }

  .press-list__item-link {
    color: var(--gold);
    text-decoration: none;
  }

  @media screen and (min-width: 960px) {
    margin-left: 300px;
    margin-top: 2rem;
  }
`

export default Press
