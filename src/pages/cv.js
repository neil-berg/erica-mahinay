import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import validator from "validator"

import Layout from "../components/layout"
import SEO from "../components/seo"

const CV = () => {
  const { allContentfulCv } = useStaticQuery(graphql`
    {
      allContentfulCv(sort: { fields: order, order: ASC }) {
        nodes {
          link
          linkText
          order
          section
          text
          year
          id
        }
      }
    }
  `)

  // Transform queryied data into a new object like
  // {section: { year1: [item, item], year2: [item, item] } }
  const data = {}

  const sections = [
    "Solo Exhibitions",
    "Selected Group Exhibitions",
    "Residencies",
    "Press & Publications",
  ]

  sections.forEach(section => {
    // Extract all items for this section
    const sectionItems = allContentfulCv.nodes.filter(
      item => item.section === section
    )

    // Create sub-objects with year as the property
    // and an array of yearly items as values
    data[section] = sectionItems.reduce((acc, item) => {
      acc.hasOwnProperty(item.year)
        ? acc[item.year].push(item)
        : (acc[item.year] = [item])
      return acc
    }, {})
  })

  // Return either an internal Gatsby Link or external anchor tag
  // depending on the type of link provided for this item
  const handleItemLink = item => {
    if (item.link) {
      return validator.isURL(item.link) ? (
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          {item.linkText}
        </a>
      ) : (
        <Link to={`/${item.link}`}>{item.linkText}</Link>
      )
    }
  }

  const renderSections = Object.keys(data).map((section, i) => {
    // Extract years in descending order for each section
    const years = Object.keys(data[section]).sort((a, b) => b - a)
    // Create lists of each item per year for this section
    const yearLists = years.map((year, j) => {
      return (
        <div key={j}>
          <h3>{year}</h3>
          <ul>
            {data[section][year].map(item => (
              <li key={item.id}>
                <p>
                  {handleItemLink(item)}
                  {item.link && ", "}
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )
    })
    return (
      <div key={i}>
        <h2>{section}</h2>
        {yearLists}
      </div>
    )
  })

  return (
    <Layout>
      <SEO title="Press" description="Press articles for Erica Mahinay" />
      <Container>
        <h2>CV</h2>
        {renderSections}
      </Container>
    </Layout>
  )
}

const Container = styled.section`
  min-height: 90vh;
  padding: 1rem;
  margin-top: 2rem;

  @media screen and (min-width: 960px) {
    margin-left: 300px;
    margin-top: 2rem;
  }
`

export default CV
