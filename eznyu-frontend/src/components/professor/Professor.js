import React from "react";
import { Button, Table, Form } from "react-bootstrap";

class Professor extends React.Component {

  delete() {
    this.props.deleteProf(this.props.id);
  }

  render() {
    return (
      <div id={this.props.id} className="professor">
        <div style={{ fontSize: '30px', color: '#286AD2', fontFamily: 'Arial' }}>
          <Table striped bordered hover size="sm"
            style={{ tableLayout: 'auto', width: '80%', marginLeft: '10%', marginRight: '10%' }}>
            <tbody >
              <tr>
                <td style={{ color: '#286AD2', fontFamily: 'Arial', width: '50%' }}>
                  <p> {this.props.name} </p>
                </td>
                <td style={{ width: '25%' }}>
                  <Button variant="primary" style={{ display: 'inline-block' }} onClick={this.delete.bind(this)} >
                    Delete
                  </Button>
                </td>
                <td style={{ width: '25%' }}>
                  <Form method='get' action='/'>
                    <Button variant="primary" style={{ display: 'inline-block' }} type="submit" formAction={`/professor/${this.props.id}`}>
                      View
                    </Button>
                  </Form>
                </td>
              </tr>
            </tbody>
          </Table>
          {/* <button className="delete-btn" onClick={this.delete.bind(this)}> Delete </button> */}
        </div>
      </div>
    )
  }
}

export default Professor;