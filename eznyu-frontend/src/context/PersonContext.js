import React, { Component } from "react";

const ProfessorContext = React.createContext();

class ProfessorProvider extends Component {
    state = {
        endpoint: "http://localhost:4001",
        professors: []   
    };
    render() {
        return <ProfessorContext.Provider value={{
            ...this.state
        }}> {this.props.children} </ProfessorContext.Provider>
    }
}