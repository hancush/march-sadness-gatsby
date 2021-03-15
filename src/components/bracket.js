import React from "react"

import { StaticQuery, graphql } from "gatsby"

var chroma = require('chroma-js');


const getRegion = (index) => {
    if ( index <= 15 ) {
        return 'west';
    } else if ( index <= 31 ) {
        return 'east';
    } else if ( index <= 47 ) {
        return 'south';
    } else if ( index > 47 ) {
        return 'midwest';
    }
}

const Team = (props) => (
    <span style={{ color: '#' + props.object.c }}>
        {props.object.s} {props.object.n}
    </span>
)

const MatchUp = (props) => (
  <div className="matchup">
    <p>
      <Team object={props.result.winner} /> v. <Team object={props.result.loser} /><br />
      <strong>WINNER</strong>: <Team object={props.result.winner} />
    </p>
  </div>
)

const Region = (props) => (
    <div className="container h-80" id={props.region}>
        <h3>{props.region}</h3>
        <div className="row align-items-center h-80">
            <div className="col mx-auto result" id={props.region + '-16'}>
                {props.results.sweet_16.map(result => <MatchUp result={result} />)}
            </div>
            <div className="col mx-auto result" id={props.region + '-8'}>
                {props.results.elite_8.map(result => <MatchUp result={result} />)}
            </div>
            <div className="col mx-auto result" id={props.region + '-4'}>
                {props.results.final_4.map(result => <MatchUp result={result} />)}
            </div>
            <div className="col mx-auto result" id={props.region + '-2'}>
                {props.results.championship.map(result => <MatchUp result={result} />)}
            </div>
        </div>
    </div>
)

const FinalFour = (props) => (
    <div className="row align-items-center h-80">
        <div className="col mx-auto result" id="final-4">
            <MatchUp result={props.eastMidwestResult} />
            <MatchUp result={props.southWestResult} />
        </div>
        <div className="col mx-auto result" id="final-2">
            <MatchUp result={props.championshipResult} />
        </div>
        <div className="col mx-auto result text-center" id="champion">
            <div>
                <h2>
                    <strong>
                        <span role="img">🎊</span> {props.championshipResult.winner.n} <span role="img">🎊</span>
                    </strong>
                </h2>
                <h3>
                    #{props.championshipResult.winner.s} in the {getRegion(props.championshipResult.winner.sl)}<br />
                    #1 in the country<br />
                    #1 in your heart<br />
                    (for the next month)
                </h3>
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

    compareColors (team1, team2) {
        // order teams by color distance
        const colorSort = (a, b) => {
            const [colorA, colorB] = [a.c ? a.c : '000000',
                                    b.c ? b.c : '000000'];

            return chroma.distance(this.props.secretSauce, colorA) - chroma.distance(this.props.secretSauce, colorB);
        }

        return [team1, team2].sort(colorSort);
    }

    compareBPI (team1, team2) {
        // order teams by bpi ranking
        const ordered = [team1, team2].sort((a, b) => a.bpi - b.bpi);

        // return underdog one-third of the time
        if ( Math.random() <= 0.33 ) {
            return ordered.reverse();
        } else {
            return ordered;
        };
    }

    getResult (teamA, teamB) {
        const too_close_for_science = Math.abs(teamA.bpi - teamB.bpi) < 15;
        let result;

        if ( too_close_for_science ) {
            result = this.compareColors(teamA, teamB);
        } else {
            result = this.compareBPI(teamA, teamB);
        }

        return {
            winner: result[0],
            loser: result[1],
        }
    }

    reduceGroup (input) {
        const output = [];

        for (let index = 0; index < input.length; index += 2) {
            let [matchupA, matchupB] = input.slice(index, index + 2);

            var result = this.getResult(matchupA.winner, matchupB.winner);

            output.push(result);
        }

        return output;
    }

    getRegionalResult (region) {
        const results = {};
        const sweet_16 = [];

        for (const [leftSeed, rightSeed] of this.DEFAULT_MATCHUPS) {
            var result = this.getResult(
                region.find(team => team.s === leftSeed),
                region.find(team => team.s === rightSeed)
            );

            sweet_16.push(result);
        }

        results.sweet_16 = sweet_16;
        results.elite_8 = this.reduceGroup(results.sweet_16);
        results.final_4 = this.reduceGroup(results.elite_8);
        results.championship = this.reduceGroup(results.final_4);

        return results;
    }

    renderBracket (teams) {
        const west = teams.filter(team => team.sl <= 15);
        const east = teams.filter(team => team.sl > 15 & team.sl <= 31);
        const south = teams.filter(team => team.sl > 31 & team.sl <= 47);
        const midwest = teams.filter(team => team.sl > 47);

        // regional tournaments
        const eastResults = this.getRegionalResult(east);
        const westResults = this.getRegionalResult(west);
        const southResults = this.getRegionalResult(south);
        const midwestResults = this.getRegionalResult(midwest);

        // south v. west
        const southWestResult = this.getResult(
            southResults.championship[0].winner,
            westResults.championship[0].winner
        )

        // east v. midwest
        const eastMidwestResult = this.getResult(
            eastResults.championship[0].winner,
            midwestResults.championship[0].winner
        )

        // championship
        const championshipResult = this.getResult(
            southWestResult.winner,
            eastMidwestResult.winner
        )

        return (
            <div>
                <h2>
                    <strong>~* the final four *~</strong>
                    <small>a.k.a. who wins?</small>
                </h2>
                <FinalFour
                  southWestResult={southWestResult}
                  eastMidwestResult={eastMidwestResult}
                  championshipResult={championshipResult}
                />
                <hr />
                <h2>
                    <strong>everything else...</strong>
                </h2>
                <Region region='east' results={eastResults} key='east' />
                <hr />
                <Region region='west' results={westResults} key='west' />
                <hr />
                <Region region='south' results={southResults} key='south' />
                <hr />
                <Region region='midwest' results={midwestResults} key='midwest' />
            </div>
        )
    }

    render () {
        if ( this.props.secretSauce ) {
            return (
                <div className="row">
                    <StaticQuery
                        query={graphql`
                            query TeamData {
                              teams:allTeamsJson {
                                nodes {
                                  n
                                  c
                                  s
                                  sl
                                  bpi
                                  id
                                }
                              }
                            }
                          `}
                        render={data => this.renderBracket(data.teams.nodes)}
                    />
                </div>
            )
        }
        return null;
    }
}

export default Bracket
