import * as React from "react";
import * as d from "../data";
import * as p from "../processor";
import TargetsManager from "./targetsManager";
import ResultsViewer from "./resultsViewer";
import Milestones from "./milestones";
import * as Grid from "react-bootstrap/lib/Grid";
import * as Row from "react-bootstrap/lib/Row";

interface IState {
  targets: d.ITarget[];
  consolidatedTargets: d.ITarget[];
  savings: d.IMonthlySavings[];
}

export default class App extends React.Component<{}, IState> {
  constructor() {
    super({});
    this.updateTargets = this.updateTargets.bind(this);
    this.state = {
      targets: [],
      consolidatedTargets: [],
      savings: []
    };
  }

  render() {
    return (
      <Grid>
        <Row>
          <h1>Monthly Savings Calculator</h1>
        </Row>
        <Row>
          <TargetsManager
            targets={this.state.targets}
            updateTargets={this.updateTargets}
          />
        </Row>
        <Row>
          <ResultsViewer savings={this.state.savings} />
          <Milestones
            consolidatedTargets={this.state.consolidatedTargets}
            savings={this.state.savings}
          />
        </Row>
      </Grid>
    );
  }

  updateTargets(targets: d.ITarget[]) {
    let consolidatedTargets = p.consolidate(targets);
    let savings = p.calculateSavingsNeeded(consolidatedTargets);
    this.setState({ targets, consolidatedTargets, savings });
  }
}
