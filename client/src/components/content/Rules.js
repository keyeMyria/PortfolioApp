import React from 'react'
import styled from 'styled-components'
import { Container } from 'reactstrap'
import {
    Divider,
} from './../utils'

const RulesList = styled.ol`
    > li {
        font-weight: bold;
    }
`

export default () => (
    <Container>
        <h1>Rules</h1>
        <p>
            <strong>Disclaimer:</strong> These rules are not final and are subject to change.
            Changes in rules will be announced on Discord and on our site.
            In cases where rules are not clear, we reserve the right to make judgement calls and rule updates
            as we see fit.
            If there are any questions or concerns about the rules, please contact an administrator in the Discord.
        </p>
        <h2>General</h2>
        <RulesList>
            <li>...</li>
        </RulesList>
    </Container>
)
