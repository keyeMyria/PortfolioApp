import { graphql } from 'react-apollo'
import React, { Fragment, Component } from 'react'
import gql from 'graphql-tag'
import { Col, Container, Row, Card, CardBody, CardTitle, CardText } from 'reactstrap'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/fontawesome-free-solid'


import { Loading } from '../utils'

class MyPortfolios extends Component {
    render() {
        const { data: { loading, allPortfolios } } = this.props

        return (
            <Container>
                <h1 className='text-center'>My Portfolios</h1>
                    <Row>
                        <Col sm='12' md={{ size: '6', offset: '3' }} lg={{ size: '8', offset: '2' }}>
                            {loading ? <Loading /> : (
                                allPortfolios.length !== 0 ? (
                                    <Row>
                                        {allPortfolios.map((portfolio, i) => (
                                            <Col key={`stock-${portfolio.name}`} lg={allPortfolios.length >= 2 ? 4 : 6}
                                                 md={6} xs={12} sm={12}>
                                                <Card style={{ marginTop: '2rem' }}>
                                                    <CardBody>
                                                        <CardTitle>
                                                            {portfolio.name}
                                                        </CardTitle>
                                                        <CardText>
                                                            <Link to={`/portfolio/${portfolio.name}`}>
                                                                <FontAwesomeIcon icon={faCog} />&nbsp;Manage
                                                            </Link>
                                                        </CardText>
                                                    </CardBody>
                                                </Card>
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


const query = gql`
    query {
        allPortfolios {
            name
        }
    }
`

MyPortfolios = graphql(query)(MyPortfolios)


export default MyPortfolios
