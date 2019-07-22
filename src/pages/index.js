import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import SEO from "../components/seo"

const IndexPage = () => {
  // Retrieve the latest 5 exhibitions and 2 currently on view
  const data = useStaticQuery(graphql`
    {
      allContentfulExhibition(sort: { fields: order, order: DESC }, limit: 5) {
        nodes {
          title
          slug
          id
        }
      }
      allContentfulOnView(sort: { fields: order, order: DESC }, limit: 2) {
        nodes {
          id
          title
          link
        }
      }
    }
  `)

  const exhibitions = data.allContentfulExhibition.nodes
  const onView = data.allContentfulOnView.nodes

  const exhibitionListItems = exhibitions.map(exhibition => (
    <li className="exhibition-list__item" key={exhibition.id}>
      <Link className="exhibition-list__item-link" to={`/${exhibition.slug}`}>
        {exhibition.title}
      </Link>
    </li>
  ))

  const onViewListItems = onView.map(onview => (
    <li className="onview-list__item" key={onview.id}>
      <a
        className="onview-list__item-link"
        href={onview.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {onview.title}
      </a>
    </li>
  ))

  return (
    <HomeContainer>
      <SEO title="Home" />
      <Grid>
        <h1 className="name">Erica Mahinay</h1>
        <div className="exhibition-list">
          <ul>
            <h2 className="exhibition-list__header">Exhibitions</h2>
            {exhibitionListItems}
          </ul>
        </div>
        <div className="onview-list">
          <ul>
            <h2 className="onview-list__header">On View</h2>
            {onViewListItems}
          </ul>
        </div>
        <div className="contact">
          <a
            className="instagram"
            href="https://www.instagram.com/eyemahinay/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            @eyemahinay
          </a>
          <a
            className="email"
            href="mailto:ericamahinaystudio@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            ericamahinaystudio@gmail.com
          </a>
        </div>
      </Grid>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  padding: 3rem;
  background: var(--white);
`

const Grid = styled.div`
  width: 66vw;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 0.75fr 1fr 1fr 0.5fr 1fr;
  grid-template-rows: auto 1fr auto auto 0.5fr;
  grid-gap: 1rem;

  .name {
    grid-column: 3 / 4;
    grid-row: 3 / 5;
    writing-mode: vertical-lr;
    justify-self: center;
    //padding: 0 1rem;
    color: var(--gold);
  }

  .exhibition-list {
    grid-column: 1 / 3;
    grid-row: 1 / 5;
    align-self: center;
    border-left: 15px solid var(--pink);
  }
  .exhibition-list__item,
  .exhibition-list__header {
    padding-left: 0.5rem;
  }

  .onview-list {
    grid-column: 4 / 7;
    grid-row: 2;
    align-self: end;
  }

  .contact {
    grid-column: 4 / 7;
    grid-row: 5;
    align-self: end;
    // justify-self: end;
    border-bottom: 25px solid var(--pink);
  }

  .instagram,
  .email {
    display: block;
    color: var(--sand);
    text-decoration: none;
  }

  .exhibition-list__header {
    color: var(--sand);
  }
  .onview-list__header {
    color: var(--sand);
  }
  .exhibition-list__item-link {
    text-decoration: none;
    color: var(--sand);
    transition: 0.3s linear;
  }
  .onview-list__item-link {
    text-decoration: none;
    color: var(--sand);
  }

  @media (hover: hover) {
    .exhibition-list__item-link:hover {
      text-decoration: none;
      color: var(--blue);
    }
  }

  @media screen and (min-width: 700px) {
    transform: rotate(-45deg);
  }
`

export default IndexPage
