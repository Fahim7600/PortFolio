import type { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export async function handleContactFormSubmit(req: Request, res: Response) {
  const { name, email, subject, message } = req.body;

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  // Double check environment variables are set up
  if (!gmailUser || !gmailPass) {
    console.error('SERVER ERROR: Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment config.');
    return res.status(500).json({
      error: 'Mail server is currently misconfigured. Please contact the administrator directly at arfanahmedfahim832@gmail.com.',
    });
  }

  try {
    // Configure Gmail SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

    // 1. Send email TO portfolio owner (arfanahmedfahim832@gmail.com)
    const ownerMailOptions = {
      from: `"Portfolio Contact Form" <${gmailUser}>`,
      to: 'arfanahmedfahim832@gmail.com',
      replyTo: email,
      subject: `[Contact Form] ${subject} — from ${name}`,
      text: `
You have received a new message from your portfolio contact form:

--------------------------------------------------
Sender Name: ${name}
Sender Email: ${email}
Subject: ${subject}
Date Received: ${timestamp} UTC
--------------------------------------------------

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-top: 0;">New Contact Form Message</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="font-weight: bold; width: 120px; padding: 6px 0;">Sender Name:</td>
              <td style="padding: 6px 0;">${name}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 6px 0;">Sender Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 6px 0;">Subject:</td>
              <td style="padding: 6px 0;">${subject}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 6px 0;">Timestamp:</td>
              <td style="padding: 6px 0; color: #666; font-size: 0.9em;">${timestamp} UTC</td>
            </tr>
          </table>
          <div style="background-color: #f8fafc; border-left: 4px solid #4f46e5; padding: 15px; border-radius: 4px; font-style: italic;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
    };

    // 2. Send confirmation auto-reply TO submitter
    const autoReplyMailOptions = {
      from: `"Arfan Ahmed Fahim" <${gmailUser}>`,
      to: email,
      subject: `Thanks for reaching out! — Re: ${subject}`,
      text: `
Hi ${name},

Thanks for reaching out to me through my portfolio website! I have received your message regarding "${subject}" and will get back to you as soon as possible.

Best regards,
Arfan Ahmed Fahim
Full Stack Developer
arfanahmedfahim832@gmail.com
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <p>Hi ${name},</p>
          <p>Thanks for reaching out to me through my portfolio website!</p>
          <p>I have received your message regarding <strong>&quot;${subject}&quot;</strong> and will get back to you as soon as possible.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="margin-bottom: 0;">Best regards,</p>
          <p style="font-weight: bold; margin-top: 5px; color: #4f46e5; margin-bottom: 0;">Arfan Ahmed Fahim</p>
          <p style="color: #666; font-size: 0.9em; margin-top: 2px;">Full Stack Developer</p>
          <p style="font-size: 0.9em; margin-top: 2px;"><a href="mailto:arfanahmedfahim832@gmail.com">arfanahmedfahim832@gmail.com</a></p>
        </div>
      `,
    };

    // Trigger both sends concurrently
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(autoReplyMailOptions),
    ]);

    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Nodemailer SMTP Email Send Failure:', error);
    // Return structured failure response hiding internal credentials or smtp servers
    return res.status(502).json({
      error: 'Failed to deliver emails. The SMTP connection was rejected or timed out. Please try again or email directly.',
    });
  }
}
