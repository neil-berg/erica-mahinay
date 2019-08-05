import React from "react"
import styled from "styled-components"

const Footer = ({ location }) => (
  <StyledFooter>
    site by <a href="https://neilberg.dev">neil berg</a>
  </StyledFooter>
)

const StyledFooter = styled.footer`
  text-align: center;
  padding: 1rem;
  color: var(--gold);

  a {
    text-decoration: none;
    color: var(--sand);
    font-weight: bold;
    transition: 0.3s linear;
  }

  @media (hover: hover) {
    a:hover {
      color: var(--pink);
    }
  }

  @media screen and (min-width: 960px) {
    margin-left: 300px;
  }
`

export default Footer
