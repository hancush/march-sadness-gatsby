import React from "react"
import { ChromePicker } from 'react-color';

import Layout from "../components/layout"
import Bracket from "../components/bracket"

var tinycolor = require('tinycolor2');


class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      secretSauce: undefined,
    }
  }

  updatePageStyles (hexColor) {
    // Update background color
    document.body.style.background = hexColor;

    // Update body text color
    const dark_secondary_light = ["#212531", "#6c757d", "#f8f9fa"];
    document.body.style.color = tinycolor.mostReadable(hexColor, dark_secondary_light).toHexString();
  }

  handleChangeComplete = (color) => {
    this.setState({secretSauce: color.hex});
    this.updatePageStyles(this.state.secretSauce);
  };

  render () {
    const color = this.state.secretSauce ?
                  this.state.secretSauce :
                  tinycolor.random().toHexString();

    this.updatePageStyles(color);

    return (
      <Layout>
        <ChromePicker
          color={color}
          onChangeComplete={this.handleChangeComplete}
        />
        <Bracket secretSauce={this.state.secretSauce} />
      </Layout>
    )
  }
}

export default Index
