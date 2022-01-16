import React, { useState, useEffect } from "react";
import Marker from './Marker'
import GoogleMapReact from 'google-map-react'
import { connect } from 'react-redux'

const Map = props => {

  const [center, setCenter] = useState(props.selectedUnit ? props.selectedUnit.GeoLocation : { lat: 32.109333, lng: 34.855499 })

  useEffect(() => {
    if (props.selectedUnit) {
      console.log("Changing to: " + props.selectedUnit.GeoLocation.lat)
      setCenter(props.selectedUnit.GeoLocation)
    }

  }, [props.selectedUnit]);

  return (
    <div className="mapWrapper">

      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAphZXLpPkGeQJqMQg1H8OXUtNp1JfU1Sw' }}
        center={center}
        defaultZoom={7}>


        {props.selectedUnit &&
          <Marker lat={props.selectedUnit.GeoLocation.Lat} lng={props.selectedUnit.GeoLocation.Lat} />
        }

      </GoogleMapReact>
    </div>
  )
}

const mapStateToProps = (state) => ({
  selectedUnit: state.sidebar.selectedUnit
})

export default connect(mapStateToProps, null)(Map)