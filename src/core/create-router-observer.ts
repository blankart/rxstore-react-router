import { __RouterContext } from 'react-router'
import { inject } from 'react-rxstore-observer'
import { Action, RxStore } from 'rxstore-observer'
import { CallHistoryAction } from '../types'
import { CALL_HISTORY, LOCATION_CHANGE } from '../constants'

/**
 * Utilizes the React RxStore Observer's
 * `inject` function for subscribing to exisiting
 * React Contexts. By default, it gets the
 * __RouterContext provider in `react-router` and
 * use it for changing routes using dispatched
 * actions.
 * 
 * @param {RxStore<S, T>}store 
 */
const createRouterObserver = <
    S extends Record<string, any>,
    T extends Action,
>( store: RxStore<S, T> ) => {
    const WithRouterContext = inject( store, {
        type: CALL_HISTORY,
        context: __RouterContext,
        subscribe: ( props, action ) => {
            const { go, goBack, push, replace, goForward } = props.history
            const { payload: { method, args } } = action as unknown as CallHistoryAction
            switch ( method ) {
            case 'push': 
                push( ...args as [ string, unknown ] ) 
                break
            case 'replace':
                replace( ...args as [ string, unknown ] )
                break
            case 'go':
                go( ...args as [ number ] )
                break
            case 'goBack':
                goBack()
                break
            case 'goForward':
                goForward()
                break
            default: break
            }
        },
        setup: ( props, _, dispatch ) => {
            const { location, match } = props
            dispatch( { type: LOCATION_CHANGE, payload: { location, match } } as unknown as T )
        }
    } )

    return WithRouterContext
}

export default createRouterObserver