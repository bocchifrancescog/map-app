import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Statistics from './Statistics';

class Home extends Component {
  render() {
    return (
      <div>
          <MapContainer />
          <Statistics />
      </div>
    );
  }
}

export default Home;
