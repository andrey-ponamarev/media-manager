import {action, computed, configure, observable} from 'mobx'
import {IInitialState, IUserMediaItem} from '../common/interfaces'

configure({
    enforceActions: 'observed'
})

type ISetAuthenticatedParams = boolean | {userName: string}

export class AppState {
    constructor(initialState: IInitialState) {
        console.log(`initialState`, initialState)
        this.userMedia = initialState.userMedia
        this.setAuthenticated({userName: initialState.userName})
    }

    userMedia: Array<IUserMediaItem>

    @observable userName: string

    @action.bound
    setAuthenticated(params: ISetAuthenticatedParams) {
        if (typeof params === 'object') {
            this.userName = params.userName
        } else {
            this.userName = ''
        }
    }

    @computed
    get isAuthenticated() {
        return !!this.userName
    }

    @observable count = 0

    @action.bound
    changeCount(newVal: number) {
        this.count += newVal
    }
}

export interface IAppState {
    appState?: AppState
}
