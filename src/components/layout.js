import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default ({ children }) => {
  return (
    <div className="container">
      <h1 className="pt-3"><img src="/img/hoop.gif" width="75" />
        <StaticQuery
          query={graphql`
            query {
              site {
                siteMetadata {
                  title
                }
              }
            }
          `}
          render={data => data.site.siteMetadata.title}
        />
      </h1>
      {children}
    </div>
  )
}