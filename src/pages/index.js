import React from "react"
import { ChromePicker } from 'react-color';

import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import TeamNode from "../components/teamNode"

var tinycolor = require('tinycolor2');
var chroma = require('chroma-js');


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

  constructor(props) {
    super(props)
    this.state = {
      secret_sauce: undefined,
      matchups: undefined,
    }
  }

  updatePageStyles(hexColor) {
    // Update background color
    document.body.style.background = hexColor;

    // Update body text color
    const dark_secondary_light = ["#212531", "#6c757d", "#f8f9fa"];
    document.body.style.color = tinycolor.mostReadable(hexColor, dark_secondary_light).toHexString();
  }

  handleChangeComplete = (color) => {
    this.setState({ secret_sauce: color.hex });
    this.updatePageStyles(this.state.secret_sauce);
  };

  getTeamNodes (region) {
    return region.edges.map(
      ({node}) => (<TeamNode team={node} key={node.id} />)
    )
  }

  render () {
    const color = this.state.secret_sauce ? this.state.secret_sauce : tinycolor.random().toHexString();

    this.updatePageStyles(color);

    return (
      <Layout>
        <ChromePicker
          color={ color }
          onChangeComplete={ this.handleChangeComplete }
        />

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
          )}
        />
      </Layout>
    )
  }
}

export default Index
