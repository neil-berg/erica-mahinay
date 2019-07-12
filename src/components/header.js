import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons"

const NewHeader = ({ isMenuOpen, setIsMenuOpen }) => {
  const handleOpenClick = () => {
    document.body.classList.add("no-scroll")
    setIsMenuOpen(true)
  }

  const handleCloseClick = () => {
    document.body.classList.remove("no-scroll")
    setIsMenuOpen(false)
  }

  return (
    <StyledHeader>
      {isMenuOpen ? (
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
      <h1 className="header__text">
        <Link className="header__text-link" to="/">
          Erica Mahinay
        </Link>
      </h1>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  background: var(--blue);
  color: var(--sand);
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .header__icon {
    position: absolute;
    left: 1rem;
    color: var(--white);
    font-size: 1.5rem;
  }

  .header__text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header__text-link {
    font-size: 1.5rem;
    color: var(--sand);
    text-decoration: none;
    transition: 0.3s;
  }

  .header__text-link:active {
    color: var(--pink);
  }

  @media (hover: hover) {
    .header__text-link:hover {
      color: var(--pink);
    }
  }

  @media screen and (min-width: 960px) {
    width: 300px;
    height: 100px;
    .header__icon {
      display: none;
    }
    .header__text {
      transform: rotate(-15deg);
    }
  }
`

export default NewHeader
