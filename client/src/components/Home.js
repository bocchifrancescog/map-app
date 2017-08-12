import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Statistics from './Statistics';
import { Header, Container, Grid } from 'semantic-ui-react';

class Home extends Component {
  render() {
    return (
      <div>
          <Header as='h1' textAlign='left'>
            <Header.Content>
              Downloads
            </Header.Content>
          </Header>
          <Container>
            <MapContainer />
            <Statistics />
          </Container>
      </div>
    );
  }
}

export default Home;
