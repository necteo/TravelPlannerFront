//http://192.168.0.4:3000/
let postData;
export class PostTools {
  constructor(ip) {
    this.serverIp = ip;
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
