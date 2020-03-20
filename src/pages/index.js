import React from "react"

import { StaticQuery, graphql } from "gatsby"

import FinalResult from "../components/finalResult"
import Layout from "../components/layout"
import ResultSet from "../components/resultSet"


class AaronCarter extends React.Component {
  constructor () {
    super()
    this.state = {
/*      east: graphql`query {
/*          allTeamsJson(filter: {sl: {lte: 15}}) {
/*            edges {
/*              node {
/*                bpi
/*                c
/*                n
/*              }
/*            }
/*          }
/*        }
/*      `,
      south: [],
      west: graphql`query {
          allTeamsJson(filter: {sl: {gt: 31, lte: 47}}) {
            edges {
              node {
                bpi
                c
                n
              }
            }
          }
        }
      `,
      midwest: graphql`query {
          allTeamsJson(filter: {sl: {gt: 47}}) {
            edges {
              node {
                bpi
                c
                n
              }
            }
          }
        }
      `,*/
      matchups: undefined,
      secret_sauce: undefined
    }
  }

  getTeamList (data) {
    const teamArray = []
    data.allTeamsJson.edges.forEach(
      item => teamArray.push(<p>{item.node.n}, {item.node.c}</p>)
    )
    console.log(teamArray)
    return teamArray
  }

  render () {
    return (
      <Layout>
        <div class="row">
          <div class="col">
            <p class="lead">if u love ur friends but hate basketball, let the computer do your bracket for you.</p>

            <p>two-thirds of the time, it returns the better team as measured by power index ranking. one-third of the time it returns the underdog. for teams within 15 spots of one another (in terms of bpi ranking), it returns whichever team has the color closest to your fave!</p>

            <p>speaking of, pick yr color now. 👇</p>

            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">🌈</div>
              </div>
              <input id="color-pick" type="text" class="form-control" />
            </div><br />

            <button class="btn btn-lg btn-dark float-right" id="go">
              participate socially!
            </button>
          </div>
        </div>

        <div class="clear-fix">&nbsp;</div>

        <div id="the-good-stuff" class="row">

          <FinalResult />

          <hr />

          <div class="container">
            <h2><strong>everything else...</strong></h2>
          </div>

          <StaticQuery
            query={graphql`query {
                allTeamsJson(filter: {sl: {gt: 15, lte: 31}}) {
                  edges {
                    node {
                      bpi
                      c
                      n
                    }
                  }
                }
              }
            `}
            render={
              data => {this.getTeamList(data)}
            }
          />

          <ResultSet region="south" />

          <hr />

          <ResultSet region="west" />

          <hr />

          <ResultSet region="east" />

          <hr />

          <ResultSet region="midwest" />

        </div>

        <div class="footer text-center text-muted">
          a <a href="https://twitter.com/hancush">@hancush</a> production. ✨<br />
          <a href="https://github.com/hancush/march-sadness">fork me on github</a>.
        </div>
      </Layout>
    )
  }
}

export default AaronCarter
