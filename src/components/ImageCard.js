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
    padding-top: 0.5rem;
  }

  .details__year,
  .details__materials,
  .details__dimensions {
    font-weight: 300;
    font-size: 0.8em;
    padding-top: 0.35rem;
    line-height: 1em;
  }

  .details__title {
    font-size: 0.9em;
    font-weight: 400;
    font-style: italic;
  }

  @media (hover: hover) {
    :hover .card__details {
      color: var(--blue);
    }
  }
`

export default ImageCard
