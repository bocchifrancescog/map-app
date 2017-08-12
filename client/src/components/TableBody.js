import React from 'react'
import { Table } from 'semantic-ui-react'

class TableBody extends React.Component {
  render(){

    const fieldName = this.props.fieldName;
    const data = this.props.data;
    const appIds = this.props.appIds;

    const dataRow = data.map((element, i) =>
          <Table.Row key={i.toString()}>
            <Table.Cell>{element[fieldName]}</Table.Cell>
            {appIds.map((app, j) =>
                    <Table.Cell key={j.toString()}> {element['counts'][app.app_id]} </Table.Cell>
                )}
          </Table.Row>
        );

        return (
            <tbody>
                {dataRow}
            </tbody>
        );

  }
}

export default TableBody;
