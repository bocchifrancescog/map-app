import React from 'react'

import { Table, Button, Header } from 'semantic-ui-react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class TableStatistics extends React.Component {

  getHeader(firstColumn, appIds) {
    var res = [firstColumn];
    appIds.map(function(col, j){
        res.push(col.app_id);
      });
    return res;
  }
  getColumns(appIds, firstColumn, fieldName){
    var cols = [{
        Header: () => <h4 className="ui header"> {firstColumn}</h4>,
        accessor: fieldName,
      }]
    appIds.map(function(col, j){
        cols.push({
          Header: () => <h4 className="ui header small">{col.app_id} </h4>,
          accessor: 'counts.'+col.app_id
        })
    });
    return cols;
  }

  render(){

    const firstColumn = this.props.firstColumn;
    const fieldName = this.props.fieldName;
    const appIds = this.props.appIds;
    const data = this.props.data;
    const title = this.props.title;
    const columns = this.getColumns(appIds, firstColumn, fieldName);


        return (
          <div>
            <Header as="h3" className="blue">
                {title}
            </Header>
            <ReactTable className="ui table -highlight -striped"
              data={data}
              columns={columns}
              defaultPageSize={5}
              minRows={5}
              showPageSizeOptions={false}
              totalCount={ data.length }
              showPagination={this.props.showPagination}
              NextComponent={Button}
              PreviousComponent={Button}
            />
          </div>
        );

  }
}

export default TableStatistics;
