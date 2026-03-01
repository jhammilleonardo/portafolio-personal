import type { APIRoute } from 'astro';
import { query } from '../../lib/db';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Nombre, email y mensaje son requeridos.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Email inválido.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name.trim(), email.trim(), subject?.trim() ?? null, message.trim()]
    );

    try {
      const profiles = await query<any>('SELECT email FROM profile LIMIT 1');
      const destinationEmail = profiles.length > 0 && profiles[0].email ? profiles[0].email : process.env.SMTP_USER;

      if (process.env.SMTP_USER && process.env.SMTP_PASS && destinationEmail) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Portafolio" <${process.env.SMTP_USER}>`,
          to: destinationEmail,
          replyTo: email.trim(),
          subject: subject?.trim() ? `Nuevo mensaje: ${subject.trim()}` : `Nuevo mensaje de ${name.trim()}`,
          text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
          html: `<p><strong>Nombre:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Mensaje:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`
        });
      }
    } catch (emailError) {
      console.error('Error enviando el correo:', emailError);
    }

    return new Response(JSON.stringify({ message: 'Mensaje enviado correctamente.' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error general:', err);
    return new Response(JSON.stringify({ error: 'Error al guardar el mensaje.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
