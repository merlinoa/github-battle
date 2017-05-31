import React from 'react'
import Home from './Home'
import Battle from './Battle'
import Popular from './Popular'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Nav from './Nav'

const App = () => {
    return (
        <BrowserRouter>
            <div className='container'>
                <Nav />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/battle' component={Battle} />
                    <Route path='/popular' component={Popular} />
                    <Route render={() => {
                        return <p>Page Not Found</p>
                    }} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App
