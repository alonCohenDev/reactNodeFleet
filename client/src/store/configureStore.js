import { createStore, combineReducers } from 'redux'
import sidebarReducer from '../reducers/sideBar'




export default () => {
    const store = createStore(
        combineReducers({
            sidebar: sidebarReducer
        })
    )
    return store
}