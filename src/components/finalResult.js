import React from "react"

export default props => (
  <div className="container h-80">
    <h2>
      <strong>~* the final four *~</strong>
      <small>a.k.a. who wins?</small>
    </h2>

    <div className="row align-items-center h-80">
      <div className="col mx-auto result" id="final-4"></div>
      <div className="col mx-auto result" id="final-2"></div>
      <div className="col mx-auto result text-center" id="champion"></div>
    </div>
  </div>
)
