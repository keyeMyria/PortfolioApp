import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import logoLarge from '../img/logos/download.png'
import keyboardImg from '../img/logos/download.png'
import theDire from '../img/logos/download.png'
import { createUrl } from '../api/utils'
import {
    Divider,
    MarketingImage,
} from './utils'

export const Intro = styled.div`
    margin: 2rem 0;
    text-align: center;
`
const Description = styled.p`
    max-width: 400px;
    margin: 0 auto 30px auto;
`

const MarketingDescription = styled.p`
    margin-left: 2rem;
    color: #062736;
`

const MainLogo = styled.img`
    width: auto;
    max-height: 300px;
    margin-bottom: 2rem;
`
const MarketingList = styled.ol`
    margin-left: 2rem;
`


const Homepage = props => {
    const { data: {loading, isAuthenticated = false } } = props
    return (
        <Fragment>
            <Container>
                <Intro style={{ margin: '0' }}>
                    <MainLogo src={logoLarge} alt="Template" />
                    <h2>Template</h2>
                    <Description className="lead">
                        Registration is free and easy!
                    </Description>
                    <div>
                        {!loading && !isAuthenticated && (
                            <Button color="info" size="lg"
                                href={createUrl('/login/')}>&nbsp;Sign Up
                            </Button>
                        )}
                    </div>
                </Intro>
            </Container>
            <Divider style={{ margin: '0' }}/>
            <Container>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <span id="how-it-works" className="display-4">
                                Template
                            </span>
                        </CardTitle>
                        <Row>
                            <Col md="4" xs="12">
                                <MarketingImage className='img-fluid' src={keyboardImg}/>
                            </Col>
                            <Col md="8" xs="12" className="d-flex align-items-center">
                                <div>
                                    <MarketingDescription>
                                        Template
                                    </MarketingDescription>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
            <Container>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <span id="how-it-works" className="display-4">
                                How it works
                            </span>
                        </CardTitle>
                        <Row>
                            <Col sm="4">
                                  <MarketingImage className='img-fluid' src={theDire} />
                              </Col>
                              <Col sm="8">
                                  <MarketingList>
                                      <li>Sign up to the site</li>
                                      <li>Join us on Discord for updates and more information!</li>
                                  </MarketingList>
                              </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </Fragment>
    )
}

const query = gql`query { isAuthenticated }`
export default graphql(query)(Homepage)
