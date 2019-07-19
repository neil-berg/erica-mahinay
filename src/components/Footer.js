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
  color: var(--blue);

  a {
    text-decoration: none;
    color: var(--gold);
    font-weight: bold;
  }

  @media screen and (min-width: 960px) {
    margin-left: 300px;
  }
`

export default Footer
