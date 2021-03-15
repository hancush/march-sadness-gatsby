import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default ({ children }) => {
  return (
    <>
      <div className="container">
        <h1 className="pt-3">
          <img src="img/hoop.gif" width="75" style={{'margin-right': '15px'}} />
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
      </div><br />
      <footer align="center">
        a <a href="https://twitter.com/hancush" target="_blank">@hancush</a> tradition<br />
        <small><a href="https://github.com/hancush/march-sadness-gatsby" target="_blank">fork me on github</a></small>
      </footer><br />
    </>
  )
}