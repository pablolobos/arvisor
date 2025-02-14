import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatUF(value: string | number | undefined): string {
  if (!value) return '0 UF'

  // If value is a string, try to convert it to a number
  const numValue = typeof value === 'string' ? parseFloat(value) : value

  // Check if conversion was successful
  if (isNaN(numValue)) return '0 UF'

  return `${numValue.toLocaleString('es-CL')} UF`
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(amount)
    .replace('CLP', '$')
}
