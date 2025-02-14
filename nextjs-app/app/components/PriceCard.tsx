import { formatCurrency } from '@/lib/utils'

interface PriceCardProps {
    price?: string
    priceDetail?: string
    downPayment?: string
    downPaymentDetail?: string
    balance?: string
    balanceDetail?: string
    monthlyFee?: number
}

export default function PriceCard({
    price = '',
    priceDetail,
    downPayment,
    downPaymentDetail,
    balance,
    balanceDetail,
    monthlyFee
}: PriceCardProps) {
    return (
        <div className="flex flex-col gap-4 px-4 py-6 border border-gray-200 rounded-lg">
            <div className="flex flex-col">
                <p className="font-light text-2xl md:text-3xl">
                    <span className="font-semibold">{price}</span>
                    {priceDetail && (
                        <span className="ml-2 text-base">{priceDetail}</span>
                    )}
                </p>
            </div>

            {downPayment && (
                <div className="flex flex-col">
                    <p className="font-medium text-xl">
                        Pie: {downPayment}
                    </p>
                    {downPaymentDetail && (
                        <p className="text-gray-600 text-sm">
                            {downPaymentDetail}
                        </p>
                    )}
                </div>
            )}

            {balance && (
                <div className="flex flex-col">
                    <p className="font-medium text-xl">
                        Saldo: {balance}
                    </p>
                    {balanceDetail && (
                        <p className="text-gray-600 text-sm">
                            {balanceDetail}
                        </p>
                    )}
                </div>
            )}

            {monthlyFee && monthlyFee > 0 && (
                <p className="font-regular text-xl">
                    Cuota mensual {formatCurrency(monthlyFee)}
                </p>
            )}
        </div>
    )
} 