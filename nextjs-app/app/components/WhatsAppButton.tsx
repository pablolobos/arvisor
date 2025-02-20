'use client'

import Image from 'next/image';
import { trackEvent, AnalyticEvents } from '@/lib/analytics'
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
    phoneNumber?: string;
}

export default function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
    if (!phoneNumber) return null;

    const formattedNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digits
    const whatsappUrl = `https://wa.me/${formattedNumber}`;

    const handleClick = () => {
        trackEvent(AnalyticEvents.WHATSAPP_CLICK, {
            location: 'general',
            // Add any other relevant properties
        })
        window.open(whatsappUrl, '_blank')
    }

    return (
        <Button onClick={handleClick} className="inline-flex relative items-center gap-2 md:gap-6 bg-brand-purpleHighlight hover:bg-green-600 py-6 rounded-full font-semibold text-white text-base md:text-xl transition-colors duration-200">
            <span className='pl-3 md:pl-6'>Hablemos</span>
            <Image src="/whatsapp.svg" alt="WhatsApp" width={30} height={30} className='md:flex-shrink-0 mr-3 md:mr-6' />
        </Button>
    );
} 