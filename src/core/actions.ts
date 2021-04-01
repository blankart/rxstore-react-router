import { CALL_HISTORY } from "../constants"
import { GoAction, GoBackAction, GoForwardAction, PushAction, ReplaceAction } from "../types"

/**
 * Generates an action object for calling 
 * `history.push`.
 * 
 * @param {string} url 
 * @return {PushAction} generated push action
 */
export const push = ( url: string ): PushAction => ( { type: CALL_HISTORY, payload: { method: 'push', args: [ url ] } } )
/**
 * Generates an action object for calling
 * `history.replace`.
 * 
 * @param {string} url
 * @return {ReplaceAction} generated replace action
 */
export const replace = ( url: string ): ReplaceAction => ( { type: CALL_HISTORY, payload: { method: 'replace', args: [ url ] } } )
/**
 * Generates an action object for calling
 * `history.go`.
 * 
 * @param {number} n
 * @return {GoAction} generated go action
 */
export const go = ( n: number ): GoAction => ( { type: CALL_HISTORY, payload: { method: 'go', args: [ n ] } } )
/**
 * Generates an action object for calling
 * `history.goBack`.
 * 
 * @return {GoBackAction} generated goBack action
 */
export const goBack = (): GoBackAction => ( { type: CALL_HISTORY, payload: { method: 'goBack', args: [] } } )
/**
 * Generates an action object for calling
 * `history.goForward`.
 * 
 * @return {GoForwardAction} generated goForward action
 */
export const goForward = (): GoForwardAction => ( { type: CALL_HISTORY, payload: { method: 'goForward', args: [] } } )