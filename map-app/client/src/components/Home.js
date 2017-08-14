import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react';
import MapContainer from './MapContainer';
import Statistics from './Statistics';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="borderless ui  inverted blue fixed pointing menu">
          <div className="item">
            <Header className="inverted">
              <i className="marker icon"></i>
              Downloads
            </Header>
          </div>
          </div>
          <Container className="main-content">
            <MapContainer
              center={{lat: 45.464200, lng: 9.190000}}
              zoom={4}/>
            <Statistics />
          </Container>
      </div>
    );
  }
}

export default Home;
