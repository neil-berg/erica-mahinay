import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { useExhibitions } from "../hooks/useExhibitions"

const Sidebar = () => {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false)
  const [isOnDisplayOpen, setIsOnDisplayOpen] = useState(true)
  const [isExhibitionsOpen, setIsExhibitionsOpen] = useState(true)
  const [isWritingOpen, setIsWritingOpen] = useState(true)
  console.log(isSideDrawerOpen)
  // Retrieve exhibition titles from CMS and create a list of them
  const exhibitions = useExhibitions()
  const renderExhibitionTitles = exhibitions.map(item => (
    <li
      className="nav-list__item"
      key={item.id}
      onClick={() => setIsSideDrawerOpen(!isSideDrawerOpen)}
    >
      <Link className="nav-list__item-link" to={`/${item.slug}`}>
        {item.title}
      </Link>
    </li>
  ))
  return (
    <>
      <Header>
        <i
          className="header__icon"
          onClick={() => setIsSideDrawerOpen(!isSideDrawerOpen)}
        >
          {isSideDrawerOpen ? "Close" : "Open"}
        </i>
        <h2 className="header__text">
          <Link className="header__text-link" to="/">
            Erica Mahinay
          </Link>
        </h2>
      </Header>
      <SideDrawer
        isSideDrawerOpen={isSideDrawerOpen}
        isOnDisplayOpen={isOnDisplayOpen}
        isExhibitionsOpen={isExhibitionsOpen}
        isWritingOpen={isWritingOpen}
      >
        <h3
          className="nav-list-header"
          onClick={() => setIsOnDisplayOpen(!isOnDisplayOpen)}
        >
          <span className="nav-list-header__text">On Display</span>
          <i>{isOnDisplayOpen ? "U" : ">>"}</i>
        </h3>
        <ul className="nav-list-on-display">
          <li className="nav-list__item">Euclid</li>
          <li className="nav-list__item">Touch Knows Before Language</li>
        </ul>
        <h3
          className="nav-list-header"
          onClick={() => setIsExhibitionsOpen(!isExhibitionsOpen)}
        >
          <span className="nav-list-header__text">Exhibitions</span>
          <i>{isExhibitionsOpen ? "U" : ">>"}</i>
        </h3>
        <ul className="nav-list-exhibitions">{renderExhibitionTitles}</ul>
        <h3
          className="nav-list-header"
          onClick={() => setIsWritingOpen(!isWritingOpen)}
        >
          <span className="nav-list-header__text">Writing</span>
          <i>{isWritingOpen ? "U" : ">>"}</i>
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

  > h2,
  h3,
  ul {
    padding: 0.25rem 0.5rem;
  }

  .nav-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px var(--sand) solid;
    border-bottom: 1px var(--sand) solid;
  }

  .nav-list-on-display {
    transform: ${props =>
      props.isOnDisplayOpen ? "rotateX(0)" : "rotateX(90deg)"};
    overflow: ${props => (props.isOnDisplayOpen ? "" : "hidden")};
    max-height: ${props => (props.isOnDisplayOpen ? "400px" : "0")};
    transition: all 0.3s;
  }

  .nav-list-exhibitions {
    transform: ${props =>
      props.isExhibitionsOpen ? "rotateX(0)" : "rotateX(90deg)"};
    overflow: ${props => (props.isExhibitionsOpen ? "" : "hidden")};
    max-height: ${props => (props.isExhibitionsOpen ? "400px" : "0")};
    transition: all 0.3s;
  }

  .nav-list-writing {
    transform: ${props =>
      props.isWritingOpen ? "rotateX(0)" : "rotateX(90deg)"};
    overflow: ${props => (props.isWritingOpen ? "" : "hidden")};
    max-height: ${props => (props.isWritingOpen ? "400px" : "0")};
    transition: all 0.3s;
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
