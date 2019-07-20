import React from "react"
import { Link } from "gatsby"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"

import { useExhibitions } from "../hooks/useExhibitions"

const SmallMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  // Retrieve exhibition titles from CMS and create a list of them
  const exhibitions = useExhibitions()
  const renderExhibitionTitles = exhibitions.map(item => (
    <li
      className="nav-list__item"
      key={item.id}
      // onClick={() => handleCloseClick()}
    >
      <Link className="nav-list__item-link" to={`/${item.slug}`}>
        {item.title}
      </Link>
    </li>
  ))

  // Setup the zoom-in animation for the menu reveal on small screens
  const animation = useSpring({
    transform: isMenuOpen
      ? `translate3d(0,0,0) scale(1)`
      : `translate3d(-100%,0,0) scale(0.6)`,
  })

  return (
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

const StyledMenu = styled(animated.nav)`
  position: fixed;
  top: 50px;
  left: 0;
  height: calc(100vh - 50px);
  width: 100vw;
  background: var(--blue);
  color: var(--sand);
  z-index: 2;
  overflow-y: scroll;

  h3,
  ul > li {
    transform: rotate(-15deg);
  }

  .nav-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-list-header__text {
    //font-family: "Josefin Sans", sans-serif;
    font-family: "Quattrocento Sans", sans-serif;
    font-weight: 400;
  }

  .nav-list__item-link {
    font-family: "Josefin Sans", sans-serif;
    //font-family: "Quattrocento Sans", sans-serif;
    font-weight: 300;
    color: inherit;
    text-decoration: none;
    transition: all 0.3s linear;
  }

  .nav-list__item-link:active {
    outline-width: 0;
    color: var(--pink);
  }

  @media and (hover: hover) {
    .nav-list__item-link:hover {
      color: var(--pink);
    }
  }

  @media screen and (min-width: 960px) {
    width: 250px;
  }
`

export default SmallMenu
