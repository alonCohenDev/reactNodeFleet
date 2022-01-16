import React from 'react'
import { connect } from 'react-redux'
import UnitsInfo from './UnitsInfo';
import Map from './Map';

const ContentArea = (props) => {
    return(
    <div className="contentArea">
        {props.selectedUnit !== undefined  &&
          <UnitsInfo unit={props.selectedUnit}/>
        }
        <Map/>
    </div>
    );

}

const mapStateToProps = (state) => ({
   units: state.sidebar.units,
   selectedUnit:state.sidebar.selectedUnit,
})

export default connect(mapStateToProps, null)(ContentArea)
