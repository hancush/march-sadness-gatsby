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
    <div className="container">
      <h1 className="pt-3"><img src="/img/hoop.gif" width="75" /> {data.site.siteMetadata.title}</h1>
      {children}
    </div>
  )
}