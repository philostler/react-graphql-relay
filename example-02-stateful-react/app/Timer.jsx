var React = require("react");

var Timer = React.createClass({
  getInitialState: function() {
    return {
      seconds: 0
    };
  },
  componentDidMount: function() {
    this.interval = setInterval(this.onTick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <div>Seconds: {this.state.seconds}</div>
    );
  },
  onTick: function() {
    this.setState({
      seconds: this.state.seconds + 1
    });
  }
});

module.exports = Timer;
