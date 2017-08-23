import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const ImageTile = (key, href, onClick) => {
  return <Col
    xs="4"
    key={key}
    style={{
      height: '140px',
      width: '100%',
      'background': `url(${href}) no-repeat center top`,
      'backgroundSize':'cover'
    }}
    className="image-block"
    onClick={onClick}
  >{' '}</Col>
};

export default class ImageRows extends React.PureComponent {

  viewImageDetails(nasa_id) {
    this.props.onClick(nasa_id);
  }

  render() {

    const items = this.props.items;
    const rows = [];

    const getRowItems = (i) => {
      const sub_items = [];
      let u = 0;
      while(sub_items.length <= 2 && i + u < items.length) {

        const item = items[u + i];
        if (typeof item.links !== 'undefined' && item.links.length) {
          sub_items.push(
            ImageTile(u,
              item.links[0].href,
              this.viewImageDetails.bind(this, item.data[0].nasa_id)
            )
          );
        }

        u++;
      }

      return {sub_items, index: i + u};
    };

    let i = 0;

    while(i < items.length) {

      const {sub_items, index} = getRowItems(i);

      rows.push(<Row key={i} style={{
        padding: '0 15px'
      }}>{sub_items}</Row>);

      i = index + 1;

    }

    return <div>{rows}</div>;


  }

}
