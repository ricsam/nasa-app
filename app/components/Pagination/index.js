import React from 'react';

import AdvancedSearchForm from 'components/AdvancedSearchForm';
import { Container, Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';


export default class SearchForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
 /* max pagination items back, forward, 1-6 or 1-5 + ...(last) */

  getCurrentPage() {

    if (this.props.links.length === 0) return 1; /* on the first one and only page */

    /* there is a previous and a next page available*/
    /* test the first in the list */
    const reg_test = this.props.links[0].href.match(/page\=(\d+)/)

    if (reg_test === null || reg_test.length === 1) return false; /* something wrong */

    let adjacent_page_number = Number(reg_test[1]);

    switch (this.props.links[0].rel) {
      case 'next':
        return adjacent_page_number-1;
        break;
      case 'prev':
        return adjacent_page_number+1;
        break;
      default:
        return false; /* something is wrong,...*/
    }
  }

  getLastPage() {
    return Math.floor(this.props.total_hits / 100); /* 100 results / page */
  }

  getURL(pageNumber) {
    return this.props.links[0].href.replace(/page\=(\d+)/, 'page=' + pageNumber);
  }

  navigate(pageNumber, ev) {
    if ( pageNumber < 1) return ev.preventDefault();
    this.props.navigate(this.getURL(pageNumber));
  }

  render() {
    const current_page = this.getCurrentPage(),
          last_page = this.getLastPage();


    const pagination = [];

    const appendPagination = (pageNumber, active, disabled) => {
      pagination.push(
        <PaginationItem active={active} disabled={disabled} key={pagination.length}>
          <PaginationLink href="#" onClick={this.navigate.bind(this, pageNumber)}>
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      );
    };

    pagination[0] = (
      <PaginationItem key={0} disabled={current_page===1} >
        <PaginationLink previous href="#" onClick={this.navigate.bind(this, current_page - 1)} />
      </PaginationItem>
    );

    if (current_page <= 3) { /* on first page */
      for (let i = 1; i <= 5; i++) {
        appendPagination(i, current_page === i, false)
      }
    } else { /* render two on every side of the midle active pagination item */

      appendPagination(1, false, false);

      let min = Math.max(current_page - 2, 1);
      const max = Math.min(current_page + 2, last_page);

      // debugger;

      for (let i = min; i <= max; i++) {
        appendPagination(i, current_page === i, false);
      }
    }

    if (last_page >= current_page + 3 ) { /* if the last_page is far away */
      appendPagination(last_page, false, false);
    }

    pagination.push(
      <PaginationItem disabled={current_page===last_page} key={pagination.length} >
        <PaginationLink next href="#" onClick={this.navigate.bind(this, current_page + 1)} />
      </PaginationItem>
    );




    return (
    <Container>
      <Row>
        <Col>
          <br />
          {this.props.total_hits} Results
          <Pagination>
            {pagination}
          </Pagination>
        </Col>
      </Row>
    </Container>
  )}




}

