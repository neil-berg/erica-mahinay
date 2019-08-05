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
    <li className="nav__option-list-item" key={item.id}>
      <Link className="nav__option-list-item-link" to={`/${item.slug}`}>
        {item.title}
      </Link>
    </li>
  ))

  const renderOnViewTitles = onView.map(item => (
    <li className="nav__option-list-item" key={item.id}>
      <Link className="nav__option-list-item-link" to={`/${item.slug}`}>
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
        {onView.length > 0 && (
          <div className="nav__option-container">
            <h3 className="nav__option-header">On View</h3>
            <ul className="nav__option-list">{renderOnViewTitles}</ul>
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
              <Link className="nav__option-list-item-link" to="/thoughts">
                Studio Bits
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav__option-container">
          <h3 className="nav__option-header">Info</h3>
          <ul className="nav__option-list">
            <li className="nav__option-list-item">Contact</li>
            <li className="nav__option-list-item">CV</li>
          </ul>
        </div>
      </StyledMenu>
    </div>
  )
}

const MenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${props => (props.isMenuOpen ? "1rem" : "1rem 0")};
  max-width: ${props => (props.isMenuOpen ? "960px" : "600px")};
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
  padding: 5rem 1rem 0 0;
  overflow-y: scroll;

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

  @media screen and (min-width: 960px) {
    display: none;
  }
`

export default SmallMenu
