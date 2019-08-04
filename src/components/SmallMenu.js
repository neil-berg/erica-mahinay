import React, { useState } from "react"
import { Link } from "gatsby"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"

import { useExhibitions } from "../hooks/useExhibitions"

const SmallMenu = () => {
  // Track status of menu open/close for spring animation
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Setup the zoom-in animation for the menu reveal on small screens
  const animation = useSpring({
    transform: isMenuOpen
      ? `translate3d(0,0,0) scale(1)`
      : `translate3d(-100%,0,0) scale(0.6)`,
  })

  // Retrieve exhibition titles from Contentful and generate lists
  const { onView, exhibitions } = useExhibitions()

  const renderExhibitionTitles = exhibitions.map(item => (
    <li className="nav-list__item" key={item.id}>
      <Link className="nav-list__item-link" to={`/${item.slug}`}>
        {item.title}
      </Link>
    </li>
  ))

  const renderOnViewTitles = onView.map(item => (
    <li className="nav-list__item" key={item.id}>
      <Link className="nav-list__item-link" to={`/${item.slug}`}>
        {item.title}
      </Link>
    </li>
  ))

  return (
    <div>
      <MenuHeader isMenuOpen={isMenuOpen}>
        <button
          className="header__button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
        <h2 className="header__text">
          <Link className="header__text-link" to="/">
            Erica Mahinay
          </Link>
        </h2>
      </MenuHeader>
      <StyledMenu
        style={animation}
        onClick={e => {
          const className = e.target.className
          if (
            className === "nav-list__item" ||
            className === "nav-list__item-link"
          ) {
            setIsMenuOpen(false)
          }
        }}
      >
        {onView && (
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
              Studio Bits
            </Link>
          </li>
        </ul>
        <h3 className="nav-list-header">Information</h3>
        <ul className="nav-list-information">
          <li className="nav-list__item">Contact</li>
          <li className="nav-list__item">CV</li>
        </ul>
      </StyledMenu>
    </div>
  )
}

const MenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  max-width: 600px;
  margin: 0 auto;

  .header__text {
    font-size: 0.9rem;
    text-transform: uppercase;
    color: var(--gold);
  }

  .header__text-link {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  .header__button {
    color: ${props => (props.isMenuOpen ? "var(--sand)" : "var(--gold)")};
    background: transparent;
    padding: 0;
    outline: 0;
    border: 0;
    z-index: 4;
    transition: color 0.4s ease-in;
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem 1rem;
  }

  @media screen and (min-width: 960px) {
    display: none;
  }
`

const StyledMenu = styled(animated.nav)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: var(--white);
  color: var(--sand);
  z-index: 2;
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: scroll;

  .nav-list-on-view,
  .nav-list-exhibitions,
  .nav-list-writing,
  .nav-list-information {
    margin-bottom: 1rem;
    // transform: rotate(-15deg);
  }

  .nav-list__item {
    padding-bottom: 0.75em;
    font-size: 1em;
    font-weight: 300;
    line-height: 1em;
    text-align: center;
    color: var(--gold);
  }

  .nav-list__item:first-child {
    padding-top: 0.5em;
  }

  .nav-list-header {
    text-transform: uppercase;
    font-weight: normal;
    font-size: 1.15em;
    // transform: rotate(-15deg);
    text-align: center;
    border-bottom: 1px var(--sand) solid;
    padding-bottom: 0.1em;
    color: var(--gold);
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

  @media and (hover: hover) {
    .nav-list__item-link:hover {
      color: var(--pink);
    }
  }

  @media screen and (min-width: 960px) {
    display: none;
  }
`

export default SmallMenu
