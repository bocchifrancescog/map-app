import React from 'react'
import Service from './Service'
import TableHeader from './TableHeader'

class MapContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        byCountry : [],
        appIds : []
    }

    this.loadByCountry();
    this.loadAppIds();
  }

  loadAppIds(){
      Service.getAppIds('query', data => {
        this.setState({
          appIds: data
        });
    });
  }

  loadByCountry(){
    Service.getDownloadsByCountry('query', byCountry => {
        this.setState({
          byCountry: byCountry
        });
    });
  }

  render(){
    const byCountry = this.state.byCountry;
    const appIds = this.state.appIds;
    console.log(appIds);
    const byCountryRows = byCountry.map((element, i) =>

          <tr key={i.toString()}>
            <td>{element['country']}</td>
            {appIds.map((app, j) =>
                    <td key={j.toString()}> {element[app.app_id]} </td>
                )}
          </tr>
        );
    return (
    <div>
     Statistics
        <table>

                <TableHeader firstColumn="Country" otherColumns={appIds}/>

            <tbody>
                {byCountryRows}
            </tbody>
        </table>
    </div>
    )
  }
}

export default MapContainer;