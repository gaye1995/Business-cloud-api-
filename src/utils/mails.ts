import * as nodemailer from 'nodemailer';
import { config } from 'dotenv';
const emetedemail = process.env.EMAIL_USER;
const emetedpassword =  process.env.EMAIL_PASSWORD;
const notifyNew = async (email: string): Promise<void> => {
try {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: emetedemail,
            pass: emetedpassword,
        },
    });

    await transporter.sendMail({
        from: emetedemail , 
        to: email,
        subject: "Business-cloud-logiciel",
        context: 'Bienvenue'
    });

    // console.log(info);
} catch (err) {
    return console.log(`error: ${err}`); 
    }
};
export { notifyNew }