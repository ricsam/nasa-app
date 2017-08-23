import React from 'react';

import * as screenfull from 'screenfull';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Map, is} from 'immutable';

export default class ImageDetailsModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      viewMetaData: false,
      dropdownOpen: false,
      selectedImage: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleViewMetaData = this.toggleViewMetaData.bind(this);
    this.toggleDropdownOpen = this.toggleDropdownOpen.bind(this);

    if (screenfull.enabled) {
      screenfull.on('change', () => {
        if ( ! screenfull.isFullscreen ) {
          document.getElementById('bg-fullscreen-image').style.display = 'none';
        }
      });
    }
  }
  selectImageInModal(href, ev) {
    console.log(href);
    this.setState({
      selectedImage: href
    });
  }
  stripURLFromImageLink(url) {
    if ( ! url ) return false;
    return url.replace(/^(.*\~)/, '');
  }

  viewImageInFullscreen(ev) {
    if ( ! this.state.selectedImage ) return ev.preventDefault();
    console.log('will view ' + this.state.selectedImage);

    const id = 'bg-fullscreen-image',
      img_exists = !!document.getElementById(id),
      img = !!img_exists ?
           document.getElementById(id)
        :  document.createElement('div');

    img.id = id;
    img.style.background = `url(${this.state.selectedImage}) center center / contain no-repeat`;
    img.style.display = 'block';
    img.style.width = img.style.height = '100%';
    if ( ! img_exists ) {
      document.body.appendChild(img);
      img.addEventListener('click', () => {
        screenfull.exit();
      });
    }
    if (screenfull.enabled) {
      screenfull.request(img);
    }
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  toggleViewMetaData() {
    this.setState({
      viewMetaData: !this.state.viewMetaData
    });
  }
  toggleDropdownOpen() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      ! this.props.viewImage
      || is(Map(nextProps.viewImage), Map(this.props.viewImage))
    ) return;

    this.setState({
      modal: true,
      dropdownOpen: false,
      selectedImage: false
    });
  }

  render() {
    return (

      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
        <ModalBody>



          <ul>
            {this.props.viewImage.items.map((href, index) => {
              return (
                <li key={index}>
                  <a href={href} target="_blank">
                    {this.stripURLFromImageLink(href)}
                  </a>
                </li>
              );
            })}
          </ul>
          {this.state.viewMetaData &&
            <pre>
              {JSON.stringify(this.props.viewImage.metadata, true, 2)}
            </pre>
          }
        </ModalBody>
        <ModalFooter>
          <Container>
            <Row style={{'marginBottom': '5px'}}>
              <Col>
                <ButtonGroup>
                  <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdownOpen}>
                    <DropdownToggle caret>
                      {this.stripURLFromImageLink(this.state.selectedImage) || 'Select image...'}
                    </DropdownToggle>
                    <DropdownMenu>
                      {this.props.viewImage.items.map((href, index) => {
                        return (
                          <DropdownItem
                              key={index}
                              onClick={this.selectImageInModal.bind(this, href)}>
                            {this.stripURLFromImageLink(href)}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </ButtonDropdown>
                  <Button disabled={!this.state.selectedImage} onClick={this.viewImageInFullscreen.bind(this)}>View in fullscreen</Button>
                </ButtonGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <ButtonGroup>
                  <Button
                      color={this.state.viewMetaData ? "danger" : "info"}
                      onClick={this.toggleViewMetaData}>

                    {this.state.viewMetaData ? 'Close' : 'View'} metadata
                  </Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Close</Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Container>
        </ModalFooter>
      </Modal>
    );
  }
}

