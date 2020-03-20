import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <div class="container">
      <h1 class="pt-3"><img src="/img/hoop.gif" width="75" /> {data.site.siteMetadata.title}</h1>
      {children}
    </div>
  )
}