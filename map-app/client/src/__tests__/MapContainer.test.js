import React from 'react';
import ReactDOM from 'react-dom';
import MapContainer from '../components/MapContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapContainer />, div);
});
