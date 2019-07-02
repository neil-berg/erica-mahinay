import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
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
    <Layout>
      <SEO title="Home" />
      <ul>{renderExhibitionTitles}</ul>
    </Layout>
  )
}

export default IndexPage
