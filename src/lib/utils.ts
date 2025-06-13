import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateId(): string {
  return crypto.randomUUID()
}

export function formatNumber(value: string): string {
  if (isNaN(parseFloat(value))) {
    return value;
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parseFloat(value))
}

const dateFormatter = new Intl.DateTimeFormat('pt', {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
})
export function formatDate(value: Date | undefined): string {
  return dateFormatter.format(value);
}


export function getColorContrast(hex: string) {
  hex = hex.replace(/^#/, '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

  return (brightness < 120) ? 'bright' : 'dark';
}