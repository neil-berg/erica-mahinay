import { useStaticQuery, graphql } from "gatsby"

export const useExhibitions = () => {
  const { allContentfulExhibition } = useStaticQuery(graphql`
    {
      allContentfulExhibition(sort: { fields: order, order: DESC }, limit: 5) {
        nodes {
          title
          slug
          id
        }
      }
    }
  `)
  return allContentfulExhibition.nodes
}
