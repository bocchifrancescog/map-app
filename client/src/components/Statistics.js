import React from 'react'
import Service from './Service'
import TableStatistics from './TableStatistics'


class MapContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        byCountry : [],
        byTime: [],
        appIds : []
    }

    this.loadDataFromServer();
  }

  loadDataFromServer(){

    Service.getAppIds('query', data => {
        this.setState({
          appIds: data
        });
    });

    Service.getDownloadsByCountry('query', data => {
        this.setState({
          byCountry: data
        });
    });

    Service.getDownloadsByTime('query', data => {
        this.setState({
          byTime: data
        });
    });

  }


  render(){
    const byCountry = this.state.byCountry;
    const byTime = this.state.byTime;
    const appIds = this.state.appIds;


    return (
    <div>
     Statistics
        <TableStatistics
            firstColumn="Country"
            fieldName="country"
            appIds={appIds}
            data={byCountry}
            />
        <TableStatistics
            firstColumn="Time of the day"
            fieldName="label"
            appIds={appIds}
            data={byTime}
            />

    </div>
    )
  }
}

export default MapContainer;