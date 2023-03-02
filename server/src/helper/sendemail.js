import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (datasend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });
  console.log(datasend.email);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "buidangkhoa252001@gmail", // sender address
    to: datasend.email, // list of receivers
    subject: "Thong tin lich kham benh", // Subject line
    text: "Hello world?", // plain text body
    html: getBodyHTMLEmail(datasend),
  });
};
let getBodyHTMLEmail = (datasend) => {
    let result = `
                    <h2>Tieng viet Xin chao2 ${datasend.email}</h2>
                    <p>Chúc mừng bạn đã nhận email này</p>
                    <div>
                    <h2>Thời gian 123</h2>
                    </div>
                    <div>
                    <h2>Bác sĩ Khoa</h2>
                    </div>
                    <div>
                    <p>Hãy xác nhận qua đường link</p>
                    
                    </div>
                    `;
  
  return result;
};
