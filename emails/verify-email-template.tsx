import React from "react";

interface TravelKaroEmailTemplateProps {
  name: string;
  email: string;
  verifyCode: string;
}

const TravelKaroVerifyEmailTemplate = ({
  name,
  email,
  verifyCode,
}: TravelKaroEmailTemplateProps) => {
  return (
    <html>
      <head>
        <style>
          {`
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #4a90e2;
              padding: 20px;
              text-align: center;
              color: white;
              border-radius: 5px 5px 0 0;
            }
            .content {
              padding: 20px;
              background-color: #ffffff;
              border-left: 1px solid #dddddd;
              border-right: 1px solid #dddddd;
            }
            .footer {
              background-color: #f5f5f5;
              padding: 15px;
              text-align: center;
              font-size: 12px;
              color: #777777;
              border-radius: 0 0 5px 5px;
              border: 1px solid #dddddd;
            }
            .button {
              display: inline-block;
              background-color: #4a90e2;
              color: white;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
              margin: 20px 0;
              font-weight: bold;
            }
            .verification-code {
              font-size: 24px;
              font-weight: bold;
              text-align: center;
              margin: 20px 0;
              letter-spacing: 5px;
              color: #4a90e2;
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <h1>TravelKaro</h1>
            <p>Life is a journey</p>
          </div>
          <div className="content">
            <p>Hello {name},</p>
            <p>
              Thank you for choosing TravelKaro for your travel needs. To
              complete your verification process, please use the code below:
            </p>

            <div className="verification-code">{verifyCode}</div>

            <p>
              This code will expire in 30 minutes. If you didn't request this
              verification, please ignore this email.
            </p>

            <p>Your registered email: {email}</p>

            <p>Happy travels!</p>
            <p>The TravelKaro Team</p>
          </div>
          <div className="footer">
            <p>&copy; 2025 TravelKaro. All rights reserved.</p>
            <p>
              If you have any questions, contact us at support@travelkaro.com
            </p>
          </div>
        </div>
      </body>
    </html>
  );
};

export default TravelKaroVerifyEmailTemplate;
