import React from "react"

import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import TeamNode from "../components/teamNode"

class Index extends React.Component {
  MATCHUPS = [
    [1, 16],
    [8, 9],
    [5, 12],
    [4, 13],
    [6, 11],
    [3, 14],
    [7, 10],
    [2, 15],
  ]

  constructor() {
    super()
    this.state = {
      secret_sauce: undefined,
      matchups: undefined,
    }
  }

  run () {
    /* TODO: Extend colorpicker from `react-color`
    https://casesandberg.github.io/react-color/#examples */
    var color = 'blue'
    this.setState({
      secret_sauce: color,
      matchups: this.MATCHUPS,
    })
    console.log(this.state);
  }

  getTeamNodes (region) {
    return region.edges.map(
      ({node}) => (<TeamNode team={node} key={node.id} />)
    )
  }

  render () {
    return (
      <Layout>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">🌈</div>
          </div>
          <input id="color-pick" type="text" className="form-control" />
        </div><br />

        <button className="btn btn-lg btn-dark float-right" id="go" onClick={() => this.run() }>
          participate socially!
        </button>

        <br />
        <br />
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
