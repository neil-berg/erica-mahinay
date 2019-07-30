import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import SEO from "../components/seo"
import Layout from "../components/layout"
import ImageCard from "../components/ImageCard"

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
          fluid(maxWidth: 600) {
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
  const renderImages = images.map(image => (
    <ImageCard key={image.id} image={image} />
  ))
  return (
    <Layout>
      <SEO
        title={props.pageContext.exhibitionTitle}
        description={`Exhibition page fror ${props.pageContext.exhibitionTitle}`}
      />
      <TemplateWrapper>
        <div className="header">
          <h2 className="header__exhibition-title">
            {props.pageContext.exhibitionTitle}
          </h2>
          <h3 className="header__exhibition-date">{props.pageContext.date}</h3>
          <h3 className="header__exhibition-gallery">
            {props.pageContext.gallery}
          </h3>
          <h3 className="header__exhibition-location">
            {props.pageContext.location}
          </h3>
          <a
            className="header__exhibition-press-release"
            href={props.pageContext.pressRelease}
            target="_blank"
            rel="noopener noreferrer"
          >
            Press release
          </a>
        </div>
        <section className="exhibition__images">{renderImages}</section>
      </TemplateWrapper>
    </Layout>
  )
}

const TemplateWrapper = styled.div`
  .header,
  .exhibition__images {
    max-width: 600px;
    margin: 0 auto;
  }

  .header {
    margin-top: 50px;
    color: var(--gold);
  }

  .header__exhibition-title {
    font-size: 2em;
    margin-bottom: 1rem;
  }

  .header__exhibition-date,
  .header__exhibition-gallery,
  .header__exhibition-location {
    font-size: 1em;
    font-weight: 300;
    padding-bottom: 0.35rem;
  }

  .header__exhibition-press-release {
    color: var(--blue);
    font-weight: 300;
  }

  @media screen and (max-width: 600px) {
    .header,
    .exhibition__images {
      padding: 0 1rem;
    }
  }

  @media screen and (min-width: 960px) {
    margin-left: 300px;

    .exhibition__header {
      margin-top: 0;
    }
  }
`

export default ExhibitionTemplate
