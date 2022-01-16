import React from 'react'
import { connect } from 'react-redux'


const ListItem = (props) => {
    const isSelected = props.selectedUnit && props.unit.Id === props.selectedUnit.Id;
    return (
        <div className={isSelected ? "items-body-content selected-item" : "items-body-content"} onClick={() => props.setSelectedUnit(props.unit)}>
            <span>{props.unit.Name}</span>
            <i className="fa fa-angle-right"></i>
        </div>
    );

}

const mapStateToProps = (state) => ({
    selectedUnit: state.sidebar.selectedUnit,
})

const mapDispatchProps = (dispatch) => ({
    setSelectedUnit: (unit) => dispatch({ type: 'SET_SELECTED_UNIT', unit })
})

export default connect(mapStateToProps, mapDispatchProps)(ListItem)