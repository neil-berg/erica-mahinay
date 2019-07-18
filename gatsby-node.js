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
          location
          date
          gallery
        }
      }
      allContentfulBlogPost {
        nodes {
          slug
          title
        }
      }
    }
  `)

  const exhibitions = data.allContentfulExhibition.nodes
  const posts = data.allContentfulBlogPost.nodes

  // Create pages for each exhibition
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
        location: exhibition.location,
        date: exhibition.date,
        gallery: exhibition.gallery,
        pressRelease: exhibition.pressRelease.file.url,
        previous,
        next,
      },
    })
  })

  // Create pages for each blog post
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]

    actions.createPage({
      path: `/thoughts/${post.slug}`,
      component: path.resolve(`./src/templates/post-template.js`),
      context: {
        slug: post.slug,
        title: post.title,
        previous,
        next,
      },
    })
  })
}
