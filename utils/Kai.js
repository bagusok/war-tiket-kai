export class KAI {
  token = "";
  apiUrl = "";

  constructor({ token, apiUrl }) {
    this.token = token;
    this.apiUrl = apiUrl;
  }

  async login(username, password) {
    return await this.req("POST", "/login", {
      username,
      password,
    });
  }

  async getLocalSchedule(data) {
    return await this.req("POST", "/get-local-schedule", data);
  }

  async booking(data) {
    return await this.req("POST", "/booking", data);
  }

  async getInquiry(bookcode) {
    return await this.req("POST", `/get-inquiry`, {
      bookCode: bookcode,
    });
  }

  async checkoutBooking({
    payCode,
    payTypeCode,
    netAmount,
    ticketType,
    shiftId,
    unitCodePay,
    channelCodeBook,
  }) {
    return await this.req("POST", `/booking/checkout`, {
      payCode,
      payTypeCode,
      netAmount,
      ticketType,
      shiftId,
      unitCodePay,
      channelCodeBook,
    });
  }

  async getQris(payCode, netAmount) {
    return await this.req("POST", `/booking/get-qris`, {
      payCode: payCode,
      amount: netAmount,
    });
  }
  async req(method = "POST", url, data = {}, header = {}) {
    try {
      if (method == "POST") {
        const reqs = await fetch(this.apiUrl + url, {
          method: method,
          headers: {
            "content-type": "application/json",
            authorization: this.token,
            ...header,
          },
          body: JSON.stringify(data),
        });

        return await reqs.json();
      } else {
        const reqs = await fetch(url, {
          method: method,
          headers: {
            authorization: this.token,
            ...header,
          },
        });

        return await reqs.json();
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}
