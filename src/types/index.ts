import { match } from "react-router";
import { CallHistory, LocationChange } from "../constants";

export interface LocationChangeAction {
    type: LocationChange
    payload: RouterState
}

export interface CallHistoryAction {
    type: CallHistory
    payload: PushActionPayload | ReplaceActionPayload | GoBackActionPayload | GoForwardActionPayload | GoActionPayload
}

export type PushActionPayload = { method: 'push', args: [ string, unknown? ] }
export type ReplaceActionPayload = { method: 'replace', args: [ string, unknown? ] }
export type GoActionPayload = { method: 'go', args: [ number ] }
export type GoBackActionPayload = { method: 'goBack', args: [] }
export type GoForwardActionPayload = { method: 'goForward', args: [] }

export type PushAction = { type: CallHistory, payload: PushActionPayload }
export type ReplaceAction = { type: CallHistory, payload: ReplaceActionPayload }
export type GoAction = { type: CallHistory, payload: GoActionPayload }
export type GoBackAction = { type: CallHistory, payload: GoBackActionPayload }
export type GoForwardAction = { type: CallHistory, payload: GoForwardActionPayload }

export type RouterAction = LocationChangeAction | CallHistoryAction 

export interface RouterState {
    location: Location 
    match: match 
}