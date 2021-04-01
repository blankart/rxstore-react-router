import { LOCATION_CHANGE } from "../constants"
import { RouterAction, RouterState } from "../types"

const initialRouterState: RouterState = {
    location: {
        pathname: '',
        port: '',
        protocol: '',
        hash: '',
        host: '',
        hostname: '',
        ancestorOrigins: {} as DOMStringList,
        href: '',
        origin: '',
        search: '',
        assign: ( url: string ) => url,
        reload: () => true,
        replace: ( url: string ) => url 
    },
    match: {
        params: {},
        isExact: false,
        path: '',
        url: ''
    }
}
 
const routerReducer = ( state: RouterState = initialRouterState, action: RouterAction ): RouterState => {
    switch ( action.type ) {
    case LOCATION_CHANGE: {
        return {
            ...state,
            location: action.payload.location,
            match: action.payload.match
        }
    }
    default: return state
    }
}

export default routerReducer
