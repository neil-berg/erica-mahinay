import React, { useEffect } from "react"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons"
import propTypes from "prop-types"
import { motion, AnimatePresence } from "framer-motion"

//import Carousel from "./Carousel"
import Carousel from "nuka-carousel"

const Modal = ({ showModal, setShowModal, images, startIndex }) => {
  // Obtain viewport height to set carousel image height
  const innerHeight = window.innerHeight

  return (
    <AnimatePresence initial={false}>
      <Container>
        {showModal && (
          <motion.div
            key="modal"
            className="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
            onClick={e => {
              if (e.target.classList.contains("backdrop")) {
                setShowModal(false)
              }
            }}
          >
            <Carousel
              wrapAround={true}
              slideIndex={startIndex}
              heightMode={false}
              initialSlideHeight={innerHeight}
              enableKeyboardControls={true}
              renderBottomCenterControls={null}
              renderTopCenterControls={() => (
                <button onClick={() => setShowModal(false)}>CLOSE</button>
              )}
              renderCenterLeftControls={({ previousSlide }) => (
                <button className="carousel__button" onClick={previousSlide}>
                  <FontAwesomeIcon
                    className="carousel__button-icon"
                    icon={faCaretLeft}
                  />
                </button>
              )}
              renderCenterRightControls={({ nextSlide }) => (
                <button className="carousel__button" onClick={nextSlide}>
                  <FontAwesomeIcon
                    className="carousel__button-icon"
                    icon={faCaretRight}
                  />
                </button>
              )}
            >
              {images.map((image, i) => (
                <div className="image-container" key={i}>
                  <img
                    className="image"
                    src={image.imageFile.localFile.childImageSharp.fluid.src}
                  />
                </div>
              ))}
            </Carousel>
            {/* <div className="card">
              <Carousel modalImages={modalImages} />
              <div>
                <button
                  className="card__button"
                  onClick={() => setShowModal(false)}
                >
                  <FontAwesomeIcon icon={faTimes} color="grey" />
                </button>
              </div>
            </div> */}
          </motion.div>
        )}
      </Container>
    </AnimatePresence>
  )
}

const Container = styled.div`
  .backdrop {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 200;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    overflow: hidden;
  }

  .image-container {
    height: 100vh;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image {
    display: block;
    max-height: 100vh;
    width: auto;
  }

  .carousel__button {
    background: rgba(211, 211, 211, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0.5rem 1rem;
    outline: 0;
  }

  .carousel__button:active {
    outline: 0;
  }

  .carousel__button-icon {
    padding: 0;
    color: white;
    font-size: 36px;
  }

  .card__button {
    width: 40px;
    height: 40px;
    background: transparent;
    border: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: -55px;
    right: 0.5rem;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 202;
  }
`

Modal.propTypes = {
  showModal: propTypes.bool.isRequired,
  setShowModal: propTypes.func.isRequired,
  images: propTypes.array.isRequired,
  startIndex: propTypes.number.isRequired,
}

export default Modal
