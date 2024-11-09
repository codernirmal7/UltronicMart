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
            padding: 1rem;
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
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 1rem;
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
        @media only screen and (max-width: 600px) {
           
            .header h1 {
                font-size: 20px;
            }
            .content h2 {
                font-size: 18px;
            }
            .content p {
                font-size: 14px;
            }
            .code {
                font-size: 20px;
                padding: 8px;
            }
            .button {
                padding: 12px 25px;
                font-size: 16px;
            }
            .footer {
                font-size: 10px;
            }
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
            <p>&copy; 2024 Ultronic Mart. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`;
};

const WELCOME_EMAIL_TEMPLATE = (FRONTSIDE_URL: string) => {
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
            padding: 1rem;
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

const WELCOME_BACK_EMAIL_TEMPLATE = (
  name: string,
  ipAddress: string,
  userAgent: string,
  websiteLink: string,
  contactSupport: string
) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 1rem;
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333333;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border: 1px solid #dddddd;
        }
        .email-header {
            background-color: #1F51FF;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
            text-align: center;
        }
        .email-body h2 {
            margin: 0;
            font-size: 20px;
            color: #007BFF;
        }
        .email-body p {
            font-size: 16px;
            line-height: 1.6;
            color: #555555;
            margin-top: 10px;
        }
        .email-info {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: left;
            font-size: 14px;
            color: #333333;
        }
        .email-info strong {
            display: block;
            margin-bottom: 5px;
            color: #007BFF;
        }
        .email-footer {
            background-color: #f4f4f4;
            color: #888888;
            text-align: center;
            padding: 10px;
            font-size: 14px;
        }
        .email-footer a {
            color: #007BFF;
            text-decoration: none;
        }
        
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Email Header -->
        <div class="email-header">
            <h1>Successful Login Notification</h1>
        </div>

        <!-- Email Body -->
        <div class="email-body">
            <h2>Hello ${name},</h2>
            <p>We noticed a successful login to your account. Here are the details:</p>
            
            <!-- User Agent and IP Address Information -->
            <div class="email-info">
                <strong>Login Device Information:</strong>
                <p>User Agent: <em>${userAgent}</em></p>
                <p>IP Address: <em>${ipAddress}</em></p>
            </div>

            <p>If this was you, no further action is needed. If you didn't log in, please reset your password and secure your account immediately.</p>
        </div>

        <!-- Email Footer -->
        <div class="email-footer">
            <p>Stay secure, <br>Ultronic Mart</p>
            <p><a href="${websiteLink}">Visit our website</a> | <a href="${contactSupport}">Contact support</a></p>
        </div>
    </div>
</body>
</html>
   `;
};

const RESET_PASSWORD_TEMPLATE = (resetPasswordLink: string, name: string) => {
  return `
           <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f7;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: none;
            overflow: hidden;
          
        }

        .email-wrapper {
            width: 100%;
            background-color: #f4f4f7;
            padding: 20px;
        }

        .email-content {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .email-header {
            background-color: #1F51FF;
            padding: 20px;
            text-align: center;
        }

        .email-header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
        }

        .email-body {
            padding: 30px;
        }

        .email-body h2 {
            font-size: 20px;
            margin: 0 0 20px;
            color: #333333;
        }

        .email-body p {
            margin: 0 0 20px;
            font-size: 16px;
            line-height: 1.5;
            color: #666666;
        }

        .email-body a.button {
            display: inline-block;
            background-color: #1F51FF;
            color: #ffffff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
        }

        .email-footer {
            background-color: #f4f4f7;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666666;
        }

        .email-footer p {
            margin: 0;
        }

        @media only screen and (max-width: 600px) {
            .email-body {
                padding: 20px;
            }

            .email-header h1 {
                font-size: 20px;
            }

            .email-body h2 {
                font-size: 18px;
            }

            .email-body p {
                font-size: 14px;
            }

            .email-body a.button {
                padding: 10px 20px;
                font-size: 14px;
            }
        }
    </style>
</head>

<body>
    <div class="email-wrapper">
        <div class="email-content">
            <div class="email-header">
                <h1>Password Reset Request</h1>
            </div>
            <div class="email-body">
                <h2>Hello ${name},</h2>
                <p>We received a request to reset your password. Click the button below to reset it.</p>
                <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                <p>This password reset is only valid for the next 1 hours.</p>
                <a href="${resetPasswordLink}" class="button">Reset Password</a>
            </div>
            <div class="email-footer">
                <p>If you’re having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:</p>
                <p><a href="${resetPasswordLink}" style="color: #4a90e2;">${resetPasswordLink}</a></p>
            </div>
        </div>
    </div>
</body>

</html>


        `;
};

