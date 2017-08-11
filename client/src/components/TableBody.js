import React from 'react'

class TableBody extends React.Component {
  render(){

    const fieldName = this.props.fieldName;
    const data = this.props.data;
    const appIds = this.props.appIds;

    const dataRow = data.map((element, i) =>
          <tr key={i.toString()}>
            <td>{element[fieldName]}</td>
            {appIds.map((app, j) =>
                    <td key={j.toString()}> {element['counts'][app.app_id]} </td>
                )}
          </tr>
        );

        return (
            <tbody>
                {dataRow}
            </tbody>
        );

  }
}

export default TableBody;