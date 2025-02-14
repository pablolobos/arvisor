import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const { name, email, phone, timeframe, projectName } = await req.json();

        if (!name || !email || !phone || !timeframe) {
            return Response.json(
                { error: 'Todos los campos son requeridos' },
                { status: 400 }
            );
        }

        const timeframeLabels: Record<string, string> = {
            'now': 'Ahora',
            'less-than-3': 'En menos de 3 meses',
            '3-to-6': 'Entre 3 a 6 meses',
            'future': 'En el futuro',
        }

        const { data, error } = await resend.emails.send({
            from: 'Advisor <hola@coordinemos.pablolobos.cl>',
            to: 'pablo@advisorrealestate.cl',
            replyTo: email,
            subject: `Consulta sobre proyecto ${projectName}`,
            html: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <title>Nueva consulta de proyecto</title>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                            .header { background-color: #f8f8f8; padding: 20px; border-radius: 5px; }
                            .content { margin-top: 20px; }
                            .footer { margin-top: 30px; font-size: 12px; color: #666; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1 style="margin: 0; color: #333;">Nueva consulta de proyecto</h1>
                            </div>
                            <div class="content">
                                <p><strong>Proyecto:</strong> ${projectName}</p>
                                <p><strong>Nombre:</strong> ${name}</p>
                                <p><strong>Email:</strong> ${email}</p>
                                <p><strong>Teléfono:</strong> ${phone}</p>
                                <p><strong>Plazo de compra:</strong> ${timeframeLabels[timeframe]}</p>
                            </div>
                            <div class="footer">
                                <p>Este mensaje fue enviado desde el formulario de contacto de proyecto.</p>
                            </div>
                        </div>
                    </body>
                </html>
            `,
        });

        if (error) {
            console.error('Resend API error:', error);
            return Response.json(
                { error: 'No se pudo enviar el mensaje. Por favor, intenta nuevamente.' },
                { status: 500 }
            );
        }

        return Response.json(
            { message: 'Mensaje enviado exitosamente' },
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