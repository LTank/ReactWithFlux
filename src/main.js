"use strict";
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

// Router.HistoryLocation makes urls clean
Router.run(routes, /*Router.HistoryLocation,*/ function(Handler) { 
    React.render(<Handler/>, document.getElementById('app'));
});


// react.render takes 2 parameters. 
//1) is the component youd like to render (Home).
//2) is the DOM element that youd like to attach your application too. (document.getElementById('app'))
//React.render(<Home />, document.getElementById('app')); 