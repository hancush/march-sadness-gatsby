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
    if (typeof document !== `undefined`) {
      // Update background color
      document.body.style.background = hexColor;

      // Update body text color
      const dark_secondary_light = ["#212531", "#6c757d", "#f8f9fa"];
      document.body.style.color = tinycolor.mostReadable(hexColor, dark_secondary_light).toHexString();
    }
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
        <p className="lead">if u love yr friends but hate basketball, let the computer do your bracket for you.</p>

        <marquee>
          <h2><span role="img">🔥</span> updated for 2021 <span role="img">🔥</span></h2>
        </marquee>

        <p>two-thirds of the time, it returns the better team as measured by power index ranking. one-third of the time it returns the underdog. for teams within 15 spots of one another (in terms of bpi ranking), it returns whichever team has the color closest to your fave!</p>

        <p class="text-center">
          speaking of, pick yr color now. <span role="img">👇</span>
        </p>

        <center>
          <ChromePicker
            color={color}
            onChangeComplete={this.handleChangeComplete}
            disableAlpha={true}
          />
        </center><br />

        <Bracket secretSauce={this.state.secretSauce} />
      </Layout>
    )
  }
}

export default Index
