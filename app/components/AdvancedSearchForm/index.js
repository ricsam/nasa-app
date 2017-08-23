import React from 'react';

import { Alert, Button, InputGroup, InputGroupAddon, Input, Container, Row, Col } from 'reactstrap';

export default class AdvancedSearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {};
  }


  bindFormData(ev) {
    const el = ev.currentTarget;

    const key = el.getAttribute('name'),
          val = el.value;

    let ob = {};
    ob[key] = val;


    this.setState(ob, () => {
      this.props.onChange(this.state);
    });

  }

  close() {
    this.props.close(this.state); /* close and save this state to the parent */
  }


  render() {
    const Ainput = (name, index) => {
      return (
        <InputGroup key={index}>
          <InputGroupAddon>{name[0].toUpperCase() + name.replace(/\_/g, ' ').slice(1)}</InputGroupAddon>
          <Input name={name} onChange={this.bindFormData.bind(this)} value={this.state && this.state.hasOwnProperty(name) ? this.state[name] : ''} />
        </InputGroup>
      )
    };
    this.initial_render = false;
    return this.props.active ? (
      <div>
        <hr />
        <div className="clearfix">
          <h4 style={{'float': 'left'}}>Advanced</h4>
          <Button color="danger" style={{'float': 'right'}} onClick={this.close.bind(this)}>Close</Button>
        </div>
        <br />

        {this.props.formNames.map(Ainput)}
        <br />
      </div>
    ) : null;
  }

}
