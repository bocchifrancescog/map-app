import React from 'react'
import Service from './Service'
import TableStatistics from './TableStatistics'
import { Header, Grid } from 'semantic-ui-react'


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
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2'>Statistics </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <TableStatistics
                firstColumn="Country"
                fieldName="country"
                appIds={appIds}
                data={byCountry}
                showPagination={true}
                />

            </Grid.Column>
            <Grid.Column>
            <TableStatistics
                firstColumn="Time of the day"
                fieldName="label"
                appIds={appIds}
                data={byTime}
                showPagination={false}
                />
            </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default MapContainer;
