import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styled from 'styled-components'
import {
    Button, Collapse, DropdownToggle, DropdownMenu, DropdownItem,
    Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown,
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSteam } from '@fortawesome/fontawesome-free-brands'

import { createUrl } from '../../api/utils'
import BrandImage from '../../img/logos/download.png'

const NavbarTitle = styled.h1`
    font-weight: bold;
`
const Uppercase = styled.span`
    text-transform: uppercase;
    letter-spacing: 1.5px;
`
const GoogleNavItem = styled(NavItem)`
    margin-left: 1rem;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 1;
`

const BrandLogo = styled.img`
    height: 30px;
`
const UserMenu = props => (
    <UncontrolledDropdown nav>
        <DropdownToggle caret nav>
            <Uppercase>Settings</Uppercase>
        </DropdownToggle>
        <DropdownMenu right>
            <LinkContainer to='/rules'>
                <DropdownItem>Create a ...</DropdownItem>
            </LinkContainer>
            <DropdownItem divider />
            <a href={createUrl('/logout')}>
                <DropdownItem>Logout</DropdownItem>
            </a>
        </DropdownMenu>
    </UncontrolledDropdown>
)

const HelpMenu = props => (
    <UncontrolledDropdown nav>
        <DropdownToggle caret nav>
            Resources
        </DropdownToggle>
        <DropdownMenu right>
            <LinkContainer to="/rules">
                <DropdownItem>Rules</DropdownItem>
            </LinkContainer>
            <LinkContainer to="/about">
                <DropdownItem>About</DropdownItem>
            </LinkContainer>
            <LinkContainer to="/faqs">
                <DropdownItem>FAQ</DropdownItem>
            </LinkContainer>
            <LinkContainer to="/contact">
                <DropdownItem>Contact</DropdownItem>
            </LinkContainer>
        </DropdownMenu>
    </UncontrolledDropdown>
)

class Navigation extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
        }
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen })

    render() {
        const { data: { loading, isAuthenticated = false } } = this.props
        return (
            <div>
                <Navbar dark color="dark" expand="md">
                    <NavbarTitle style={{ marginRight: '0' }}>
                        <LinkContainer to='/'>
                            <NavbarBrand >
                                <BrandLogo src={BrandImage} alt="Template" />
                                &nbsp;<i><small>alpha</small></i>
                            </NavbarBrand>
                        </LinkContainer>
                    </NavbarTitle>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <LinkContainer to="/twitch-stream">
                                    <NavLink>Watch</NavLink>
                                </LinkContainer>
                            </NavItem>
                            <NavItem>
                                <LinkContainer to="/trades">
                                    <NavLink>Trade History</NavLink>
                                </LinkContainer>
                            </NavItem>
                            <NavItem>
                                <LinkContainer to="/portfolios">
                                    <NavLink>Porfolios</NavLink>
                                </LinkContainer>
                            </NavItem>
                            <HelpMenu />
                            {!loading && (
                                isAuthenticated ? <UserMenu /> : (
                                <GoogleNavItem>
                                    <Button style={{ padding: '.375rem 2rem' }}
                                            color="info"
                                            href={createUrl('/login/')}>
                                        &nbsp;Sign in via Robinhood
                                    </Button>
                                </GoogleNavItem>
                            ))}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

const query = gql`query { isAuthenticated }`
export default graphql(query)(props => <Navigation {...props} />)
