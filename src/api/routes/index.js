import axios from "axios";
import AuthApi from "@/api/routes/auth";

export default class GlobalApi {
  constructor(client = axios) {
    this.client = client;

    this.auth = new AuthApi(this.client);
  }
}
