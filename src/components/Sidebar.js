import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons"

import { useExhibitions } from "../hooks/useExhibitions"

const Sidebar = () => {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false)
  const [isOnDisplayOpen, setIsOnDisplayOpen] = useState(true)

  const handleOpenClick = () => {
    document.body.classList.add("no-scroll")
    setIsSideDrawerOpen(true)
  }

  const handleCloseClick = () => {
    document.body.classList.remove("no-scroll")
    setIsSideDrawerOpen(false)
  }

  // Retrieve exhibition titles from CMS and create a list of them
  const exhibitions = useExhibitions()
  const renderExhibitionTitles = exhibitions.map(item => (
    <li
      className="nav-list__item"
      key={item.id}
      onClick={() => handleCloseClick()}
    >
      <Link className="nav-list__item-link" to={`/${item.slug}`}>
        {item.title}
      </Link>
    </li>
  ))
  return (
    <>
      <Header>
        {isSideDrawerOpen ? (
          <FontAwesomeIcon
            className="header__icon"
            icon={faTimes}
            onClick={() => handleCloseClick()}
          />
        ) : (
          <FontAwesomeIcon
            className="header__icon"
            icon={faBars}
            onClick={() => handleOpenClick()}
          />
        )}

        <h2 className="header__text">
          <Link className="header__text-link" to="/">
            Erica Mahinay
          </Link>
        </h2>
      </Header>
      <SideDrawer isSideDrawerOpen={isSideDrawerOpen}>
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
          <li className="nav-list__item">Thoughts</li>
        </ul>
        <h3 className="nav-item">Contact</h3>
        <h3 className="nav-item">CV</h3>
      </SideDrawer>
    </>
  )
}

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100vw;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--blue);
  z-index: 2;
  .header__icon {
    position: absolute;
    left: 1rem;
    color: var(--white);
    font-size: 1.5rem;
  }
  .header__text-link {
    color: var(--sand);
    text-decoration: none;
    transition: 0.3s;
  }
  .header__text-link:hover,
  .header__text-link:active {
    color: var(--pink);
  }
  @media screen and (min-width: 960px) {
    width: 250px;
    .header__icon {
      display: none;
    }
  }
`

const SideDrawer = styled.nav`
  position: fixed;
  top: 50px;
  left: 0;
  width: ${props => (props.isSideDrawerOpen ? "100vw" : "0px")};
  height: 100vh;
  background: var(--blue);
  color: var(--sand);
  overflow-x: hidden;
  transition: width 0.3s linear;
  z-index: 2;

  .nav-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px var(--sand) solid;
    border-bottom: 1px var(--sand) solid;
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
  @media screen and (min-width: 960px) {
    width: 250px;
  }
`

export default Sidebar
