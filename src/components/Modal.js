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
              renderCenterLeftControls={null}
              renderCenterRightControls={null}
              renderBottomCenterControls={null}
              renderTopCenterControls={({ previousSlide, nextSlide }) => (
                <div className="button-container">
                  <div className="toggles-container">
                    <button className="button toggle" onClick={previousSlide}>
                      PREV
                    </button>
                    <button className="button toggle" onClick={nextSlide}>
                      NEXT
                    </button>
                  </div>
                  <button
                    className="button close"
                    onClick={() => setShowModal(false)}
                  >
                    CLOSE
                  </button>
                </div>
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
    cursor: auto;
  }

  .image {
    display: block;
    max-height: 100vh;
    width: auto;
  }

  .slider-slide.slide-visible {
    cursor: auto;
  }

  .button-container {
    width: 100vw;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }

  .button {
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.5);
    color: var(--gold);
    border: 0;
    cursor: pointer;
  }

  .button.toggle:first-child {
    margin-right: 1rem;
  }

  .button:active,
  .button:focus {
    outline: 0;
  }
`

Modal.propTypes = {
  showModal: propTypes.bool.isRequired,
  setShowModal: propTypes.func.isRequired,
  images: propTypes.array.isRequired,
  startIndex: propTypes.number.isRequired,
}

export default Modal
