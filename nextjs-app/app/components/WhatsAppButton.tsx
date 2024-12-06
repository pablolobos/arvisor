import Image from 'next/image';

interface WhatsAppButtonProps {
    phoneNumber?: string;
}

export default function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
    if (!phoneNumber) return null;

    const formattedNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digits
    const whatsappUrl = `https://wa.me/${formattedNumber}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex relative items-center gap-6 bg-brand-purpleHighlight hover:bg-green-600 py-3 rounded-full font-semibold text-2xl text-white transition-colors duration-200"
        >

            <span className='pl-6'>Escríbenos</span>
            <Image src="/whatsapp.svg" alt="WhatsApp" width={40} height={40} className='flex-shrink-0 mr-3' />
        </a>
    );
} 