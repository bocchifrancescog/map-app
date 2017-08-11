import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

class TableStatistics extends React.Component {
  render(){

    const firstColumn = this.props.firstColumn;
    const fieldName = this.props.fieldName;
    const appIds = this.props.appIds;
    const data = this.props.data;

        return (
            <table>
                <TableHeader firstColumn={firstColumn} otherColumns={appIds}/>
                <TableBody fieldName={fieldName} data={data} appIds={appIds} />
            </table>
        );

  }
}

export default TableStatistics;