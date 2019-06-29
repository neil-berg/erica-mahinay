import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useExhibitions } from "../hooks/useExhibitions"

const IndexPage = () => {
  const exhibitions = useExhibitions()

  return (
    <Layout>
      <SEO title="Home" />
      <h2>{exhibitions[0].title}</h2>
      <h2>{exhibitions[1].title}</h2>
    </Layout>
  )
}

export default IndexPage
