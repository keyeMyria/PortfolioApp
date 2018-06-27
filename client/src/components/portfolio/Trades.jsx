import { graphql } from 'react-apollo'
import React, { Fragment, Component } from 'react'
import gql from 'graphql-tag'
import { Col, Container, Row, Card, CardBody, CardTitle, CardText } from 'reactstrap'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/fontawesome-free-solid'


import { Loading } from '../utils'

class Trades extends Component {
    render() {
        const { data: { loading, allTrades } } = this.props

        return (
            <Container>
                <h1 className='text-center'>My Trades</h1>
                    <Row>
                        <Col sm='12' md={{ size: '6', offset: '3' }} lg={{ size: '8', offset: '2' }}>
                            {loading ? <Loading /> : (
                                allTrades.length !== 0 ? (
                                    <Row>
                                        {allTrades.map((trade, i) => (
                                            <Col key={`stock-${trade.name}`} lg={allTrades.length >= 2 ? 4 : 6}
                                                 md={6} xs={12} sm={12}>
                                                <div>
                                                  {trade.stock.ticker},
                                                  ${trade.price},
                                                  {trade.quantity} share(s)
                                                </div>
                                            </Col>
                                            ))}
                                    </Row>
                                ) : (
                                    <Fragment>
                                        Nothing to display ...
                                    </Fragment>
                                )
                            )}
                        </Col>
                    </Row>
            </Container>
        )
    }
}
//



const query = gql`
    query {
        allTrades {
            id
            price
            stock {
                ticker
            }
            quantity
            side
        }
    }
`

Trades = graphql(query)(Trades)

export default Trades
