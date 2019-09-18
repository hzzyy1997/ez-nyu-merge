import React from "react";
import { Table, Button, Form } from "react-bootstrap"

class Course extends React.Component {
  delete() {
    this.props.deleteCourse(this.props.id);
  }

  render(){
    console.log(this.props);
    return (
      <div id={this.props.id} className="course" style={{ textAlign: "center" }}>
        <div style={{ fontSize: '30px', color: '#286AD2', fontFamily: 'Arial' }}>
          <Table striped bordered hover size="sm"
            style={{ tableLayout: 'auto', width: '80%', marginLeft: '10%', marginRight: '10%' }}>
            <tbody >
              <tr>
                <td style={{ color: '#286AD2', fontFamily: 'Arial', width: '5%' }}>
                  <p> {this.props.name} </p>
                </td>
                <td style={{ color: '#286AD2', fontFamily: 'Arial', width: '5%' }}>
                  <p> {this.props.code} </p>
                </td>
                <td style={{ color: '#286AD2', fontFamily: 'Arial', width: '65%', fontSize: '15px', textAlign: "left" }}>
                  <p> {this.props.description} </p>
                </td>
                <td style={{ width: '12.5%' }}>
                  <Button variant="primary" style={{ display: 'inline-block' }} onClick={this.delete.bind(this)} >
                    Delete
                  </Button>
                </td>
                <td style={{ width: '12.5%' }}>
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
      // <div id={this.props.id} className="course" style={{ textAlign: "center" }}>
      //   <div style={{ backgroundColor: "linen", width: "500px", display: "inline-block" }}>
      //     <p>Course name : {this.props.name}</p>
      //     <p>Course Id : {this.props.code}</p>
      //     <p>Course Description : {this.props.description}</p>
      //   </div>
      //   <div>
      //     <button className="delete-btn" onClick={this.delete.bind(this)} style={{ display: "inline-block"}}> delete </button>
      //     <button style={{ display: "inline" }}> Link Course to Professor </button>
      //   </div>
      //   <br />
      //   <br />
      //   <br />
      // </div>
    )
  }
}

export default Course;