// Importa a biblioteca SendGrid
import sgMail from '@sendgrid/mail';
import CustomError from '../errors/CustomError.js';

// Configura a chave da API do SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (recipientEmail, verificationCode) => {
    const msg = {
        to: recipientEmail, // Destinatário
        from: 'rlucasorsi@gmail.com', // Remetente verificado
        template_id:'d-7134e59d776e40bca4f5e211a9309230', // ID do template criado
        dynamic_template_data: {
            code: verificationCode, // Substitui {{code}} no template
        },
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        throw new CustomError(400,"Failed to send reset code email.");
    }
};