var React = require("react");
var ReactDOM = require("react-dom");

var Hello = require("./Hello");

ReactDOM.render(<Hello name="React"/>, document.getElementById("app"));

// Compiles to...
// ReactDOM.render(React.createElement(Hello, { name: "React" }), document.getElementById("app"));
