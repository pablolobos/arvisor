import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { email, name } = data;

        if (!email) {
            return Response.json(
                { error: 'El correo electrónico es requerido' },
                { status: 400 }
            );
        }

        // Send notification email
        const { data: emailData, error } = await resend.emails.send({
            from: 'Advisor <hola@coordinemos.pablolobos.cl>',
            to: 'autolead@advisorrealestate.cl',
            subject: name ? 'Nueva suscripción al newsletter' : 'Nuevo contacto de proyecto',
            html: `
                ${name ? `${name}` : ''}
                - ${email}
            `,
        });

        if (error) {
            console.error('Resend API error:', error);
            return Response.json(
                { error: 'No se pudo procesar la suscripción. Por favor, intenta nuevamente.' },
                { status: 500 }
            );
        }

        return Response.json(
            { message: 'Suscripción exitosa' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Server error:', error);
        return Response.json(
            { error: 'Error del servidor. Por favor, intenta nuevamente.' },
            { status: 500 }
        );
    }
} 