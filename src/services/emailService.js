require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Booking👻" <lightsown100kg@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `<h3>Xin chào ${dataSend.patientName}!</h3>
    <p>--------------------------------------------------------------</p> 
    <p>Xác minh địa chỉ email đặt lịch khám bệnh</p>
    <p>--------------------------------------------------------------</p> 
    <p>Thông tin đặt lịch khám bệnh: </p>
    <div><b>Thời gian : ${dataSend.time}</b></div>
    <div><b>Bác sĩ : ${dataSend.doctorName}</b></div>
    <br>
    <p>--------------------------------------------------------------</p> 
    <p> Hoàn tất quá trình đặt lịch khám</p>
    <p>--------------------------------------------------------------</p>
    <p>Vui lòng truy cập vào đường dẫn URL bên dưới.</p>
    <p>URL : <a href='${dataSend.redirectLink}' target="_blank">Click vào đây để xác nhận.</a></p>
    <p>--------------------------------------------------------------</p>
    <p>Xin cám ơn.</p>
    `;
  }
  if (dataSend.language === "en") {
    result = `<h3>Dear ${dataSend.patientName}!</h3>
    <p>--------------------------------------------------------------</p> 
    <p>Verify email address for appointment booking</p>
    <p>--------------------------------------------------------------</p> 
    <p>Information to book a medical appointment: </p>
    <div><b>Time : ${dataSend.time}</b></div>
    <div><b>Doctor : ${dataSend.doctorName}</b></div>
    <br>
    <p>--------------------------------------------------------------</p> 
    <p> Complete the appointment booking process</p>
    <p>--------------------------------------------------------------</p>
    <p>Please click the URL below.</p>
    <p>URL : <a href='${dataSend.redirectLink}' target="_blank">Click here to confirm.</a></p>
    <p>--------------------------------------------------------------</p>
    <p>Thank you.</p>
    `;
  }
  return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `<h3>Xin chào ${dataSend.patientName}!</h3>
    <p>--------------------------------------------------------------</p> 
    <p>Đã đặt lịch khám thành công</p>
    <p>--------------------------------------------------------------</p> 
    <p>Xin cám ơn.</p>
    `;
  }
  if (dataSend.language === "en") {
    result = `<h3>Dear ${dataSend.patientName}!</h3>
    <p>--------------------------------------------------------------</p> 
    <p>You success</p>
    <p>--------------------------------------------------------------</p>
    <p>Thank you.</p>
    `;
  }
  return result;
};

let sendAttachment = (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Booking👻" <lightsown100kg@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: {
          filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
          content: dataSend.imgBase64.split("base64,")[1],
          encoding: "base64",
        },
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  getBodyHTMLEmail: getBodyHTMLEmail,
  sendAttachment: sendAttachment,
};
