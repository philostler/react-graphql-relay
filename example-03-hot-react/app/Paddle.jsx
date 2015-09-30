var React = require('react');

var Paddle = React.createClass({
  render: function() {
    var style = {
      backgroundColor: '#59DAFE',
      borderRadius: 24,
      float: this.props.float,
      height: '50%',
      marginTop: this.props.marginTop,
      width: 50
    };
    return <div style={ style }></div>;
  }
});

module.exports = Paddle;
