import React from "react"

import { StaticQuery, graphql } from "gatsby"

var chroma = require('chroma-js');


const Team = (props) => (
    <span style={{ color: '#' + props.object.c }}>
        {props.object.s} {props.object.n}
    </span>
)

const MatchUp = (props) => (
  <div className="matchup">
    <p>
      <Team object={props.result.winner.node} /> v. <Team object={props.result.loser.node} /><br />
      <strong>WINNER</strong>: <Team object={props.result.winner.node} />
    </p>
  </div>
)

const Region = (props) => (
    <div className="container h-80" id={props.region}>
        <h3>{props.region}</h3>
        <div className="row align-items-center h-80">
            <div className="col mx-auto result" id={props.region + '-16'}>
                {props.results.sweet_16.map(
                  (result) => (<MatchUp result={result} />)
                )}
            </div>
            <div className="col mx-auto result" id={props.region + '-8'}>
                {props.results.elite_8.map(
                  (result) => (<MatchUp result={result} />)
                )}
            </div>
            <div className="col mx-auto result" id={props.region + '-4'}>
                {props.results.final_4.map(
                  (result) => (<MatchUp result={result} />)
                )}
            </div>
            <div className="col mx-auto result" id={props.region + '-2'}>
                {props.results.championship.map(
                  (result) => (<MatchUp result={result} />)
                )}
            </div>
        </div>
    </div>
)

class Bracket extends React.Component {
    DEFAULT_MATCHUPS = [
        [1, 16],
        [8, 9],
        [5, 12],
        [4, 13],
        [6, 11],
        [3, 14],
        [7, 10],
        [2, 15],
    ]

    constructor (props) {
        super(props)
        this.state = {
            regional_winners: {}
        }
    }

    compare_colors (base_color, team1, team2) {
        function color_sort(a, b) {
            var color_a = a.c ? a.c : '000000';
            var color_b = a.c ? a.c : '000000';

            return chroma.distance(base_color, color_a) - chroma.distance(base_color, color_b);
        }

        // order teams by color distance
        var ordered = [team1, team2].sort(color_sort);

        return {
            winner: ordered[0],
            loser: ordered[1],
        }
    }

    compare_bpi (team1, team2) {
        // order teams by bpi ranking
        var ordered = [team1, team2].sort(function(a, b) { return a.bpi - b.bpi });

        // return underdog a quarter of the time
        var underdog = Math.random() <= 0.33;

        if ( underdog ) {
            return {
                winner: ordered[1],
                loser: ordered[0],
            }
        } else {
            return {
                winner: ordered[0],
                loser: ordered[1],
            }
        };
    }

    getResult (teamA, teamB) {
        let too_close_for_science = Math.abs(teamA.bpi - teamB.bpi) < 15;

        if ( too_close_for_science ) {
            return this.compare_colors(this.props.secretSauce, teamA, teamB);
        } else {
            return this.compare_bpi(teamA, teamB);
        }
    }

    getSeedFromRegion (region, seed) {
        return region.edges.filter((team) => team.node.s === seed)[0];
    }

    renderRegions (regions) {
        let self = this;

        const regional_winners = {}

        let rendered = Object.entries(regions).map(function(entry) {
            let [region, teams] = entry;

            const results = {
                sweet_16: [],
                elite_8: [],
                final_4: [],
                championship: [],
            };

            self.DEFAULT_MATCHUPS.forEach((matchup) => (
                results.sweet_16.push(
                    self.getResult(
                        self.getSeedFromRegion(teams, matchup[0]),
                        self.getSeedFromRegion(teams, matchup[1])
                    )
                )
            ));

            // TODO: Refactor this.
            for ( let i = 0; i < results.sweet_16.length; i += 2 ) {
                let [matchupA, matchupB] = results.sweet_16.slice(i, i + 2);
                results.elite_8.push(
                    self.getResult(matchupA.winner, matchupB.winner)
                );
            };

            for ( let i = 0; i < results.elite_8.length; i += 2 ) {
                let [matchupA, matchupB] = results.elite_8.slice(i, i + 2);
                results.final_4.push(
                    self.getResult(matchupA.winner, matchupB.winner)
                );
            };

            for ( let i = 0; i < results.final_4.length; i += 2 ) {
                let [matchupA, matchupB] = results.final_4.slice(i, i + 2);
                results.championship.push(
                    self.getResult(matchupA.winner, matchupB.winner)
                );
            };

            regional_winners[region] = results.championship.winner;

            return (
                <Region name={region} results={results} />
            )
        });

        // TODO: Why is this erroring out?
        // Error: Maximum update depth exceeded. This can happen when a component
        // repeatedly calls setState inside componentWillUpdate or componentDidUpdate.
        // React limits the number of nested updates to prevent infinite loops.
        // this.setState({regional_winners: regional_winners});

        console.log(this.state);

        return rendered;
    }

    render () {
        return (
            <div className="row">
                <h1>Secret sauce: {this.props.secretSauce}</h1>
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
                    render={data => this.renderRegions(data)}
                />
            </div>
        )
    }
}

export default Bracket
