import React from "react"

export default props => (
  <div class="container h-80">
    <h2>
      <strong>~* the final four *~</strong>
      <small>a.k.a. who wins?</small>
    </h2>

    <div class="row align-items-center h-80">
      <div class="col mx-auto result" id="final-4"></div>
      <div class="col mx-auto result" id="final-2"></div>
      <div class="col mx-auto result text-center" id="champion"></div>
    </div>
  </div>
)
