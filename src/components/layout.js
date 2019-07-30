import React, { useState } from "react"
import PropTypes from "prop-types"

import SmallMenu from "./SmallMenu"
import LargeMenu from "./LargeMenu"
import Footer from "./Footer"

import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <SmallMenu />
      <LargeMenu />
      <main>{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
