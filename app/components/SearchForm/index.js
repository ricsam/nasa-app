import React from 'react';

import AdvancedSearchForm from 'components/AdvancedSearchForm';
import { Alert, Button, InputGroup, InputGroupAddon, Input, Container, Row, Col } from 'reactstrap';


export default class SearchForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      advanced: false,
    };


    ['toggleAdvancedOptions', 'setQ', 'search', 'advancedOptionsClosed']
      .forEach(method => this[method] = this[method].bind(this));

    this.formParams = {};

    /*
      props:
        onChange -> save the formData to homePage state,
        onSubmit -> make remote request by dispatching App action
    */

  }
  render() {
    return (
      <div>
      <Container>
        <Row>
          <Col>

            <InputGroup>
              <InputGroupAddon>Search for NASA Media</InputGroupAddon>
              <Input placeholder="Search term..." onChange={this.setQ}/>
            </InputGroup>
            <br />
            {/* if this.state.advanced === true */}

            <AdvancedSearchForm
              formNames={["center",
                "description",
                "description_508",
                "keywords",
                "location",
                "media_type",
                "nasa_id",
                "photographer",
                "secondary_creator",
                "title",
                "year_start",
                "year_end"
              ]}
              active={this.state.advanced}
              onChange={this.mergeFormsOnChange.bind(this)}
              close={this.advancedOptionsClosed}
              />

            <Button color="primary" onClick={this.props.onSubmit}>Search</Button>{' '}

            {/* if this.state.advanced === true */}
            { !this.state.advanced &&
              <Button color="info" onClick={this.toggleAdvancedOptions}>Advanced Search Options</Button>
            }
          </Col>
        </Row>
      </Container>


      </div>
    );
  }

  advancedOptionsClosed(formData) /* save latest form data for later retrieval */ {
    this.last_advanded_form_data = Object.assign({}, formData);
    this.toggleAdvancedOptions();
  }

  mergeFormsOnChange(formData) {

    Object.assign(this.formParams, formData);
    this.props.onChange(this.formParams);
  }

  toggleAdvancedOptions() {
    if (this.state.advanced) {
      this.formParams = {q: this.formParams.q} /* only save the q params if the advanced options are closed */
    } else {
      if (this.last_advanded_form_data) {
        this.mergeFormsOnChange(this.last_advanded_form_data);
      }
    }

    this.props.onChange(this.formParams);
    this.setState(prevState => ({
      advanced: !prevState.advanced
    }));
  }

  setQ(ev) {
    const value = ev.currentTarget.value;
    this.formParams['q'] = value;
    this.props.onChange(this.formParams);
  }

  search(ev) {
    this.props.OnFormSubmited(this.formParams);
  }
}

