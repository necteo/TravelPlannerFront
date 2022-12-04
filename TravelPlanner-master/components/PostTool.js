//http://192.168.0.4:3000/
export class PostTools {
  constructor() {
    this.serverIp = "http://180.71.161.34:3000/";
    this.abortController = null;
  }
  async post(url) {
    this.abortController = new AbortController();
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

  async postWithDataForOt(url, reqData, isAbort) {
    this.abortController = new AbortController();
    const data = await fetch(this.serverIp + url, {
      signal: this.abortController.signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqData,
    }).then((response) => response.json());

    if (!isAbort) {
      this.abortController.abort();
    }

    return JSON.stringify(data);
  }
}
