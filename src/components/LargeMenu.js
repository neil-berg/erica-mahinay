import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { useExhibitions } from "../hooks/useExhibitions"

const LargeMenu = () => {
  // Retrieve exhibition titles from CMS and create a list of them
  const exhibitions = useExhibitions()
  const renderExhibitionTitles = exhibitions.map(item => (
    <li className="nav-list__item" key={item.id}>
      <Link className="nav-list__item-link" to={`/${item.slug}`}>
        {item.title}
      </Link>
    </li>
  ))

  return (
    <StyledMenu>
      <h3 className="nav-list-header">
        <span className="nav-list-header__text">On Display</span>
      </h3>
      <ul className="nav-list-on-display">
        <li className="nav-list__item">Euclid</li>
        <li className="nav-list__item">Touch Knows Before Language</li>
      </ul>
      <h3 className="nav-list-header">
        <span className="nav-list-header__text">Exhibitions</span>
      </h3>
      <ul className="nav-list-exhibitions">{renderExhibitionTitles}</ul>
      <h3 className="nav-list-header">
        <span className="nav-list-header__text">Writing</span>
      </h3>
      <ul className="nav-list-writing">
        <li className="nav-list__item">Press</li>
        <li className="nav-list__item">
          <Link className="nav-list__item-link" to="/thoughts">
            Thoughts
          </Link>
        </li>
      </ul>
      <h3 className="nav-item">Contact</h3>
      <h3 className="nav-item">CV</h3>
    </StyledMenu>
  )
}

const StyledMenu = styled.nav`
  position: fixed;
  top: 100px;
  left: 0;
  height: 100vh;
  width: 300px;
  background: var(--blue);
  color: var(--sand);
  z-index: 2;
  padding: 0 0.5rem;

  h3,
  ul {
    transform: rotate(-15deg);
  }

  .nav-list__item {
    padding-left: 1.75rem;
  }

  .nav-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-list__item-link {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s linear;
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
