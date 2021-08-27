import React from 'react'
import { Route, Switch } from "react-router-dom"
import MapContainer from './MapContainer'
import Results from './Results'

function Content(props){
    const {cafeData} = props
    return (
        <Switch>
            <Route path='/' exact render={() => <MapContainer />} />
            <Route path='/search' render={() => <Results cafeData={cafeData} />} />
        </Switch>
    )
}

export default Content