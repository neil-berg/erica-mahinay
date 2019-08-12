import React from "react"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import propTypes from "prop-types"
import { motion, AnimatePresence } from "framer-motion"

import Carousel from "./Carousel"

const Modal = ({ showModal, setShowModal, modalImages }) => {
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
            <div className="card">
              <Carousel modalImages={modalImages} />
              <div>
                <button
                  className="card__button"
                  onClick={() => setShowModal(false)}
                >
                  <FontAwesomeIcon icon={faTimes} color="grey" />
                </button>
              </div>
            </div>
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
    justify-content: center;
    align-items: center;
    background-color: white;
    overflow: hidden;
  }

  .card {
    position: relative;
    z-index: 201;
  }

  .card__button {
    width: 40px;
    height: 40px;
    background: transparent;
    border: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
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
  modalImages: propTypes.array.isRequired,
}

export default Modal
