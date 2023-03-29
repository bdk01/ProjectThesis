import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async ({redirectLink, user}) => {
  console.log(redirectLink)
  console.log(user.email)
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });
  console.log(user.email);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "buidangkhoa252001@gmail", // sender address
    to: user.email, // list of receivers
    subject: "Change password", // Subject line
    text: "This is a link for you to change a password", // plain text body
    html: getBodyHTMLEmail({ redirectLink, user }),
  });
};
let getBodyHTMLEmail = ({ redirectLink, user }) => {
  let result = `
                    <h2> Xin chao ${user.fullname}</h2>
                    <p>Vui long bam vao link duoi day de co the reset passowrd</p>
                    <div>
                     <a href=${redirectLink} target="_blank">Click here </a>
                    </div>
                    `;
  return result;
};
