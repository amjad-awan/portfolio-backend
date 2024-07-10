import NodeMailer from 'nodemailer';

const transporter = NodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amjadmalikf53@gmail.com',
    pass: 'ayfe rmre ptno fiuo',
  },
});

export const nodeMailer = async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    // Mail options for the admin notification
    const adminMailOptions = {
      from: email,
      to: 'amjadmalikf53@gmail.com',
      subject: 'New Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <table width="100%" style="border-collapse: collapse;">
            <tr>
              <td style="background-color: #4CAF50; padding: 20px; text-align: center;">
                <h1 style="color: #fff; margin: 0;">New Form Submission</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <p style="font-size: 16px; margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
                <p style="font-size: 16px; margin-bottom: 10px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0066cc;">${email}</a></p>
                <p style="font-size: 16px; margin-bottom: 10px;"><strong>Phone:</strong> ${phone}</p>
                <p style="font-size: 16px; margin-bottom: 10px;"><strong>Message:</strong></p>
                <p style="border-left: 4px solid #ddd; padding-left: 10px; color: #555; white-space: pre-line;">${message}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; text-align: center; color: #777; border-top: 1px solid #ddd;">
                <p style="margin: 0;">This email was sent from your portfolio website.</p>
              </td>
            </tr>
          </table>
        </div>
      `,
    };

    // Mail options for the confirmation email to the sender
    const confirmationMailOptions = {
      from: 'amjadmalikf53@gmail.com',
      to: email,
      subject: 'Confirmation of Your Submission',
      text: `Hello ${name},\n\nThank you for reaching out! We have received your message and will get back to you shortly.\n\nHere are the details you submitted:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\n\nBest regards,\nAmjad Malik`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <table width="100%" style="border-collapse: collapse;">
            <tr>
              <td style="background-color: #4CAF50; padding: 20px; text-align: center;">
                <h1 style="color: #fff; margin: 0;">Thank You for Your Submission</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <p style="font-size: 16px;">Dear ${name},</p>
                <p style="font-size: 16px;">Thank you for reaching out! We have received your message and will get back to you shortly.</p>
                <p style="font-size: 16px;"><strong>Here are the details you submitted:</strong></p>
                <p style="font-size: 16px; margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
                <p style="font-size: 16px; margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
                <p style="font-size: 16px; margin-bottom: 10px;"><strong>Phone:</strong> ${phone}</p>
                <p style="font-size: 16px; margin-bottom: 10px;"><strong>Message:</strong></p>
                <p style="border-left: 4px solid #ddd; padding-left: 10px; color: #555; white-space: pre-line;">${message}</p>
                <p style="font-size: 16px;">Best regards,</p>
                <p style="font-size: 16px;">Muhammad Amjad Mehmood</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; text-align: center; color: #777; border-top: 1px solid #ddd;">
                <p style="margin: 0;">This email was sent from your portfolio website.</p>
              </td>
            </tr>
          </table>
        </div>
      `,
    };

    // Send email to admin
    await transporter.sendMail(adminMailOptions);

    // Send confirmation email to the sender
    await transporter.sendMail(confirmationMailOptions);

    res.status(200).json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form', error });
  }
};
