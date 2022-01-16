import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'


const UnitsInfo = (props) => {

  const [carTypeValue, setCarType] = useState(props.unit.Type)
  const [carName, setCarName] = useState(props.unit.Name)

  useEffect(() => {
    setCarType(props.unit.Type)
    setCarName(props.unit.Name)
  }, [props.unit.Name, props.unit.Type])

  const onDeleteClicked = async (e) => {
    const body = JSON.stringify({
      Id: props.unit.Id,
    })
    fetch('/DeleteUnit', {
      method: 'DELETE', body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => props.deleteUnit(props.unit.Id))



  }

  const onAddClicked = async (e) => {
    const unitToAdd = {
      Type: carTypeValue,
      Name: carName,
      Id: props.unit.Id,
      GeoLocation: props.unit.GeoLocation,
      TimeCreated:props.unit.TimeCreated,
      LastSuccesssfulConnection: props.unit.LastSuccesssfulConnection
    };
    fetch('/AddUnit', {
      method: 'POST', body: JSON.stringify(unitToAdd),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((id) => props.addUnit({...unitToAdd,Id:id}))
  }

  const onUpdateClicked = async (e) => {
    const updatedUnit = {
      Type: carTypeValue,
      Name: carName,
      Id: props.unit.Id,
      GeoLocation: props.unit.GeoLocation,
      TimeCreated:props.unit.TimeCreated,
      LastSuccesssfulConnection: props.unit.LastSuccesssfulConnection
    };
    fetch('/UpdateUnit', {
      method: 'PUT', body: JSON.stringify(updatedUnit),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(props.updateUnit(updatedUnit))

  }

  return (

    <div className="UnitsInfo">
      <div className="items-head">
        <p>{props.unit.Name}</p>
        <hr />
      </div>

      {/* Name */}
      <div className='unitsInfoEditingSection'>
        <p className='unitsInfoP'>Name: </p>
        <input className='unitsInfoInput' value={carName} onChange={(e) => { setCarName(e.target.value) }}></input>
      </div>
      {/* Type */}
      <div className='unitsInfoEditingSection'>
        <p className='unitsInfoP'>Type: </p>

        <select className='unitsInfoSelect' value={carTypeValue} onChange={(e) => { setCarType(e.target.value) }}>
          <option value='Sedan' >Sedan</option>
          <option value='Truck'>Truck</option>
          <option value='SUV'>SUV</option>
          <option value='Semi Trailer'>Semi Trailer</option>
          <option value='Full Trailer'>Full Trailer</option>
        </select>
      </div>

      {/* Lat */}
      <div className='unitsInfoEditingSection'>
        <p className='unitsInfoP'>Lat: </p>
        <p className='unitsInfoP'>{props.unit.GeoLocation.lat} </p>
      </div>

      {/* Long */}
      <div className='unitsInfoEditingSection'>
        <p className='unitsInfoP'>Lng: </p>
        <p className='unitsInfoP'>{props.unit.GeoLocation.lng} </p>
      </div>

      {/* Creation Date */}
      <div className='unitsInfoEditingSection'>
        <p className='unitsInfoP unitsInfoPSmall'>Creation Date: </p>
        <p className='unitsInfoP'>{props.unit.TimeCreated} </p>
      </div>

      {/* Last Connection Date */}
      <div className='unitsInfoEditingSection'>
        <p className='unitsInfoP unitsInfoPSmall'>Last Connection Date: </p>
        <p className='unitsInfoP'>{props.unit.LastSuccesssfulConnection} </p>
      </div>

      <div className='unitsInfoButtonsSection'>
        <button className="btn regular" onClick={onAddClicked}>Add</button>
        <button className="btn regular" onClick={onUpdateClicked}>Update</button>
        <button className="btn danger" onClick={onDeleteClicked}>Delete</button>
      </div>


    </div>
  );

}

const mapDispatchProps = (dispatch) => ({
  addUnit: (unit) => dispatch({ type: 'ADD_UNIT', unit }),
  deleteUnit: (id) => dispatch({ type: 'DELETE_UNIT', id }),
  updateUnit: (unit) => dispatch({ type: 'UPDATE_UNIT', unit }),
})

export default connect(null, mapDispatchProps)(UnitsInfo)
