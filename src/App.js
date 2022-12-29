import './App.css';
import { makeCall } from './services/call.service';

function App() {
  const box = [
    {latitude: 32.04185475765898, longitude: 34.87959860718179}, // bottom-left
    {latitude: 32.044013878350405, longitude: 34.8815682303178}, // top-right
  ];
  let isInBox = false;
  
  const successCallback = async (res) => {
    console.log('Location access granted', res);
    const updatedStatus = checkIsInBox({latitude: res.coords.latitude, longitude: res.coords.longitude});
    if (!isInBox && updatedStatus) {
      console.log('Calling gate');
      try {
        const response = await makeCall();
        alert(response);
      } catch (err) {
        console.log('Error making call | App.js', err);
      }
      isInBox = true;
    }
    if (isInBox && !updatedStatus) {
      console.log('Leaving the box...');
      isInBox = false;
    }
  }
  
  const errorCallback = (err) => {
    console.log('Location Error', err.message);
  }
  const id = navigator.geolocation.watchPosition(successCallback, errorCallback);
  
  const checkIsInBox = ({latitude, longitude}) => {
    if (latitude > box[0].latitude && latitude < box[1].latitude) {
      if (longitude > box[0].longitude && longitude < box[1].longitude) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="App">
      <p>Hello World</p>
    </div>
  );
}

export default App;
