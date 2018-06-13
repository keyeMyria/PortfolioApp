import { graphql } from 'react-apollo'
import React, { Fragment, Component } from 'react'
import gql from 'graphql-tag'
import { Col, Container, Row } from 'reactstrap'

import { Loading } from '../utils'

class Portfolio extends Component {
    render() {
        const { data: { loading, portfolio } } = this.props
        console.log('props', this.props)

        return (
            <Container>
                <h1 className='text-center'>Portfolio</h1>
                    <Row>
                        <Col sm='12' md={{ size: '6', offset: '3' }} lg={{ size: '8', offset: '2' }}>
                            {loading ? <Loading /> : (
                                <div>
                                    <h2>{portfolio.name}</h2>
                                </div>

                            )}
                        </Col>
                    </Row>

                    <Row>
                        <Col sm='12' md={{ size: '6', offset: '3' }} lg={{ size: '8', offset: '2' }}>
                            {loading ? <Loading /> : (
                                <div>

                                    {portfolio.stocks.map(stock => {
                                            return (
                                                <div>
                                                    <h5>{stock.ticker}</h5>
                                                    <p>{stock.close}</p>
                                                    <p>{stock.date}</p>
                                                    <br></br>
                                                </div>
                                                    )
                                        })}
                                </div>
                            )}
                        </Col>
                    </Row>

        </Container>
            )

    }
}


const query = gql`
    query getPortfolio($name: String!) {
      portfolio(name: $name) {
        name
        id
        stocks {
            ticker
            close
            date
        }
      }
    }
`

Portfolio = graphql(query, {
    options: ({ match: { params: { name }}}) => ({ variables: { name }})
})(Portfolio)


export default Portfolio