import { useStaticQuery, graphql } from "gatsby"

export const useExhibitions = () => {
  const { allContentfulExhibition } = useStaticQuery(graphql`
    {
      allContentfulExhibition(sort: { fields: order, order: ASC }) {
        nodes {
          title
          slug
        }
      }
    }
  `)
  return allContentfulExhibition.nodes
}
