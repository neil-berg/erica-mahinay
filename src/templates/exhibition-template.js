import React, { useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import SEO from "../components/seo"
import Layout from "../components/layout"
import ImageCard from "../components/ImageCard"
import Portal from "../components/Portal"
import Modal from "../components/Modal"

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
          localFile {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
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

  // State of modal and the first image to show in the carousel
  const [showModal, setShowModal] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  const handleImageClick = e => {
    if (e.target.nodeName === "IMG") {
      // Obtain image index based on the parent div's data-id attribute
      const parentId = e.target.closest(".image-card").dataset.id
      const imageIndex = images.map(image => image.id).indexOf(parentId)

      setStartIndex(imageIndex)
      setShowModal(true)
    }
  }

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
        <ul
          className="exhibition__image-list"
          onClick={e => handleImageClick(e)}
        >
          {renderImages}
        </ul>
      </TemplateWrapper>
      <Portal>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          images={images}
          startIndex={startIndex}
        />
      </Portal>
    </Layout>
  )
}

const TemplateWrapper = styled.div`
  .header {
    color: var(--gold);
    max-width: 600px;
    margin: 2rem auto;
  }

  .header__exhibition-title {
    font-size: 1.75em;
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
    color: var(--gold);
    font-weight: 400;
    text-decoration: none;
    transition: 0.3s linear;
  }

  .exhibition__image-list {
    max-width: 600px;
    margin: 0 auto;
    padding: 0;
  }

  @media (hover: hover) {
    .header__exhibition-press-release:hover {
      color: var(--pink);
    }
  }

  @media screen and (max-width: 600px) {
    .header,
    .exhibition__image-list {
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
