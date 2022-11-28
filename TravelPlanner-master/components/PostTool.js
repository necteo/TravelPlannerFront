//http://192.168.0.6:3000/
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

  postWithData(url, reqData) {
    fetch(this.serverIp + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        return JSON.stringify(data);
      })
      .catch((error) => console.log("Error : " + error));
    //return JSON.stringify(data);
  }
}
