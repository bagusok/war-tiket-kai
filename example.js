import { KAI } from "./utils/Kai.js";

const kai = new KAI({
  token: "Your_token",
  apiUrl: "https://different-tan-toad.cyclic.app",
});

// to get token please login first
// const login = await kai.login("okebagus426@gmail.com", "Bagusok55");
// console.log(login);

const getLocalSchedule = await kai.getLocalSchedule({
  origin: "TA", // Your Origin
  destination: "ML", // Your Destination
  tripDate: "2023-10-11",
});

// console.log(getLocalSchedule);

const booking = await kai.booking({
  kai: getLocalSchedule.payload[2], // gunakan index array untuk menentukan jam keberangkatan kereta, silahkan di cek di console.log(getLocalSchedule)
  people: [
    {
      ktp: "3504171001000001", // Nomor KTP
      fullname: "AHMAD BAEDOWI", // Nama sesuai KTP
      email: "abc@gmail.com", // Email kai access
      phone: "085640000000", // Nomor HP
    },
  ],
});

console.log(booking);

const getInquiry = await kai.getInquiry(booking.payload.bookcode);

console.log(getInquiry);

const checkout = await kai.checkoutBooking({
  payCode: getInquiry.payload[0].paycode,
  payTypeCode: "QRISMANDIRI",
  netAmount: getInquiry.payload[0].netamount,
  ticketType: undefined,
  shiftId: undefined,
  unitCodePay: getInquiry.payload[0].unitcodebook,
  channelCodeBook: getInquiry.payload[0].channelcodebook,
});

console.log(checkout);
// const saveTrip = await kai.saveTrip(token, getInquiry.payload[0].paycode);

const getQris = await kai.getQris(
  checkout.payload.commonPaycode,
  checkout.payload.aggregateNetAmount
);

console.log(getQris);
