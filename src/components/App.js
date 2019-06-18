import React, { Component } from 'react';
import { Route } from "react-router-dom";
import HomePage from "./HomePage";
import TopNavigation from "./TopNavigation";
import GamePage from "./GamePage";
import ShowGamePage from "./ShowGamePage"

class App extends Component {
    render() {
        return (
            <div className="ui container">
                <TopNavigation />
                <Route path="/" exact component={HomePage} />
                <Route path="/games" component={GamePage} />
                <Route path="/game/:_id" exact component={ShowGamePage} />
            </div>
        );
    }
}

export default App;