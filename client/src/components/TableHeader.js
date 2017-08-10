import React from 'react'
import Service from './Service'
import TableHeader from './TableHeader'

class MapContainer extends React.Component {
  render(){
    const firstColumn = this.props.firstColumn;
    const otherColumns = this.props.otherColumns;

    if (otherColumns.length > 0){
        return (
            <thead>
                <tr>
                    <th>
                        {firstColumn}
                    </th>
                    {otherColumns.map((col, j) =>
                        <th key={j.toString()}> {col.app_id} </th>
                    )}
                </tr>
            </thead>
        );
    }else{
        return (
            <thead>
              <tr>
                <th>
                    Waiting data...
                </th>
              </tr>
            </thead>
        );
    }

  }
}

export default MapContainer;