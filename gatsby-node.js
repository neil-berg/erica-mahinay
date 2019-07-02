const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    {
      allContentfulExhibition(sort: { fields: order, order: ASC }) {
        nodes {
          title
          slug
          pressRelease {
            file {
              url
            }
          }
        }
      }
    }
  `)

  const exhibitions = data.allContentfulExhibition.nodes

  exhibitions.forEach((exhibition, index) => {
    const previous =
      index === exhibitions.length - 1 ? null : exhibitions[index + 1]

    const next = index === 0 ? null : exhibitions[index - 1]

    actions.createPage({
      path: exhibition.slug,
      component: path.resolve(`./src/templates/exhibition-template.js`),
      context: {
        slug: exhibition.slug,
        exhibitionTitle: exhibition.title,
        pressRelease: exhibition.pressRelease.file.url,
        previous,
        next,
      },
    })
  })
}
