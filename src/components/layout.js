import React from "react"
import PropTypes from "prop-types"

import Sidebar from "./Sidebar"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
      <footer>
        site by
        <a href="https://neilberg.dev">neil berg</a>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
