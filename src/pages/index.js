import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import SEO from "../components/seo"
import { useExhibitions } from "../hooks/useExhibitions"

const IndexPage = () => {
  const exhibitions = useExhibitions()

  const renderExhibitionTitles = exhibitions.map(item => (
    <li key={item.id}>
      <Link to={`/${item.slug}`}>{item.title}</Link>
    </li>
  ))

  return (
    <HomeContainer>
      <SEO title="Home" />
      <ul>{renderExhibitionTitles}</ul>
    </HomeContainer>
  )
}

const HomeContainer = styled.div``

export default IndexPage
