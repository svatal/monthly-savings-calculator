import * as React from "react";
import * as d from "../data";
import * as Table from "react-bootstrap/lib/Table";
import TableHead from "./tableHead";
import TableRow from "./tableRow";
import * as Button from "react-bootstrap/lib/Button";
import * as GlyphIcon from "react-bootstrap/lib/Glyphicon";
import * as ButtonGroup from "react-bootstrap/lib/ButtonGroup";
import EditTargetModal from "./editTargetModal";

interface IProps {
  targets: d.ITarget[];
  updateTargets: (targets: d.ITarget[]) => void;
}

interface IState {
  editing?: number;
}

export default class TargetsManager extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      editing: undefined
    };
    this.updateTarget = this.updateTarget.bind(this);
    this.closeEditing = this.closeEditing.bind(this);
    this.openAddTargetDialog = this.openAddTargetDialog.bind(this);
    this.addTarget = this.addTarget.bind(this);
  }

  render() {
    return (
      <div>
        <h2>Targets</h2>
        <Table>
          {this.props.targets.length > 0 && (
            <TableHead
              columns={[
                "Name",
                { header: "Cost", width: 150 },
                { header: "In Months", width: 150 },
                { header: "", width: 100 }
              ]}
            />
          )}
          <tbody>
            {this.props.targets.map((t, i) => (
              <TableRow
                key={t.name}
                data={[
                  t.name,
                  t.cost,
                  t.inMonths,
                  <ButtonGroup>
                    <Button onClick={() => this.openEditTargetDialog(i)}>
                      <GlyphIcon glyph="pencil" />
                    </Button>
                    <Button onClick={() => this.deleteTarget(i)}>
                      <GlyphIcon glyph="trash" />
                    </Button>
                  </ButtonGroup>
                ]}
              />
            ))}
          </tbody>
          <tfoot>
            <Button onClick={this.openAddTargetDialog}>
              <GlyphIcon glyph="plus" />
            </Button>
          </tfoot>
        </Table>
        {this.state.editing >= 0 && (
          <EditTargetModal
            initialTarget={this.props.targets[this.state.editing]}
            onSave={this.updateTarget}
            onHide={this.closeEditing}
          />
        )}
        {this.state.editing === -1 && (
          <EditTargetModal
            initialTarget={{ name: "", cost: 0, inMonths: 1 }}
            onSave={this.addTarget}
            onHide={this.closeEditing}
          />
        )}
      </div>
    );
  }

  deleteTarget(idx: number) {
    this.props.updateTargets(this.props.targets.filter((_, i) => i !== idx));
  }

  openEditTargetDialog(idx: number) {
    this.setState({ editing: idx });
  }

  updateTarget(value: d.ITarget) {
    this.props.updateTargets(
      this.props.targets.map((t, i) => (i === this.state.editing ? value : t))
    );
  }

  openAddTargetDialog() {
    this.setState({ editing: -1 });
  }

  addTarget(value: d.ITarget) {
    this.props.updateTargets([...this.props.targets, value]);
  }

  closeEditing() {
    this.setState({ editing: undefined });
  }
}
