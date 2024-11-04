const EMAIL_VERIFICATION_TEMPLATE = (
  verificationCode: string,
  verificationLink: string
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #1F51FF;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .content h2 {
            font-size: 20px;
            margin-bottom: 10px;
        }
        .content p {
            line-height: 1.6;
        }
        .code {
            font-size: 24px;
            font-weight: bold;
            color: #1F51FF;
            background-color: #f0f0f0;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #1F51FF;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #153d99;
        }
        .footer {
            background-color: #f7f7f7;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Verification</h1>
        </div>
        <div class="content">
            <h2>Hello User,</h2>
            <p>Thank you for registering with Ultronic Mart! To complete your registration, please verify your email address using the code below:</p>
            <div class="code">${verificationCode}</div>
            <p>Enter this code in the verification field on our website to activate your account.</p>
            <p>If you did not create an account, you can safely ignore this email.</p>
            <a href="${verificationLink}" class="button">Verify Email</a>
        </div>
        <div class="footer">
            <p>&copy; [Year] Ultronic Mart. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`;
};

const WELCOME_EMAIL_TEMPLATE = (FRONTSIDE_URL : string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #1F51FF;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .content h2 {
            font-size: 20px;
            margin-bottom: 10px;
        }
        .content p {
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #1F51FF;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #153d99;
        }
        .footer {
            background-color: #f7f7f7;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Ultronic Mart!</h1>
        </div>
        <div class="content">
            <h2>Hello User,</h2>
            <p>We’re thrilled to have you on board! At Ultronic Mart, we strive to provide you with the best experience possible. Our team is dedicated to ensuring that you have everything you need to make the most of our services.</p>
            <p>To get started, we invite you to explore our website and discover all the exciting features we offer. If you have any questions, feel free to reach out to our support team at any time.</p>
            <a href="${FRONTSIDE_URL}" class="button">Get Started</a>
        </div>
        <div class="footer">
            <p>Thank you for joining us!</p>
            <p>&copy; 2024 Ultronic Mart. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`;
};

export { EMAIL_VERIFICATION_TEMPLATE, WELCOME_EMAIL_TEMPLATE };
