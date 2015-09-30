var Paddle = require('./Paddle.jsx');
var React = require('react');
var Leap = require('leapjs');
var LeapPlugins = require('leapjs-plugins');

var Application = React.createClass({
  getInitialState: function() {
    return {
        activeHands: 0,
        paddleLeftY: 0,
        paddleRightY: 0
    };
  },
  componentDidMount: function() {
    var self = this;
    Leap.loop(function(frame) {
      if(frame.hands.length === 2) {
          var leftHand = frame.hands[0].type === 'left' ? frame.hands[0] : frame.hands[1];
          var rightHand = frame.hands[1].type === 'right' ? frame.hands[1] : frame.hands[0];
          var leftMil = leftHand.palmPosition[1];
          var rightMil = rightHand.palmPosition[1];

          var windowHeight = window.innerHeight;
          var paddleHeight = windowHeight / 2;
          if(leftMil >= 100 && leftMil <= 300) {
              var leftPercent = (leftMil - 100) / 2;
              var leftTopMargin = ((windowHeight - paddleHeight) / 100) * leftPercent;

              self.onLeftHandMove((windowHeight - paddleHeight) - leftTopMargin);
          }

          if(rightMil >= 100 && rightMil <= 300) {
              var rightPercent = (rightMil - 100) / 2;
              var rightTopMargin = ((windowHeight - paddleHeight) / 100) * rightPercent;

              self.onRightHandMove((windowHeight - paddleHeight) - rightTopMargin);
          }
      }
    })
    .use('handEntry')
    .on('handFound', function(event) {
        self.setState({
            activeHands: self.state.activeHands + 1
        });
    })
    .on('handLost', function(event) {
        self.setState({
            activeHands: self.state.activeHands - 1
        });
    });
  },
  onLeftHandMove: function(y) {
     this.setState({ paddleLeftY: y });
  },
  onRightHandMove: function(y) {
     this.setState({ paddleRightY: y });
  },
  render: function() {
    var style = {
      backgroundColor: this.state.activeHands === 2 ? '#222' : '#661111',
      height: '100%',
      width: '100%'
    };
    return (
      <div style={ style }>
        <Paddle float='left' marginTop={ this.state.paddleLeftY }/>
        <Paddle float='right' marginTop={ this.state.paddleRightY }/>
      </div>
    );
  }
});

module.exports = Application;
