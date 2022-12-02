//http://192.168.0.4:3000/
export class PostTools {
  constructor() {
    this.serverIp = "http://180.71.161.34:3000/";
  }
  async post(url) {
    const data = await fetch(this.serverIp + url, {
      method: "POST",
    }).then((response) => response.json());

    return JSON.stringify(data);
  }

  async postWithData(url, reqData) {
    const data = await fetch(this.serverIp + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqData,
    }).then((response) => response.json());

    return JSON.stringify(data);
  }
}
