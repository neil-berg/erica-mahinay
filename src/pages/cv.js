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
        <a
          className="list__item-link"
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.linkText}
        </a>
      ) : (
        <Link className="list__item-link" to={`/${item.link}`}>
          {item.linkText}
        </Link>
      )
    }
  }

  const renderSections = Object.keys(data).map((section, i) => {
    // Extract years in descending order for each section
    const years = Object.keys(data[section]).sort((a, b) => b - a)
    // Create lists of each item per year for this section
    const yearLists = years.map((year, j) => {
      return (
        <div className="list-container" key={j}>
          <h3 className="list__header">{year}</h3>
          <ul className="list">
            {data[section][year].map(item => (
              <li className="list__item" key={item.id}>
                <p className="list__item-text">
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
      <section className="section" key={i}>
        <h2 className="section__header">{section}</h2>
        {yearLists}
      </section>
    )
  })

  return (
    <Layout>
      <SEO title="CV" description="Press articles for Erica Mahinay" />
      <Container>
        <section className="section">
          <h2 className="section__header">Education</h2>
          <div className="list-container">
            <h3 className="list__header">2013</h3>
            <ul className="list">
              <li className="list__item">
                <p className="list__item-text">Cranbrook Academy of Art, MFA</p>
              </li>
            </ul>
            <h3 className="list__header">2008</h3>
            <ul className="list">
              <li className="list__item">
                <p className="list__item-text">
                  Kansas City Art Institute, BFA
                </p>
              </li>
            </ul>
          </div>
        </section>
        {renderSections}
      </Container>
    </Layout>
  )
}

const Container = styled.article`
  min-height: 90vh;
  padding: 1rem;
  margin-top: 2rem;
  color: var(--gold);

  .section {
    max-width: 600px;
    margin: 0 auto 2rem auto;
  }

  .section__header {
    font-size: 1.3em;
    font-weight: 200;
    margin-bottom: 0.5rem;
  }

  .list-container {
    margin-bottom: 1rem;
  }

  .list__header {
    font-size: 1em;
    padding-bottom: 0.25rem;
  }

  .list__item {
    line-height: 1.3em;
    padding-bottom: 0.5rem;
    font-weight: 200;
  }

  .list__item-link {
    color: inherit;
    text-decoration: none;
    padding-bottom: 1px;
    border-bottom: 1px var(--gold) solid;
    transition: all 0.2s ease-out;
  }

  .list__item-link:active,
  .list__item-link:visited {
    color: var(--gold);
  }

  @media (hover: hover) {
    .list__item-link:hover {
      color: var(--pink);
      border-bottom: 1px var(--pink) solid;
    }
  }

  @media screen and (min-width: 960px) {
    margin-left: 300px;
    margin-top: 1rem;
  }
`

export default CV
