import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Button, Header } from 'semantic-ui-react'

/**
 * Renders statistics info in a table
 */
class TableStatistics extends React.Component {

  /**
   * Builds the information for every column in the table
   * @param appIds List of app ids
   * @param firstColumn Name of the first column
   * @param fieldName accessor name in the dictinary of data
   * for the first column
   */
  getColumns(appIds, firstColumn, fieldName){
    var cols = [{
        Header: () => <h4 className="ui header"> {firstColumn}</h4>,
        accessor: fieldName,
        filterable: true,
      }]
    appIds.forEach(function(col, j){
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
