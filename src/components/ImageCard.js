import React from "react"
import Img from "gatsby-image"
import styled from "styled-components"

const ImageCard = ({ image }) => {
  return (
    <ImageCardWrapper>
      <Img className="card__image" fluid={image.imageFile.fluid} />
      <section className="card__details">
        <h3 className="details__title">{image.title}</h3>
        <h4 className="details__year">{image.year}</h4>
        <h5 className="details__materials">{image.materials}</h5>
        <h5 className="details__dimensions">{image.dimensions}</h5>
      </section>
    </ImageCardWrapper>
  )
}

const ImageCardWrapper = styled.div`
  margin-bottom: 4rem;

  .card__details {
    color: var(--gold);
  }

  .details__year,
  .details__materials,
  .details__dimensions {
    font-weight: normal;
    font-size: 1em;
    padding-top: 0.35rem;
  }

  .details__title {
    font-size: 1em;
    font-style: italic;
  }

  @media (hover: hover) {
    :hover .card__details {
      color: var(--blue);
    }
  }
`

export default ImageCard
