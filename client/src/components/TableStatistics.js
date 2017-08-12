import React from 'react'

import { Table, Button } from 'semantic-ui-react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import TableHeader from './TableHeader'
import TableBody from './TableBody'

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
        Header: () => <span className=""> {firstColumn}</span>,
        accessor: fieldName,
      }]
    appIds.map(function(col, j){
        cols.push({
          Header: col.app_id,
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

    const columns = this.getColumns(appIds, firstColumn, fieldName);


        return (
          <ReactTable className="-highlight -striped"
            data={data}
            columns={columns}
            defaultPageSize={5}
            minRows={5}
            showPagination={this.props.showPagination}
            NextComponent={Button}
            PreviousComponent={Button}
          />
        );

  }
}

export default TableStatistics;
