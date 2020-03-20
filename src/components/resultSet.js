import React from "react"

export default props => (
  <div class="container h-80">
      <h3>{props.region}</h3>
      <div class="row align-items-center h-80">
        <div class="col mx-auto result" id="{props.region}-16"></div>
        <div class="col mx-auto result" id="{props.region}-8"></div>
        <div class="col mx-auto result" id="{props.region}-4"></div>
        <div class="col mx-auto result" id="{props.region}-2"></div>
      </div>
  </div>
)
