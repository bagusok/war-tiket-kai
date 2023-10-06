import { config } from "./config.js";
import { KAI } from "./utils/Kai.js";
import fs from "fs";

(async () => {
  const kai = new KAI({
    apiUrl: config.apiUrl,
    token: config.token,
  });

  //   const login = await kai.login("triw41008@gmail.com", "Bagusok55");

  //   console.log(login);

  while (true) {
    const getLocalSchedule = await kai.getLocalSchedule({
      origin: config.trip.origin, // Your Origin
      destination: config.trip.destination, // Your Destination
      tripDate: config.trip.tripDate,
    });

    if (getLocalSchedule.code == "00") {
      const booking = await kai.booking({
        kai: getLocalSchedule.payload[2], // gunakan index array untuk menentukan jam keberangkatan kereta, silahkan di cek di console.log(getLocalSchedule)
        people: [
          {
            ktp: config.people[0].ktp, // Nomor KTP
            fullname: config.people[0].fullname, // Nama sesuai KTP
            email: config.people[0].email, // Email kai access
            phone: config.people[0].phone, // Nomor HP
          },
        ],
      });

      const getInquiry = await kai.getInquiry(booking.payload.bookcode);
      const checkout = await kai.checkoutBooking({
        payCode: getInquiry.payload[0].paycode,
        payTypeCode: "QRISMANDIRI",
        netAmount: getInquiry.payload[0].netamount,
        ticketType: undefined,
        shiftId: undefined,
        unitCodePay: getInquiry.payload[0].unitcodebook,
        channelCodeBook: getInquiry.payload[0].channelcodebook,
      });

      const getQris = await kai.getQris(
        checkout.payload.commonPaycode,
        checkout.payload.aggregateNetAmount
      );

      if (getQris.code == "00") {
        console.log(getQris);

        fs.writeFileSync(
          "./result/qris.json",
          JSON.stringify(getQris, null, 2)
        );

        break;
      } else {
        continue;
      }
    } else {
      console.log(getLocalSchedule.message);
    }

    await new Promise((r) => setTimeout(r, 60000));
  }
})();
