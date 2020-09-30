import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerme-3c86d.firebaseio.com/"
});

export default instance;
