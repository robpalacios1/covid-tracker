import React from 'react';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import { showDataOnMap } from './util'
import './Map.css'

const Map = (props) => {
    return (
        <div className="map">
            <LeafletMap center={props.center} zoom={props.zoom}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(props.countries, props.casesType)}
            </LeafletMap>
        </div>
    );
}

export default Map
