import React from "react"

export default props => (
  <div className="container h-80">
      <h3>{props.region}</h3>
      <div className="row align-items-center h-80">
        <div className="col mx-auto result" id="{props.region}-16"></div>
        <div className="col mx-auto result" id="{props.region}-8"></div>
        <div className="col mx-auto result" id="{props.region}-4"></div>
        <div className="col mx-auto result" id="{props.region}-2"></div>
      </div>
  </div>
)
