import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return Response.json(
                { error: 'El correo electrónico es requerido' },
                { status: 400 }
            );
        }

        // Here you would typically add the email to your newsletter service
        // For now, we'll just send a notification email
        const { data, error } = await resend.emails.send({
            from: 'Advisor <hola@coordinemos.pablolobos.cl>',
            to: 'pablo@advisorrealestate.cl',
            subject: 'Nueva suscripción al newsletter',
            html: `
                <p>Nueva suscripción al newsletter:</p>
                <p><strong>Email:</strong> ${email}</p>
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