import { useStaticQuery, graphql } from "gatsby"

export const useOnView = () => {
  const { allContentfulOnView } = useStaticQuery(graphql`
    {
      allContentfulOnView(sort: { fields: order, order: DESC }, limit: 2) {
        nodes {
          id
          title
          link
        }
      }
    }
  `)
  return allContentfulOnView.nodes
}
