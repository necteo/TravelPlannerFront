<<<<<<< HEAD
//http://192.168.0.4:3000/
=======
//http://192.168.0.6:3000/
>>>>>>> upstream/master
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
<<<<<<< HEAD
    let res;
=======
>>>>>>> upstream/master
    const data = await fetch(this.serverIp + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqData,
    }).then((response) => response.json());
<<<<<<< HEAD
    res = JSON.stringify(data);
    console.log("postWithData");
    console.log(res);
    return res;
=======

    return JSON.stringify(data);
>>>>>>> upstream/master
  }
}
