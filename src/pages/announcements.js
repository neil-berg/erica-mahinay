import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import SEO from "../components/seo"
import Layout from "../components/layout"

const Announcements = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulAnnouncement(sort: { fields: order, order: DESC }) {
        nodes {
          id
          date
          title
          link
        }
      }
    }
  `)

  // ** Uncomment this once attachments become a thing

  // const data = useStaticQuery(graphql`
  //   {
  //     allContentfulAnnouncement(sort: { fields: order, order: DESC }) {
  //       nodes {
  //         id
  //         date
  //         title
  //         attachment {
  //           file {
  //             url
  //           }
  //         }
  //         link
  //       }
  //     }
  //   }
  // `)

  const AnnouncementsItems = data.allContentfulAnnouncement.nodes

  const renderAnnouncementsItems = AnnouncementsItems.map(item => (
    <li className="Announcements-list__item" key={item.id}>
      {item.link && (
        <a
          className="Announcements-list__item-link"
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.title}
        </a>
      )}
      {/* {item.attachment && (
        <a
          className="Announcements-list__item-link"
          href={item.attachment.file.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.title}
        </a>
      )} */}
    </li>
  ))

  return (
    <Layout>
      <SEO title="Announcements" description="Announcements for Erica Mahinay" />
      <AnnouncementsContainer>
        <h2 className="Announcements-header">Announcements</h2>
        <ul className="Announcements-list">{renderAnnouncementsItems}</ul>
      </AnnouncementsContainer>
    </Layout>
  )
}

const AnnouncementsContainer = styled.section`
  min-height: 90vh;
  padding: 1rem;
  margin-top: 2rem;

  .Announcements-header {
    max-width: 600px;
    margin: 0 auto;
    padding-bottom: 1rem;
    font-size: 1.75em;
    color: var(--gold);
  }

  .Announcements-list {
    max-width: 600px;
    margin: 0 auto;
  }

  .Announcements-list__item {
    padding-bottom: 1rem;
  }

  .Announcements-list__item-link {
    color: var(--gold);
    text-decoration: none;
  }

  @media screen and (min-width: 960px) {
    margin-left: 300px;
    margin-top: 2rem;
  }
`

export default Announcements
