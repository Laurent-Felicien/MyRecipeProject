import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  return resend.emails.send({ from: process.env.EMAIL_FROM!, to, subject, html });
}

export async function sendVerificationEmail(user: { email: string; name: string }, token: string) {
  const url = `${process.env.APP_URL}/auth/verify-email/${token}`;
  return sendEmail({
    to: user.email,
    subject: 'MyRecipeProject — Vérifiez votre email',
    html: `<h1>Bienvenue ${user.name} !</h1><p>Cliquez ci-dessous pour vérifier votre email :</p><a href="${url}" style="background:#ee7a11;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;">Vérifier mon email</a><p>Ce lien expire dans 1 heure.</p>`,
  });
}

export async function sendContentDeletedEmail(user: { email: string; name: string }, reason: string) {
  return sendEmail({
    to: user.email,
    subject: 'MyRecipeProject — Contenu supprimé',
    html: `<h1>Bonjour ${user.name},</h1><p>Un contenu que vous avez publié a été supprimé par notre équipe de modération.</p><p><strong>Raison :</strong> ${reason}</p><p>Si vous pensez que c'est une erreur, contactez-nous à support@myrecipeproject.ci.</p>`,
  });
}

export async function sendReportDismissedEmail(user: { email: string; name: string }) {
  return sendEmail({
    to: user.email,
    subject: 'MyRecipeProject — Signalement examiné',
    html: `<h1>Bonjour ${user.name},</h1><p>Merci pour votre signalement. Après examen, le contenu ne viole pas nos règles.</p>`,
  });
}

export async function sendReportUpheldEmail(user: { email: string; name: string }) {
  return sendEmail({
    to: user.email,
    subject: 'MyRecipeProject — Action prise suite à votre signalement',
    html: `<h1>Bonjour ${user.name},</h1><p>Merci pour votre signalement. Nous avons pris des mesures concernant le contenu signalé.</p>`,
  });
}
