import React, { Component } from 'react'
import {
    Navbar, Nav, NavItem, NavLink,
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
    faDiscord,
    faRedditAlien,
    faTwitch,
    faTwitter,
} from '@fortawesome/fontawesome-free-brands'

class Footer extends Component {

    render() {
        return (
            <div style={{ marginTop: "2rem" }}>
                <Navbar dark color="dark" expand="md">
                    <Nav navbar style={{ marginRight: '2rem' }}>
                        <NavItem>
                            <LinkContainer to='/about'>
                                <NavLink>About</NavLink>
                            </LinkContainer>
                        </NavItem>
                        <NavItem>
                            <LinkContainer to='/rules'>
                                <NavLink>Rules</NavLink>
                            </LinkContainer>
                        </NavItem>
                        <NavItem>
                            <LinkContainer to='/contact'>
                                <NavLink>Contact</NavLink>
                            </LinkContainer>
                        </NavItem>
                    </Nav>
                    <Nav className='ml-auto' navbar>
                        <NavItem>
                            <NavLink href='https://www.twitch.tv/' target='_blank'>
                                <FontAwesomeIcon icon={faTwitch} size='2x' />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='https://discord.gg/' target='_blank'>
                                <FontAwesomeIcon icon={faDiscord} size='2x' />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='https://twitter.com/' target='_blank'>
                                <FontAwesomeIcon icon={faTwitter} size='2x' />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='https://www.reddit.com/' target='_blank'>
                                <FontAwesomeIcon icon={faRedditAlien} size='2x' />
                            </NavLink>
                        </NavItem>
                    </Nav>
                  </Navbar>
            </div>
        );
    }
}

export default Footer
