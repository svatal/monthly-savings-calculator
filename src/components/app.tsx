import * as React from "react";
import * as d from "../data";
import * as p from "../processor";
import TargetsManager from "./targetsManager";
import ResultsViewer from "./resultsViewer";
import * as Grid from "react-bootstrap/lib/Grid";
import * as Row from "react-bootstrap/lib/Row";

interface IState {
  targets: d.ITarget[];
  savings: d.IMonthlySavings[];
}

export default class App extends React.Component<{}, IState> {
  constructor() {
    super({});
    this.updateTargets = this.updateTargets.bind(this);
    this.state = {
      targets: [
        { cost: 10, inMonths: 2, name: "test" },
        { cost: 1, inMonths: 3, name: "test2" }
      ],
      savings: [
        { value: 5, fromMonth: 1, tillMonth: 2 },
        { value: 1, fromMonth: 3, tillMonth: 3 }
      ]
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
        </Row>
      </Grid>
    );
  }

  updateTargets(targets: d.ITarget[]) {
    let consolidated = p.consolidate(targets);
    let savings = p.calculateSavingsNeeded(consolidated);
    this.setState({ targets, savings });
  }
}
