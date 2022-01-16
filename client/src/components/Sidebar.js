import React from 'react'
import { connect } from 'react-redux'
import '../styles/Sidebar.scss'
import ListItem from './ListItem'

const Sidebar = (props) => {
    //const [fleetUnits, setUnits] = React.useState([]);

    React.useEffect(() => {
      fetch("/FleetUnits")
        .then((res) => res.json())
        .then((data) => props.setUnits(data));
    }, []);

    return(

        <div className="items">
        <div className="items-head">
          <p>Vehicles Fleet</p>
          <hr/>
        </div>
        
        <div className="items-body">
          
       {
           props.units.map((data, id) => {
               return <ListItem unit={data} key={data.Id}/>
           })
       }

        </div>
      </div>
    );

}


const mapStateToProps = (state) => ({
    units: state.sidebar.units,
})

const mapDispatchProps = (dispatch) => ({
    setUnits: (units) => dispatch({ type: 'SET_UNITS', units })
})

export default connect(mapStateToProps, mapDispatchProps)(Sidebar)
