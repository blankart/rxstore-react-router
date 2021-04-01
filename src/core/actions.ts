import { CALL_HISTORY } from "../constants"
import { GoAction, GoBackAction, GoForwardAction, PushAction, ReplaceAction } from "../types"

export const push = ( url: string ): PushAction => ( { type: CALL_HISTORY, payload: { method: 'push', args: [ url ] } } )
export const replace = ( url: string ): ReplaceAction => ( { type: CALL_HISTORY, payload: { method: 'replace', args: [ url ] } } )
export const go = ( n: number ): GoAction => ( { type: CALL_HISTORY, payload: { method: 'go', args: [ n ] } } )
export const goBack = (): GoBackAction => ( { type: CALL_HISTORY, payload: { method: 'goBack', args: [] } } )
export const goForward = (): GoForwardAction => ( { type: CALL_HISTORY, payload: { method: 'goForward', args: [] } } )