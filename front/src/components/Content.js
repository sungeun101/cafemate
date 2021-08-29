import React from 'react'
import { Route, Switch } from "react-router-dom"
import MapContainer from './MapContainer'
import Results from './Results'

function Content(props){
    return (
        <Switch>
            <Route path='/' exact render={() => <MapContainer />} />
            <Route path={'/search/:dong/:tags/:sort'} render={() => <Results />} />
        </Switch>
    )
}

export default Content