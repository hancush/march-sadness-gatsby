import React from "react"

export default props => (
  <p style={{ color: '#' + props.team.c }}>
    {props.team.n}
  </p>
)
