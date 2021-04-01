import * as React from 'react'
import { combineReducers, createRxStore } from "rxstore-observer"
import { Action, reducer, State } from "../templates/mock-store"
import createRouterObserver from '../create-router-observer'
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'
import routerReducer from '../router-reducer'
import { push, replace } from '../actions'
import { RouterAction, RouterState } from '../../types'
import { createStoreHooks } from 'react-rxstore-observer'

describe( 'createRouterObserver', () => {
    test( 'Store subscription to react-router context', () => {
        const dummyStore = createRxStore( combineReducers<{ dummy: State, route: RouterState }, Action | RouterAction>( { dummy: reducer, route: routerReducer } ) )
        const RouteObserver = createRouterObserver( dummyStore )
        const [ , useDispatch ] = createStoreHooks( dummyStore )
        const mockFunction1 = jest.fn()
        const mockFunction2 = jest.fn()

        const Route1 = () => {
            const dispatch = useDispatch()
            mockFunction1()
            return (
                <>
                    <div>route 1</div>
                    <button
                        data-testid="route1-push"
                        onClick={ () =>
                            dispatch( push( '/2' ) )
                        }
                    />
                    <button
                        data-testid="route1-replace"
                        onClick={ () =>
                            dispatch( replace( '/2' ) )
                        }
                    />
                </>
            )
        }
        const Route2 = () => {
            const dispatch = useDispatch()
            mockFunction2()
            return (
                <>
                    <div>route 2</div>
                    <button
                        data-testid="route2-push"
                        onClick={ () =>
                            dispatch( push( '/' ) )
                        }
                    />
                    <button
                        data-testid="route2-replace"
                        onClick={ () =>
                            dispatch( replace( '/' ) )
                        }
                    />
                </>
            )
        }

        const Root = () => {
            return (
                <BrowserRouter>
                    <RouteObserver>
                        <Switch>
                            <Route path="/" exact={ true } component={ Route1 }/>
                            <Route path="/2" exact={ true } component={ Route2 }/>
                        </Switch>
                    </RouteObserver>
                </BrowserRouter>
            )
        }

        const { getByTestId } = render( <Root/> )
        fireEvent.click( getByTestId( 'route1-push' ) )
        expect( dummyStore.getState().route.location.pathname ).toBe( '/2' )
        expect( mockFunction1 ).toBeCalledTimes( 1 )
        fireEvent.click( getByTestId( 'route2-push' ) )
        expect( mockFunction2 ).toBeCalledTimes( 1 )
        expect( dummyStore.getState().route.location.pathname ).toBe( '/' )
        fireEvent.click( getByTestId( 'route1-replace' ) )
        expect( dummyStore.getState().route.location.pathname ).toBe( '/2' )
        expect( mockFunction1 ).toBeCalledTimes( 2 )
        fireEvent.click( getByTestId( 'route2-replace' ) )
        expect( mockFunction2 ).toBeCalledTimes( 2 )
        expect( dummyStore.getState().route.location.pathname ).toBe( '/' )
    } )
} )