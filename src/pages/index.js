import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import SEO from "../components/seo"

const IndexPage = () => {
  // Extract the latest 2 exhibitions On View
  // along with the latest arhived exhibitions
  const data = useStaticQuery(graphql`
    {
      allContentfulOnView(sort: { order: ASC, fields: order }) {
        nodes {
          id
          link
          title
        }
      }
      allContentfulExhibition(sort: { fields: order, order: DESC }) {
        nodes {
          id
          title
          slug
        }
      }
    }
  `)
  const onView = data.allContentfulOnView.nodes.slice(0, 2)
  const exhibitions = data.allContentfulExhibition.nodes.slice(0, 5)

  // Create 2 external links to the onView exhibitions
  const onViewItems = onView.map(item => (
    <a className="onview-link" href={item.link} key={item.id}>
      {item.title}
    </a>
  ))

  // Create up to 5 internal links to latest exhibitions
  const exhibitionItems = exhibitions.map(item => (
    <Link className="exhibition-link" to={`/${item.slug}`} key={item.id}>
      {item.title}
    </Link>
  ))

  return (
    <HomeContainer>
      <h1 className="header">Erica Mahinay</h1>
      <SEO title="Home" />
      <div className="onview">
        <p className="onview__header">On View</p>
        <div className="onview__item-one">{onViewItems[0]}</div>
        <div className="onview__item-two">{onViewItems[1]}</div>
      </div>
      <div className="exhibitions">
        <div className="exhibitions__item-one">{exhibitionItems[0]}</div>
        <div className="exhibitions__item-two">{exhibitionItems[1]}</div>
        <div className="exhibitions__item-three">{exhibitionItems[2]}</div>
        <div className="exhibitions__item-four">{exhibitionItems[2]}</div>
        <div className="exhibitions__item-five">{exhibitionItems[2]}</div>
      </div>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  background: var(--blue);
  height: 100vh;

  .header {
    color: var(--white);
    text-align: center;
    padding: 1rem;
  }

  .onview {
    max-width: 400px;
    margin: 0 auto;
    padding: 1em;
    transform: translateY(25px) rotate(-15deg);
  }

  .onview__header {
    color: var(--white);
    font-size: 1.25em;
    font-weight: bold;
    display: inline-block;
    background: var(--sand);
    padding: 0.25em;
    margin-bottom: 0.5em;
  }

  .onview__item-one,
  .onview__item-two {
    margin-bottom: 0.35em;
  }

  .onview-link {
    text-decoration: none;
    color: var(--pink);
    font-size: 1.25em;
  }

  .exhibitions {
    max-width: 600px;
    margin: 0 auto;
    padding: 4em 1em 1em 1em;
    transform: rotate(-15deg);
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: center;
  }

  .exhibitions__item-one,
  .exhibitions__item-two,
  .exhibitions__item-three,
  .exhibitions__item-four,
  .exhibitions__item-five {
    width: 110px;
    height: auto;
    display: inline-block;
    flex: 1;
    margin: 1em;
    background: var(--sand);
  }

  .exhibition-link {
    text-decoration: none;
    color: var(--white);
    font-size: 1.25em;
  }
`

export default IndexPage
