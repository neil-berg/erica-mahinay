import React from "react"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import propTypes from "prop-types"
import { motion, AnimatePresence } from "framer-motion"

//import Carousel from "./Carousel"
import Carousel from "nuka-carousel"

const Modal = ({ showModal, setShowModal, images, startIndex }) => {
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
              renderBottomCenterControls={null}
              heightMode={false}
              initialSlideHeight={700}
              enableKeyboardControls={true}
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
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image {
    display: block;
    max-height: 100vh;
    width: auto;
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
