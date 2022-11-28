//http://192.168.0.4:3000/
let postData;
export class PostTools {
  constructor(ip) {
    this.serverIp = ip;
  }
  post(url) {
    fetch(this.serverIp + url, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        return JSON.stringify(data);
      })
      .catch((error) => console.log("Error : " + error));
  }

  async postWithData(url, reqData) {
    let res;
    const data = await fetch(this.serverIp + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqData,
    }).then((response) => response.json());
    res = JSON.stringify(data);
    console.log("postWithData");
    console.log(res);
    return res;
  }
}
