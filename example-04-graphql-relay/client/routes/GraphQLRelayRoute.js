import Relay from "react-relay";

export default class extends Relay.Route {
  static path = "/";
  static queries = {
    event: (Component) => Relay.QL`
      query {
        event {
          ${Component.getFragment('event')},
        },
      }
    `
  };
  static routeName = "GraphRelayRoute";
}
