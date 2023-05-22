import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080",
  // baseURL: "https://my-json-server.typicode.com/duckodei/dsocial-json-server",
  params: {
    // key: "d3711183e9394fbbac3f6648edd7b832",
  },
});
