import React from "react"
import styled from "styled-components"

const Footer = () => (
  <StyledFooter>
    site by
    <a href="https://neilberg.dev">neil berg</a>
  </StyledFooter>
)

const StyledFooter = styled.footer`
  width: 100vw;
  margin: 0 auto;
`

export default Footer
