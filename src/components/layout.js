import React, { useState } from "react"
import PropTypes from "prop-types"

import Header from "./header"
import SmallMenu from "./SmallMenu"
import LargeMenu from "./LargeMenu"
import Footer from "./Footer"

import "./layout.css"

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <SmallMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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
