import { useStaticQuery, graphql } from "gatsby"

export const useExhibitions = () => {
  const { allContentfulExhibition } = useStaticQuery(graphql`
    {
      allContentfulExhibition(sort: { fields: order, order: DESC }) {
        nodes {
          title
          slug
          id
          onView
        }
      }
    }
  `)

  const onView = allContentfulExhibition.nodes.filter(
    exhibition => exhibition.onView === true
  )
  const exhibitions = allContentfulExhibition.nodes.filter(
    exhibition => exhibition.onView === false
  )
  return { onView, exhibitions }
}
