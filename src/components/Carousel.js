import React, { useEffect, useRef } from "react"
import ReactSwipe from "react-swipe"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"

const Carousel = ({ modalImages }) => {
  // Focus <CarouselContainer> on mount to allow for
  // arrow left and arrow right keys to toggle images
  const carouselRef = useRef(null)
  useEffect(() => {
    carouselRef.current.focus()
  }, [])

  let reactSwipeEl

  const images = modalImages.map(image => (
    <figure className="carousel__image-container" key={image.id}>
      <div className="carousel__image-container-inner">
        <img
          className="carousel__image"
          src={image.imageFile.localFile.childImageSharp.fluid.src}
          alt={image.title || ""}
          onClick={() => reactSwipeEl.next()}
        />
        <figcaption className="image__caption">
          <p className="caption-title">{image.title}</p>
          <p className="caption-year">{image.year}</p>
          <p className="caption-materials">{image.materials}</p>
          <p className="caption-view">{image.view}</p>
          <p className="caption-location">{image.location}</p>
          <p className="caption-dimensions">{image.dimensions}</p>
        </figcaption>
      </div>
    </figure>
  ))

  return (
    <CarouselContainer
      ref={carouselRef}
      tabIndex="0"
      onKeyDown={e => {
        if (e.key === "ArrowLeft") {
          reactSwipeEl.prev()
        } else if (e.key === "ArrowRight") {
          reactSwipeEl.next()
        }
      }}
    >
      <button className="carousel__button" onClick={() => reactSwipeEl.prev()}>
        <FontAwesomeIcon
          className="carousel__button-icon"
          icon={faChevronLeft}
        />
      </button>
      <ReactSwipe
        className="carousel"
        childCount={images.length}
        swipeOptions={{}}
        ref={el => (reactSwipeEl = el)}
      >
        {images}
      </ReactSwipe>
      <button className="carousel__button" onClick={() => reactSwipeEl.next()}>
        <FontAwesomeIcon
          className="carousel__button-icon"
          icon={faChevronRight}
        />
      </button>
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
  height: 60vh;
  width: 100vw;
  display: flex;
  align-items: center;

  &:focus {
    outline: 0;
  }

  .carousel {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .carousel__button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: transparent;
    margin: 0.5rem;
    cursor: pointer;
  }

  .carousel__button-icon {
    color: grey;
    font-size: 1.75rem;
  }

  .carousel__image-container {
    height: 100%;
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .carousel__image-container-inner {
    position: relative;
  }

  .carousel__image {
    display: block;
    max-height: 60vh;
    width: 100vw;
  }

  .image__caption {
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(153, 153, 153, 0.75);
    width: 100%;
    color: white;
    padding: 0.5em 1em;
    opacity: 0;
    transition: opacity 0.3s linear;
  }

  .caption-title,
  .caption-year,
  .caption-materials,
  .caption-view,
  .caption-location,
  .caption-dimensions {
    margin: 0;
    padding: 0;
    font-size: 0.85em;
    line-height: 1.25em;
  }

  .caption-title {
    font-weight: bold;
  }

  @media screen and (min-width: 600px) {
    height: 80vh;

    .carousel__image {
      max-height: 80vh;
      width: auto;
    }
  }

  @media screen and (max-width: 450px) {
    .carousel__button {
      display: none;
    }
  }

  // TODO - work on debugging position of hovered figcaption
  // seems to be bleeding below image...
  // @media (hover: hover) {
  //   .carousel__image-container-inner:hover {
  //     .image__caption {
  //       opacity: 1;
  //     }
  //   }
  // }
`

Carousel.propTypes = {
  modalImages: PropTypes.array.isRequired,
}

export default Carousel
