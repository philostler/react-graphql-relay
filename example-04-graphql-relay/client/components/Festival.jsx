import React from "react";
import Relay from "react-relay";

class Festival extends React.Component {
  render() {
    return (
      <div>
        <li>{this.props.festival.name}</li>
      </div>
    );
  }
}

export default Relay.createContainer(Festival, {
  fragments: {
    festival: () => Relay.QL`
      fragment on Festival {
        name
      }
    `
  }
});

// <li>{this.props.festival.name} ({this.props.festival.tags.join(", ")})</li>
// tags
