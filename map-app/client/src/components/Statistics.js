import React from 'react'
import Service from './Service'
import TableStatistics from './TableStatistics'
import { Grid } from 'semantic-ui-react'

/**
 * Class resposible to render statistics about the downloads
 */
class MapContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        byCountry : [],
        byTime: [],
        appIds : [],
        error: false,
    }

    this.loadDataFromServer();
  }

  /**
   * Load data from the backed: appIds, downloads by time and
   * downloads by country
   */
  loadDataFromServer(){

    Service.getAppIds(data => {
        this.setState({
          appIds: data
        });
    }).catch(error => {
        this.setState({
          error: true
        })
     });

    Service.getDownloadsByCountry(data => {
        this.setState({
          byCountry: data
        });
    }).catch(error => {
        this.setState({
          error: true
        })
     });

    Service.getDownloadsByTime(data => {
        this.setState({
          byTime: data
        });
    }).catch(error => {
        this.setState({
          error: true
        })
     });
  }


  render(){
    const byCountry = this.state.byCountry;
    const byTime = this.state.byTime;
    const appIds = this.state.appIds;

    return (
      <Grid>
        {this.state.error &&
            <Grid.Column width={16} >
                <div className="ui error message">
                    "Ops! There was an error while loading the data for these tables.
                    We'll try to fix it as soon as possible."
                </div>
            </Grid.Column>
        }
        <Grid.Row columns={2} className="stackable">
          <Grid.Column>
            <TableStatistics
                firstColumn="Country"
                fieldName="country"
                appIds={appIds}
                data={byCountry}
                showPagination={true}
                title="Downloads by Country"
                />

            </Grid.Column>
            <Grid.Column>
            <TableStatistics
                firstColumn="Time of the day"
                fieldName="label"
                appIds={appIds}
                data={byTime}
                title="Downloads by Time of the Day"
                showPagination={false}

                />
            </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default MapContainer;
