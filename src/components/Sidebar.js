import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { useExhibitions } from "../hooks/useExhibitions"

const Sidebar = () => {
  const exhibitions = useExhibitions()
  const renderExhibitionTitles = exhibitions.map(item => (
    <li key={item.id}>
      <Link to={`/${item.slug}`}>{item.title}</Link>
    </li>
  ))
  return (
    <SidebarWrapper>
      <h2>Erica Mahinay</h2>
      <hr />
      <h3>On Display</h3>
      <ul>
        <li>Euclid</li>
        <li>Touch Knows Before Language</li>
      </ul>
      <h3>Exhibitions</h3>
      <ul>{renderExhibitionTitles}</ul>
      <h3>Writing</h3>
      <h3>Contact</h3>
      <h3>CV</h3>
    </SidebarWrapper>
  )
}

const SidebarWrapper = styled.div`
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  background: var(--blue);
  color: var(--sand);
`

export default Sidebar
