//connect signs with markers
const MapContainer = (props) => {

	const markers = props.signs.map((sign, idx) => {
    return <Marker title=`Sign #${idx + 1}` position={{lat: sign.latitude, lng: sign.longitude}} />;
  });
  
  const bounds = ...
  
  for(var i = 0; i < signs.length; i++) {
    bounds.extend({lat: signs[i].latitude, lng: signs[i].longitude})
  }

	return <Map bounds={bounds}> {markers} </Map>;
}