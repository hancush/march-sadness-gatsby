import React from "react"

import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import TeamNode from "../components/teamNode"

class Index extends React.Component {
  constructor() {
    super()
  }

  getTeamNodes (region) {
    return region.edges.map(
      ({node}) => (<TeamNode team={node} key={node.id} />)
    )
  }

  render () {
    return (
      <Layout>
        <StaticQuery
        query={graphql`
          query TeamData {
            east: allTeamsJson(filter: {sl: {lte: 15}}) {
              edges {
                node {
                  n
                  c
                  s
                  bpi
                  id
                }
              }
            }
            west: allTeamsJson(filter: {sl: {gt: 15, lte: 31}}) {
              edges {
                node {
                  n
                  c
                  s
                  bpi
                  id
                }
              }
            }
            south: allTeamsJson(filter: {sl: {gt: 31, lte: 47}}) {
              edges {
                node {
                  n
                  c
                  s
                  bpi
                  id
                }
              }
            }
            midwest: allTeamsJson(filter: {sl: {gt: 47}}) {
              edges {
                node {
                  n
                  c
                  s
                  bpi
                  id
                }
              }
            }
          }
        `}
        render={data => (
          Object.values(data).map(region =>
            this.getTeamNodes(region)
          )
        )} />
      </Layout>
    )
  }
}

export default Index
