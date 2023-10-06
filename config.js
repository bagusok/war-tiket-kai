export const config = {
  apiUrl: "https://different-tan-toad.cyclic.app",
  token:
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIkMnkkMTAkQmNrYy5kU25YSjR4eWxOWFpiUS4wT016QXBnSmxXMmxWUXIxMHpLUmIxbGRScU93OFhYVS58dHJpdzQxMDA4QGdtYWlsLmNvbXxmNzNjMWY2Y2I2ZjBjMTYxfDIxMDY3MTQ2IiwiZXhwIjoxNzA1MTk1OTA1LCJpc3MiOiJodHRwczovL2thaWFjY2VzczExLmthaS5pZC9hcGkvdjEyL2F1dGgvbG9naW4ifQ.zYjzDZKngn0iXVe0dsDFC6LTt_pT2j2bWZosFOkB1bZmA6wMwRqLTJEI0xH15fvqUoGSxETt319-RupeAXvtNw",
  paymentMethod: "QRISMANDIRI",
  trip: {
    origin: "TA",
    destination: "ML",
    tripDate: "2023-10-12",
    departureTime: "1231", // if time 12:31 write 1231 (no colon)
  },

  people: [
    {
      ktp: "3504171001000001",
      fullname: "AHMAD BAEDOWI",
      email: "abc@gmai.com",
      phone: "085640000000",
    },
  ],
};
