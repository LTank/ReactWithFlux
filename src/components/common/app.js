/*eslint-disable strict */ //Disbling strict check because i can't run strict mode with global vars.

var React = require('react');
var Header = require('./common/header');
var RouteHandler = require('react-router').RouteHandler;
$ = jQuery = require('jquery'); // defines jquery globally with both 'jQuery' and 'require=('jquery')'


var App = React.createClass({
    render: function() {
        return (
            <div>
                <Header/>
                <div className="container-fluid">
                    <RouteHandler/>
                </div>
            </div>
        );
    }
});

module.exports = App;