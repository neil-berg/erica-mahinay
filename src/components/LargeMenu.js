import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { useExhibitions } from "../hooks/useExhibitions"
import { useOnView } from "../hooks/useOnView"

const LargeMenu = () => {
  // Retrieve on view and exhibition titles from Contenful and generate lists
  const exhibitions = useExhibitions()
  const onview = useOnView()

  const renderExhibitionTitles = exhibitions.map(item => (
    <li className="nav-list__item" key={item.id}>
      <Link className="nav-list__item-link" to={`/${item.slug}`}>
        {item.title}
      </Link>
    </li>
  ))

  const renderOnViewTitles = onview.map(item => (
    <li className="nav-list__item" key={item.id}>
      <a
        className="nav-list__item-link"
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.title}
      </a>
    </li>
  ))

  return (
    <StyledMenu>
      <h2 className="nav__header">
        <Link className="nav__header-link" to="/">
          Erica Mahinay
        </Link>
      </h2>
      {onview && (
        <>
          <h3 className="nav-list-header">
            <span className="nav-list-header__text">On View</span>
          </h3>
          <ul className="nav-list-on-view">{renderOnViewTitles}</ul>
        </>
      )}
      <h3 className="nav-list-header">
        <span className="nav-list-header__text">Exhibitions</span>
      </h3>
      <ul className="nav-list-exhibitions">{renderExhibitionTitles}</ul>
      <h3 className="nav-list-header">
        <span className="nav-list-header__text">Writing</span>
      </h3>
      <ul className="nav-list-writing">
        <li className="nav-list__item">
          <Link className="nav-list__item-link" to="/press">
            Press
          </Link>
        </li>
        <li className="nav-list__item">
          <Link className="nav-list__item-link" to="/thoughts">
            Thoughts
          </Link>
        </li>
      </ul>
      <h3 className="nav-list-header">Information</h3>
      <ul className="nav-list-information">
        <li className="nav-list__item">Contact</li>
        <li className="nav-list__item">CV</li>
      </ul>
    </StyledMenu>
  )
}

const StyledMenu = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  background: var(--blue);
  color: var(--sand);
  z-index: 2;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: scroll;

  .nav__header {
    font-size: 1.2em;
    padding: 3rem 0;
    transform: rotate(-15deg);
    text-align: center;
    text-transform: uppercase;
  }

  .nav__header-link {
    color: inherit;
    text-decoration: none;
  }

  .nav-list-on-view,
  .nav-list-exhibitions,
  .nav-list-writing,
  .nav-list-information {
    margin-bottom: 1rem;
    transform: rotate(-15deg);
  }

  .nav-list__item {
    padding-bottom: 0.75em;
    font-size: 0.95em;
    font-weight: 200;
    line-height: 1em;
    text-align: center;
  }

  .nav-list__item:first-child {
    padding-top: 0.5em;
  }

  .nav-list-header {
    text-transform: uppercase;
    font-weight: normal;
    font-size: 1.15em;
    transform: rotate(-15deg);
    text-align: center;
    border-bottom: 1px var(--sand) solid;
    padding-bottom: 0.1em;
  }

  .nav-list__item-link {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s linear;
    padding: 0;
  }
  .nav-list__item-link:active,
  .nav-list__item-link:hover {
    outline-width: 0;
    color: var(--pink);
  }

  @media screen and (max-width: 959px) {
    display: none;
  }
`

export default LargeMenu
