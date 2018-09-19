"use strict"; // tells js that we are using js in strict mode

var React = require('react'); // defines that we are using react
var Router = require('react-router');
var Link = Router.Link;

//React component
var Home = React.createClass({
    render: function() {
        return (
            <div className="jumbotron">
                <h1>S.lfr</h1>
                <p>React, React Router, and Flux for ultra-responsive web apps.</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
            </div>
        );
    }
});

module.exports = Home;