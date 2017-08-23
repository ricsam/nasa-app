/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectHomePage from './selectors';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectSearchResults,
  makeSelectAssets } from 'containers/App/selectors';

import { search, getAssets, navigate } from 'containers/App/actions';
import { setFormData } from './actions';

import SearchForm from 'components/SearchForm';
import Pagination from 'components/Pagination';
import { Container, Row, Col } from 'reactstrap';

import ImageRows from 'components/ImageRows';
import ImageDetailsModal from 'components/ImageDetailsModal'

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function




  render() {
    return (
      <div>
        <Container><Row><Col>
          <h1>
            NASA media library search
          </h1>
        </Col></Row></Container>

        {this.props.viewImage &&
          <ImageDetailsModal
            viewImage={this.props.viewImage}
          />
        }

        <SearchForm onSubmit={this.props.search} onChange={this.props.onChange} />

        <Container><Row><Col>
          <p>Loading: {this.props.loading.toString()}</p>
          <pre>
            {this.props.error &&
              this.props.error.stack
            }
          </pre>
        </Col></Row></Container>

        <Container>

          {this.props.searchResults &&
            <ImageRows onClick={this.props.getImage} items={this.props.searchResults.items} />
          }

          <Row>
            <Col>
              {this.props.searchResults && this.props.searchResults.links &&
                <Pagination navigate={this.navigatePagination.bind(this)} links={this.props.searchResults.links} total_hits={this.props.searchResults.metadata.total_hits} />
              }
            </Col>
          </Row>

        </Container>
      </div>
    );
  }

  viewImageDetails(nasa_id) {
    console.log(nasa_id);
    this.props.getAsset(nasa_id); /* bound via Redux */
  }
  navigatePagination(url) {
    this.props.navigate(url);
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  viewImage: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  searchResults: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),


  dispatch: PropTypes.func.isRequired,
  search: React.PropTypes.func,
  getImage: React.PropTypes.func,
  onChange: React.PropTypes.func,
  navigate: React.PropTypes.func,
};






function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    HomePage: makeSelectHomePage(),
    search: () => dispatch(search()),
    getImage: (nasa_id) => dispatch(getAssets(nasa_id)),
    onChange: (formData) => dispatch(setFormData(formData)),
    navigate: (URL) => dispatch(navigate(URL))
  };
}
const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  searchResults: makeSelectSearchResults(),
  viewImage: makeSelectAssets()
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
