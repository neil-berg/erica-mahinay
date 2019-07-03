import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

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
    <Img fluid={image.imageFile.fluid} key={image.id} />
  ))
  return (
    <Layout>
      <SEO
        title={props.pageContext.exhibitionTitle}
        description={`Exhibition page fror ${props.pageContext.exhibitionTitle}`}
      />
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <TemplateWrapper>
          <header>
            <h1>{props.pageContext.exhibitionTitle}</h1>
            <p>{props.pageContext.date}</p>
            <p>{props.pageContext.gallery}</p>
            <p>{props.pageContext.location}</p>
          </header>
          <a
            className="header__press-release"
            href={props.pageContext.pressRelease}
            target="_blank"
            rel="noopener noreferrer"
          >
            Press release
          </a>
          <section>{renderImages}</section>
        </TemplateWrapper>
      </div>
    </Layout>
  )
}

const TemplateWrapper = styled.div`
  margin-top: 50px;
  padding: 1rem;

  @media screen and (min-width: 960px) {
    padding: 0 0 0 250px;
  }
`

export default ExhibitionTemplate
