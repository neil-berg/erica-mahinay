import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import SEO from "../components/seo"
import { useExhibitions } from "../hooks/useExhibitions"

import "../components/layout.css"

const IndexPage = () => {
  // Retrieve all exhibitions from Contentful
  // TODO: Change Contentful schema to use "featured" instead of "onview".
  // For now, we'll still query onView, but update the code to reflect that it's
  // a collection of featured exhibitions.
  const { onView, exhibitions } = useExhibitions()

  const featuredListItems = onView.map(onView => (
    <li className="featured-list__item" key={onView.id}>
      <Link className="featured-list__item-link" to={`/${onView.slug}`}>
        {onView.title}
      </Link>
    </li>
  ))

  const exhibitionListItems = exhibitions.map(exhibition => (
    <li className="exhibition-list__item" key={exhibition.id}>
      <Link className="exhibition-list__item-link" to={`/${exhibition.slug}`}>
        {exhibition.title}
      </Link>
    </li>
  ))

  return (
    <HomeContainer>
      <SEO title="Home" />
      <Grid onview={onView.length > 0 ? true : false}>
        <h1 className="name">Erica Mahinay</h1>
        <div className="exhibition-list">
          <ul>
            <h2 className="exhibition-list__header">Exhibitions</h2>
            {exhibitionListItems}
          </ul>
        </div>
        {onView.length > 0 && (
          <div className="featured-list">
            <ul>
              <h2 className="featured-list__header">
                Featured
              </h2>
              {featuredListItems}   
            </ul>
          </div>
        )}

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
  padding: 2rem;
  background: var(--white);

  @media screen and (min-width: 700px) {
    padding: 3rem;
  }
`

const Grid = styled.div`
  width: 100vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: repeat(3, min-content);
  grid-gap: 1rem;

  .epoch {
    padding-left: 0.5rem;
  }

  .name {
    grid-column: 2;
    grid-row: 1 / 3;
    writing-mode: vertical-lr;
    justify-self: end;
    color: var(--gold);
    text-transform: uppercase;
  }

  .exhibition-list {
    grid-column: 1;
    grid-row: 2;
  }

  .featured-list__item,
  .featured-list__header {
    padding-left: 0.5rem;
  }

  .featured-list {
    grid-column: 1;
    grid-row: 1;
    align-self: end;
    border-left: 15px solid var(--pink);
  }

  .contact {
    grid-column: 1 / 3;
    grid-row: 3;
    justify-self: end;
    text-align: right;
    margin-right: 1rem;
    border-bottom: 15px solid var(--pink);
  }

  .instagram,
  .email {
    display: block;
    color: var(--sand);
    text-decoration: none;
  }

  .featured-list__header,
  .exhibition-list__header {
    color: var(--sand);
    text-transform: uppercase;
    padding-bottom: 0.5rem;
  }

  .featured-list__item,
  .exhibition-list__item {
    line-height: 1em;
    cursor: pointer;
  }

  .featured-list__item:not(:last-child),
  .exhibition-list__item:not(:last-child) {
    padding-bottom: 1em;
  }

  .featured-list__item-link,
  .exhibition-list__item-link {
    text-decoration: none;
    color: var(--sand);
    transition: 0.3s linear;
  }

  .featured-list__item-link {
    text-decoration: none;
    color: var(--sand);
  }

  @media (hover: hover) {
    .featured-list__item-link:hover,
    .exhibition-list__item-link:hover {
      text-decoration: none;
      color: var(--blue);
    }
  }

  @media screen and (min-width: 700px) {
    transform: rotate(-25deg);
    width: 66vw;
    margin: auto;
    grid-template-columns: 1fr 0.75fr 1fr 1fr 0.5fr 1fr;
    grid-template-rows: auto 1fr auto auto 0.5fr;

    .epoch {
      padding-left: 0;
    }

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
      align-self: ${props => (props.onview ? "center" : "start")};
      border-left: 15px solid var(--pink);
    }

    .exhibition-list__item,
    .exhibition-list__header {
      padding-left: 0.5rem;
    }

    .featured-list {
      grid-column: 4 / 7;
      grid-row: 2;
      align-self: end;
    }

    .contact {
      grid-column: 4 / 7;
      grid-row: 5;
      align-self: end;
      // justify-self: end;
      border-bottom: 15px solid var(--pink);
    }
  }
`

export default IndexPage
