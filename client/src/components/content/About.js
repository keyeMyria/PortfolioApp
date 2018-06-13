import React, { Fragment } from 'react'
import styled from 'styled-components'
import {  Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import theDire from '../../img/logos/download.png'
import {
    Divider,
    MarketingImage,
} from '../utils'

export const Intro = styled.div`
    margin: 2rem 0;
    text-align: left;
`
const Description = styled.div`
    margin: 0 auto 30px auto;
`
const MarketingList = styled.ol`
    margin-left: 2rem;
`

const About = props => (
    <Fragment>
        <Container>
          <Intro>
              <h1 className="display-4">About</h1>
                <Description className="lead">
                    <p>
                    Thank you to everyone that participates and supports us. We would not be able to do this without you!
                    </p>
                </Description>

          </Intro>
        </Container>
        <Divider />
    </Fragment>
)

export default About
