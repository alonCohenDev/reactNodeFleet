const initState = {
    isSidebarOpen: true,
    selectedUnit: undefined,
    units: []
}

export default (state = initState, action) => {
    let newState
    switch (action.type) {
        case 'SET_UNITS':
            newState = {
                ...state,
                units: action.units
            }

            return newState;

        case 'SET_SELECTED_UNIT':
            const isSameUnit = state.selectedUnit && action.unit.Id === state.selectedUnit.Id;
            newState = {
                ...state,
                selectedUnit: isSameUnit ? undefined : action.unit
            }
            return newState;

        case 'ADD_UNIT':
            newState = {
                ...state,
                units: [...state.units, action.unit]
            }
            return newState;

        case 'DELETE_UNIT':
            newState = {
                ...state,
                units: state.units.filter((unit) => unit.Id !== action.id)
            }
            return newState;

        case 'UPDATE_UNIT':
            newState = {
                ...state,
                units: state.units.map((unit) => unit.Id === action.unit.Id ? action.unit : unit)
            }
            return newState;
            
        default:
            return state;


    }
}