import * as React from "react";
import * as d from "../data";
import * as Modal from "react-bootstrap/lib/Modal";
import * as Button from "react-bootstrap/lib/Button";
import * as Form from "react-bootstrap/lib/Form";
import * as FormGroup from "react-bootstrap/lib/FormGroup";
import * as Col from "react-bootstrap/lib/Col";
import * as FormControl from "react-bootstrap/lib/FormControl";
import * as ControlLabel from "react-bootstrap/lib/ControlLabel";
import * as HelpBlock from "react-bootstrap/lib/HelpBlock";

interface IProps {
  initialTarget: d.ITarget;
  onSave: (target: d.ITarget) => void;
  onHide: () => void;
}

interface IState {
  name: string;
  cost: string;
  inMonths: string;
}

export default class EditTargetModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: props.initialTarget.name,
      cost: props.initialTarget.cost.toString(),
      inMonths: props.initialTarget.inMonths.toString()
    };
    this.setName = this.setName.bind(this);
    this.setCost = this.setCost.bind(this);
    this.setMonths = this.setMonths.bind(this);
    this.saveAndHide = this.saveAndHide.bind(this);
  }

  render() {
    return (
      <Modal show={true} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit target</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <FormGroup controlId="name" validationState={this.validateName()}>
              <Col componentClass={ControlLabel} sm={2}>
                Name
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  value={this.state.name}
                  onChange={this.setName}
                  autoFocus
                />
                <FormControl.Feedback />
                <HelpBlock>Should be non-empty.</HelpBlock>
              </Col>
            </FormGroup>
            <FormGroup controlId="cost" validationState={this.validateCost()}>
              <Col componentClass={ControlLabel} sm={2}>
                Cost
              </Col>
              <Col sm={10}>
                <FormControl
                  type="number"
                  value={this.state.cost}
                  onChange={this.setCost}
                />
                <FormControl.Feedback />
                <HelpBlock>Should be positive.</HelpBlock>
              </Col>
            </FormGroup>
            <FormGroup
              controlId="months"
              validationState={this.validateMonths()}
            >
              <Col componentClass={ControlLabel} sm={2}>
                In months
              </Col>
              <Col sm={10}>
                <FormControl
                  type="number"
                  value={this.state.inMonths}
                  onChange={this.setMonths}
                />
                <FormControl.Feedback />
                <HelpBlock>Should be positive whole number.</HelpBlock>
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={this.saveAndHide}
            bsStyle="primary"
            disabled={
              this.validateName() !== "success" ||
              this.validateCost() !== "success" ||
              this.validateMonths() !== "success"
            }
          >
            Save
          </Button>
          <Button onClick={this.props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  setName(e: React.FormEvent<FormControl & HTMLInputElement>) {
    this.setState({ name: e.currentTarget.value });
  }

  setCost(e: React.FormEvent<FormControl & HTMLInputElement>) {
    this.setState({ cost: e.currentTarget.value });
  }

  setMonths(e: React.FormEvent<FormControl & HTMLInputElement>) {
    this.setState({ inMonths: e.currentTarget.value });
  }

  validateName() {
    return this.state.name.length === 0 ? "error" : "success";
  }

  validateCost() {
    return this.isNumeric(this.state.cost) && +this.state.cost > 0
      ? "success"
      : "error";
  }

  validateMonths() {
    const months = +this.state.inMonths;
    return this.isNumeric(this.state.inMonths) &&
      months > 0 &&
      Math.floor(months) === months
      ? "success"
      : "error";
  }

  saveAndHide() {
    this.props.onSave({
      name: this.state.name,
      cost: +this.state.cost,
      inMonths: +this.state.inMonths
    });
    this.props.onHide();
  }

  isNumeric(n: string) {
    return !isNaN(parseFloat(n)) && isFinite(+n);
  }
}
