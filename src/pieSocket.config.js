import PieSocket from "piesocket-js/src/PieSocket";

const pieSocket = new PieSocket({
  clusterId: process.env.REACT_APP_PIESOCKET_CLUSTER_ID,
  apiKey: process.env.REACT_APP_PIESOCKET_API_KEY,
});

export default pieSocket;
