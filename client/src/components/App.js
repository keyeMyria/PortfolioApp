import React, { Component, Fragment } from 'react'
import {
    Route,
    Switch,
} from 'react-router-dom'

import Homepage from './Homepage'
import {
    SignupComplete
} from './user'
import {
    About,
    Contact,
    FAQ,
    Rules,
    TwitchStream,
} from './content'
import { Footer, Navigation } from './layout'
import { ContentContainer } from './utils'
import { Portfolio, MyPortfolios, Trades } from './portfolio'

class App extends Component {
    render() {
        return (
            <Fragment>
                <Navigation/>
                <section className="flex-grow">
                    <ContentContainer>
                        <Switch>
                            <Route exact path="/" component={Homepage} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/contact" component={Contact} />
                            <Route exact path="/faqs" component={FAQ} />
                            <Route exact path="/rules" component={Rules} />
                            <Route exact path="/twitch-stream" component={TwitchStream} />
                            <Route path="/signup-complete" component={SignupComplete} />
                            <Route path="/portfolios/:name" component={Portfolio} />
                            <Route path="/portfolios" component={MyPortfolios} />
                            <Route path="/trades" component={Trades} />
                        </Switch>
                    </ContentContainer>
                </section>
                <Footer />
            </Fragment>
        )
    }
}


export default App;
