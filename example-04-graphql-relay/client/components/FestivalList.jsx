import React from "react";
import Relay from "react-relay";

import Festival from "./Festival";

class FestivalList extends React.Component {
  render() {
    return (
      <ol>
          { this.props.festivals.map(festival => {
            return <Festival key={festival.id} festival={festival}/>
          })}
      </ol>
    );
  }
}

export default Relay.createContainer(FestivalList, {
  fragments: {
    festivals: () => Relay.QL`
      fragment on Festival @relay(plural: true) {
        id
        ${Festival.getFragment('festival')}
      }
    `
  }
});