const RESET_PASSWORD_SUCCESS_TEMPLATE = (name: string, signInUrl: string) => {
  return `
   <!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
    body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f7;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: none;
        width: 100% !important;
        height: 100% !important;
        overflow: hidden;
    }

    .email-wrapper {
        width: 100%;
        background-color: #f4f4f7;
        padding: 20px;
    }

    .email-content {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    }

    .email-header {
        background-color: #1F51FF;
        padding: 20px;
        text-align: center;
    }

    .email-header h1 {
        color: #ffffff;
        margin: 0;
        font-size: 24px;
    }

    .email-body {
        padding: 30px;
    }

    .email-body h2 {
        font-size: 20px;
        margin: 0 0 20px;
        color: #333333;
    }

    .email-body p {
        margin: 0 0 20px;
        font-size: 16px;
        line-height: 1.5;
        color: #666666;
    }

    .email-body a.button {
        display: inline-block;
        background-color: #1F51FF;
        color: #ffffff;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
    }

    .email-footer {
        background-color: #f4f4f7;
        padding: 20px;
        text-align: center;
        font-size: 14px;
        color: #666666;
    }

    .email-footer p {
        margin: 0;
    }

    @media only screen and (max-width: 600px) {
        .email-body {
            padding: 20px;
        }

        .email-header h1 {
            font-size: 20px;
        }

        .email-body h2 {
            font-size: 18px;
        }

        .email-body p {
            font-size: 14px;
        }

        .email-body a.button {
            padding: 10px 20px;
            font-size: 14px;
        }
    }
</style>
</head>

<body>
<div class="email-wrapper">
    <div class="email-content">
        <div class="email-header">
            <h1>Password Reset Successful</h1>
        </div>
        <div class="email-body">
            <h2>Hello ${name},</h2>
            <p>Your password has been successfully reset. You can now sign in using your new password.</p>
            <p>If you did not make this change, please contact our support team immediately.</p>
            <a href="${signInUrl}" class="button">Sign In Now</a>
        </div>
        <div class="email-footer">
            <p>If you’re having trouble clicking the "Sign in Now" button, copy and paste the URL below into your web browser:</p>
            <p><a href="${signInUrl}" style="color: #4a90e2;">${signInUrl}</a></p>
        </div>
    </div>
</div>
</body>

</html>


    `;
};

const ORDER_CONFIRMATION_TEMPLATE = (
  name: string,
  orderNumber: string,
  orderDate: Date,
  address: string,
  totalAmount: number,
  contactSupport: string,
  orderdHistory: string
) => {
  return `
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 1rem;
        }
        table {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-spacing: 0;
        }
        .header {
            background-color: #1F51FF;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 30px;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333333;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

        }
        .content h2 {
            color: #1F51FF;
        }
        .order-details {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .order-details th, .order-details td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        .order-details th {
            background-color: #f2f2f2;
        }
        .button {
            background-color: #1F51FF;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            display: inline-block;
            margin-top: 20px;
            border-radius: 5px;
        }
        .footer {
            background-color: #f7f7f7;
            color: #888888;
            text-align: center;
            padding: 20px;
            font-size: 14px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

        }
        .footer a {
            color: #1F51FF;
            text-decoration: none;
        }
        @media only screen and (max-width: 600px) {
            .content {
                padding: 15px;
            }
            .header h1 {
                font-size: 24px;
            }
            .order-details td, .order-details th {
                font-size: 14px;
                padding: 8px;
            }
            .button {
                padding: 8px 15px;
            }
        }
    </style>
</head>
<body>
    <table>
        <!-- Header Section -->
        <tr>
            <td class="header">
                <h1>Order Confirmation</h1>
            </td>
        </tr>
        <!-- Content Section -->
        <tr>
            <td class="content">
                <h2>Thank you for your order, ${name}!</h2>
                <p>Your order has been successfully received and is being processed. Below are your order details:</p>

                <!-- Order Details Table -->
                <table class="order-details">
                    <tr>
                        <th>Order ID</th>
                        <td>${orderNumber}</td>
                    </tr>
                    <tr>
                        <th>Order Date</th>
                        <td>${orderDate}</td>
                    </tr>
                    <tr>
                        <th>Shipping Address</th>
                        <td>${address}</td>
                    </tr>
                    <tr>
                        <th>Order Total</th>
                        <td>${totalAmount}</td>
                    </tr>
                </table>

                <p>If you have any questions, feel free to <a href="${contactSupport}" style="color: #1F51FF;">contact us</a>.</p>

                <!-- Call-to-Action Button -->
                <a href="${orderdHistory}" class="button">View Order Details</a>
            </td>
        </tr>
        <!-- Footer Section -->
        <tr>
            <td class="footer">
                <p>Thank you for choosing Untronic Mart.</p>
            </td>
        </tr>
    </table>
</body>
</html>


    `;
};

export {
  EMAIL_VERIFICATION_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  WELCOME_BACK_EMAIL_TEMPLATE,
  RESET_PASSWORD_TEMPLATE,
  RESET_PASSWORD_SUCCESS_TEMPLATE,
  ORDER_CONFIRMATION_TEMPLATE,
};
