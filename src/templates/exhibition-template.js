import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"
import Layout from "../components/layout"

export const query = graphql`
  query($exhibitionTitle: String!) {
    allContentfulImage(
      filter: { exhibition: { eq: $exhibitionTitle } }
      sort: { fields: order, order: ASC }
    ) {
      nodes {
        dimensions
        id
        title
        year(formatString: "YYYY")
        imageFile {
          fluid(maxWidth: 960) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        materials
      }
    }
  }
`

const ExhibitionTemplate = props => {
  const images = props.data.allContentfulImage.nodes
  const renderImages = images.map((image, i) => (
    <Img fluid={image.imageFile.fluid} />
  ))
  return (
    <Layout>
      <SEO
        title={props.pageContext.exhibitionTitle}
        description={`Exhibition page fror ${props.pageContext.exhibitionTitle}`}
      />
      <h1>{props.pageContext.exhibitionTitle}</h1>
      <a
        className="header__press-release"
        href={props.pageContext.pressRelease}
        target="_blank"
        rel="noopener noreferrer"
      >
        Press release
      </a>
      <section>{renderImages}</section>
    </Layout>
  )
}

export default ExhibitionTemplate
