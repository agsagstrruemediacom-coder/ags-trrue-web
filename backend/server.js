const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors({
    origin: "*"
}));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("AGS TRRUE MEDIA Backend Running");
});


app.post("/enquiry", async (req, res) => {

    const { name, email, subject, message } = req.body;

    console.log("New Enquiry Received:");
    console.log(req.body);


    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });


    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Website Enquiry - " + subject,
        text:
`
Name: ${name}

Email: ${email}

Subject: ${subject}

Message:
${message}
`
    };


    try {

        await transporter.sendMail(mailOptions);

        res.json({
            message: "Your enquiry has been sent successfully!"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Email sending failed"
        });

    }

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});