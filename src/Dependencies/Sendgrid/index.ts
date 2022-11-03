import sgMail, { ClientResponse, MailDataRequired } from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

type params = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
};

const createTemplate = ({
  to,
  from,
  subject,
  text,
  html,
}: params): MailDataRequired => ({
  to,
  from,
  subject,
  text,
  content: [
    {
      type: "text/html",
      value: html,
    },
  ],
});

const sendMail = async (
  template: MailDataRequired
): Promise<[ClientResponse, {}]> => {
  return await sgMail.send(template);
};

export { createTemplate, sendMail };
