import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker
} from "react-google-maps";
import img from '../../../constants/imageList';


function MapWrapper({ lat, lng, zoom, listMarker }) {
  return (
    <div className="map-relative">
      <GoogleMap
        zoom={zoom}
        center={{ lat: lat, lng: lng }}
        options={{
          disableDefaultUI: true,
        }}
      >
        {
          listMarker?.map((item, index) => (
            <Marker
              key={index}
              defaultZIndex={1}
              icon={{
                url: item?.latitude === lat && item?.longitude ? img.excludeGreen : img.Exclude,
                scaledSize: new window.google.maps.Size(32, 32),
              }}
              animation={item?.latitude === lat && item?.longitude ? window.google.maps.Animation.DROP : null}
              position={{ lat: item?.latitude, lng: item?.longitude }}
            />
          ))
        }
      </GoogleMap>
    </div>
  );
}
export default withScriptjs(withGoogleMap(MapWrapper));