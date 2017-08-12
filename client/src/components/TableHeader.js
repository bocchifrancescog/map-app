import React from 'react'
import { Table } from 'semantic-ui-react'


class TableHeader extends React.Component {
  render(){
    const firstColumn = this.props.firstColumn;
    const otherColumns = this.props.otherColumns;

    if (otherColumns.length > 0){
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>{firstColumn}</Table.HeaderCell>
                    {otherColumns.map((col, j) =>
                        <Table.HeaderCell key={j.toString()}>
                          {col.app_id}
                        </Table.HeaderCell>
                    )}
                </Table.Row>
            </Table.Header>
        );
    }else{
        return (
           <div>
            Waiting data...
          </div>
        );
    }

  }
}

export default TableHeader;
