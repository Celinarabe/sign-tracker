import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

function Map() {
  return (
    <GoogleMap defaultZoon={10} defaultCenter={{ lat: 45.421, lng: -75.69 }} />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap;


