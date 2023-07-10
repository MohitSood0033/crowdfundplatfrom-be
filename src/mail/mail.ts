const nodemailer = require("nodemailer");
var fs = require("fs");
var htmlstream = fs.createReadStream("email.html");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mohit_sood@inclusionsoft.com",
    pass: "gjnmwwbgqdyxkiwg",
  },
  logger: true,
});

const sendMail = () => {
  console.log("maillll");
  let mainOptions = {
    from: "mohitsood@gmail.com",
    to: "",
    subject: "Test Email Subject",
    html: "<h1>Order Successful!!!</h1>",
  };
  transporter.sendMail(mainOptions, (err : any, info: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log("infoooooooooooooo", info);
      console.log(`mail send ${info.response}`);
    }
  });
};
module.exports = { sendMail };
