import React from "react";
import Relay from "react-relay";

import FestivalList from "./FestivalList";

class GraphQLRelay extends React.Component {
  render() {
    return (
      <FestivalList festivals={this.props.event.festivals}></FestivalList>
    );
  }
}

export default Relay.createContainer(GraphQLRelay, {
  fragments: {
    event: () => Relay.QL`
      fragment on Event {
        festivals {
          ${FestivalList.getFragment('festivals')}
        }
      }
    `
  }
});
