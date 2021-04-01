# RxStore React Router

This is the official React Router bindings for [React RxStore Observer](https://github.com/blankart/react-rxstore-observer).

This project is currently in development.

### Usage:
```jsx
import { createRouterObserver, push, routerReducer } from 'rxstore-react-router'
import { createRxStore, combineReducers } from 'rxstore-observer'
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import { Path1, Path2 } from './components'
import storeReducer from './reducer'

const store = createRxStore( combineReducers({ main: storeReducer, route: routerReducer }) )

const RouterObserver = createRouterObserver(store)

const YourAwesomeApp = () => {
    return (
        <Router>
            <RouterObserver>
                <Switch>
                    <Route path="/path-1" exact={ true } component={ Path1 }/>
                    <Route path="/path-2" exact={ true } component={ Path2 }/>
                </Switch>
            </RouterObserver>
        </Router>
    )
}

store.dispatch( push('/path-2') ) // Calls history.push. Awesome!
```