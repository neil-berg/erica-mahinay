import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { useExhibitions } from "../hooks/useExhibitions"

const LargeMenu = () => {
  // Retrieve exhibition titles from Contentful and generate lists
  const { onView, exhibitions } = useExhibitions()

  const renderExhibitionTitles = exhibitions.map(item => (
    <li className="nav__option-list-item" key={item.id}>
      <Link className="nav__option-list-item-link" to={`/${item.slug}`}>
        {item.title}
      </Link>
    </li>
  ))

  const renderFeaturedTitles = onView.map(item => (
    <li className="nav__option-list-item" key={item.id}>
      <Link className="nav__option-list-item-link" to={`/${item.slug}`}>
        {item.title}
      </Link>
    </li>
  ))

  return (
    <StyledMenu>
      <h2 className="nav__header">
        <Link className="nav__header-link" to="/">
          Erica Mahinay
        </Link>
      </h2>
      {onView.length > 0 && (
        <div className="nav__option-container">
          <h3 className="nav__option-header">Featured</h3>
          <ul className="nav__option-list">
              {renderFeaturedTitles}
          </ul>
        </div>
      )}
      <div className="nav__option-container">
        <h3 className="nav__option-header">Exhibitions</h3>
        <ul className="nav__option-list">{renderExhibitionTitles}</ul>
      </div>
      <div className="nav__option-container">
        <h3 className="nav__option-header">Writing</h3>
        <ul className="nav__option-list">
          <li className="nav__option-list-item">
            <Link className="nav__option-list-item-link" to="/press">
              Press
            </Link>
          </li>
          <li className="nav__option-list-item">
            <Link className="nav__option-list-item-link" to="/studio-notes">
              Studio Notes
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav__option-container">
        <h3 className="nav__option-header">Info</h3>
        <ul className="nav__option-list">
          <li className="nav__option-list-item">
            <a
              className="email nav__option-list-item-link"
              href="mailto:ericamahinaystudio@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>
          </li>
          <li className="nav__option-list-item">
            <Link className="nav__option-list-item-link" to="/cv">
              CV
            </Link>
          </li>
        </ul>
      </div>
    </StyledMenu>
  )
}

const StyledMenu = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  background: var(--white);
  color: var(--gold);
  z-index: 2;
  overflow: scroll;

  .nav__header {
    font-size: 1.2em;
    padding: 2rem 0;
    text-align: center;
    text-transform: uppercase;
  }

  .nav__header-link {
    color: inherit;
    text-decoration: none;
  }

  .nav__option-list-item {
    padding-bottom: 0.75em;
    font-size: 1em;
    font-weight: 300;
    line-height: 1em;
    text-align: center;
    color: var(--gold);
    text-align: left;
  }

  .nav__option-list-item:last-child {
    padding-bottom: 0;
  }

  .nav__option-container {
    display: flex;
    flex-direction: row;
  }

  .nav__option-header {
    text-transform: uppercase;
    writing-mode: vertical-lr;
    font-weight: normal;
    font-size: 1.1em;
    color: var(--gold);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 1rem;
    margin-bottom: 2rem;
  }

  .nav__option-list {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 1px var(--sand) solid;
    margin-bottom: 2rem;
    padding-left: 1rem;
  }

  .nav__option-list-item-link {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s linear;
    padding: 0;
  }

  .email {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  .nav__option-list-item-link:active,
  .nav__option-list-item-link:hover {
    outline-width: 0;
    color: var(--pink);
  }

  @media and (hover: hover) {
    .nav-list__item-link:hover {
      color: var(--pink);
    }
  }

  @media screen and (max-width: 959px) {
    display: none;
  }
`

export default LargeMenu
