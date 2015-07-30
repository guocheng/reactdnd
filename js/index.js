var React = require('react');

var Test = React.createClass({
    render: function () {
        return (
            <p> works </p>
        );
    }
});

React.render(
    <Test />,
    document.getElementById('app')
);
