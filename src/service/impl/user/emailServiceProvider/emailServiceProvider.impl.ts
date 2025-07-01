import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER as string,
        pass: process.env.GMAIL_PASS as string,
    },
});

const sendEmail = async (to: string) => {
    const subject = 'Maximize Your Finances with Our Expense Tracker';

    const html = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
            line-height: 1.6;
          }
          .container {
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #4CAF50;
          }
          h2 {
            color: #333;
          }
          p {
            margin: 10px 0;
          }
          .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
          }
        </style>
      </head>
      <body>
    <div class="container">
        <h1>Dear Client,</h1>
        <p>I hope this message finds you well.</p>
        <p>I wanted to take a moment to emphasize the importance of effectively managing your online marketplace. With our Node.js eCommerce REST API, <strong>NodeMultiVendorMarketPlace</strong>, you can create a seamless shopping experience for your customers and maximize your sales potential.</p>
        
        <h2>Benefits of Using NodeMultiVendorMarketPlace:</h2>
        <ul>
            <li><strong>Multi-Vendor Support:</strong> Easily manage multiple vendors and their products within a single platform.</li>
            <li><strong>Customizable Features:</strong> Tailor the marketplace to meet your specific business needs and enhance user experience.</li>
            <li><strong>Secure Transactions:</strong> Ensure secure payment processing and data protection for all users.</li>
            <li><strong>Analytics and Insights:</strong> Gain valuable insights into sales trends and customer behavior to make informed business decisions.</li>
        </ul>
        
        <p>Our API is designed to be user-friendly, making it easier for you to build and scale your online marketplace effectively.</p>
        <p>If you have any questions or need assistance getting started, please don't hesitate to reach out. We’re here to help you succeed in your eCommerce journey!</p>
        
        <div class="footer">
            <p>Best Regards,</p>
            <p>[Asoh Yannick]<br>[Full Stack Developer]<br>[codingLamb]<br>[codinglamb@gmail.com]</p>
        </div>
    </div>
</body>
    </html>
  `;

    const mailOptions = {
        from: process.env.GMAIL_USER as string,
        to,
        subject,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
export default sendEmail;