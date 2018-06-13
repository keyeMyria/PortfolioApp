import React, { Fragment } from 'react'
import {
    Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
} from 'reactstrap'


const faqs = [
    {
        question: 'How is this different from other forums?',
        answer: <Fragment>
        ...
        </Fragment>,
    },
]

export default props => (
    <Container>
        <h1 style={{ marginBottom: '1rem' }}>Frequently Asked Questions</h1>
        <ListGroup>
            {faqs.map(({ question, answer}, i) => (
                <ListGroupItem key={`faq-${i}`}>
                    <ListGroupItemHeading>{question}</ListGroupItemHeading>
                    <ListGroupItemText>{answer}</ListGroupItemText>
                </ListGroupItem>
            ))}
        </ListGroup>
    </Container>
)
