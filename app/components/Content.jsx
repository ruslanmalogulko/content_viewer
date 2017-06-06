import React, { PropTypes, Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { Glyphicon, Grid, Row, Col, Accordion, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { invalidateData, fetchDataIfNeeded } from '../actions';

class Post extends Component {

    constructor(props) {
        super(props);
        const {data, params: {index}, location: {query: {collapsed}}} = this.props;
        const collapsedItems = collapsed && collapsed.split(',') || [];

        this.onSelect = this.onSelect.bind(this);
        this.state = {
            collapsedItems: collapsedItems
        };
    }

  componentDidMount() {
    const { dispatch, params: {menu, tab} } = this.props;
    dispatch(fetchDataIfNeeded(menu, tab));
  }

  componentDidUpdate(prevProps) {
    const { data, dispatch, params: {menu, tab}, location: {query: {collapsed}} } = this.props;
    const collapsedItems = collapsed && collapsed.split(',') || [];
    if (this.state.collapsedItems.length !== collapsedItems.length) {
        this.setState({collapsedItems: collapsedItems});
    }
    if (data.menu !== menu || data.tab !== tab) {
        dispatch(invalidateData());
    }
    dispatch(fetchDataIfNeeded(menu, tab));
  }

  hideTarget(e) {
    e.target.style.display = 'none';
  }

  onSelect(index) {
      const {location} = this.props;
      const {collapsedItems} = this.state;

      let uniqCollapsedItems = collapsedItems.filter((item, index) => {
          return collapsedItems.indexOf(item) === index;
      });

      if (uniqCollapsedItems.indexOf(index) > -1) {
          uniqCollapsedItems.splice(uniqCollapsedItems.indexOf(index), 1);
      } else {
          uniqCollapsedItems.push(index);
      }

      let sortedUniqCollapsedItems = uniqCollapsedItems.sort((prev, next) => {
          return (+prev - (+next));
      });

      // save to state and browserHisotry api
      Object.assign(location.query, {collapsed: sortedUniqCollapsedItems.toString()});
      browserHistory.push(location);
      this.setState({collapsedItems: sortedUniqCollapsedItems});
  }

  render() {
    const {data, isFetching, params: {index, menu}} = this.props;
    const {collapsedItems} = this.state;
    let items = [
        {
            data: data['1'],
            header: 'Shipping'
        },
        {
            data: data['2'],
            header: 'Billing'
        },
        {
            data: data['3'],
            header: 'Home'
        }
    ];
    const sectionItems = items.map((item, index) => {
        let contentIndex = (index + 1).toString();
        let expanded = collapsedItems.indexOf(contentIndex) === -1;
        return (
            <Panel collapsible key={index} onSelect={() => {this.onSelect(contentIndex)}} expanded={expanded} header={item.header} eventKey={index} >
                {item.data}
            </Panel>
        );
    });

    return (
      <div className="main-content-wrapper">
        <Grid>
          <Row xs={12} mdOffset={2} md={8}>
            <Col xs={12} mdOffset={4} md={8}>
                <ul className="nav nav-tabs">
                    <li className="nav-item" role="presentation">
                        <Link to={`/${menu}/general`}
                              className="nav-link"
                              query={collapsedItems.length && Object.assign({}, {collapsed: collapsedItems.toString()})}
                              activeClassName="active">General</Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to={`/${menu}/adresses`}
                              className="nav-link"
                              query={collapsedItems.length && Object.assign({}, {collapsed: collapsedItems.toString()})}
                              activeClassName="active">Addresses</Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to={`/${menu}/orders`}
                              className="nav-link"
                              query={collapsedItems.length && Object.assign({}, {collapsed: collapsedItems.toString()})}
                              activeClassName="active">Orders</Link>
                    </li>
                </ul>
            </Col>
          </Row>
          <Row xs={12} mdOffset={2} md={8}>
              <Col xs={12} md={4}>
                  <ul className="nav nav-pills nav-columns">
                      <li role="presentation" className="nav-item">
                          <Link to='/products'
                                query={collapsedItems.length && Object.assign({}, {collapsed: collapsedItems.toString()})}
                                activeClassName="active">Products</Link>
                      </li>
                      <li role="presentation" className="nav-item">
                          <Link to='/customers'
                                query={collapsedItems.length && Object.assign({}, {collapsed: collapsedItems.toString()})}
                                activeClassName="active">Customers</Link>
                      </li>
                      <li role="presentation" className="nav-item">
                          <Link to='/orders'
                                query={collapsedItems.length && Object.assign({}, {collapsed: collapsedItems.toString()})}
                                activeClassName="active">Orders</Link>
                      </li>
                      <li role="presentation" className="nav-item">
                          <Link to='/news'
                                query={collapsedItems.length && Object.assign({}, {collapsed: collapsedItems})}
                                activeClassName="active">News</Link>
                      </li>

                  </ul>
              </Col>
              <Col xs={12} md={8}>
                {!isFetching && !Object.keys(data).length &&
                    <h2>There is no content to show.</h2>
                }
                {!isFetching && !!Object.keys(data).length &&
                    sectionItems
                }
              </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

Post.propTypes = {
  data: PropTypes.object.isRequired
}

function mapProp(state) {
  const {content} = state;
  const data = content.data;

  return {data};
}

export default connect(mapProp)(Post);
