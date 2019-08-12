import React, { useState } from "react"
import { graphql } from "gatsby"
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
              fluid(maxWidth: 800) {
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

  const [showModal, setShowModal] = useState(false)
  const [modalImages, setModalImages] = useState([])

  const handleImageClick = e => {
    if (e.target.nodeName === "IMG") {
      // Obtain details on the clicked image based on the image's
      // parent div's data-id attribute
      const parentId = e.target.closest(".image-card").dataset.id

      // Rearrange the imageData array so the clicked image is the
      // starting index
      const startingIndex = images.map(image => image.id).indexOf(parentId)
      const rearrangedImages = images
        .slice(startingIndex)
        .concat(images.slice(0, startingIndex))

      setShowModal(true)
      setModalImages(rearrangedImages)
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
        <section
          className="exhibition__images"
          onClick={e => handleImageClick(e)}
        >
          {renderImages}
        </section>
      </TemplateWrapper>
      <Portal>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          modalImages={modalImages}
        />
      </Portal>
    </Layout>
  )
}

const TemplateWrapper = styled.div`
  .header,
  .exhibition__images {
    max-width: 600px;
    margin: 2rem auto;
  }

  .header {
    color: var(--gold);
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

  @media (hover: hover) {
    .header__exhibition-press-release:hover {
      color: var(--pink);
    }
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
