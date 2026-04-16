import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DataFlow Studio — Plataforma de Dashboarding Empresarial',
  description:
    'Plataforma B2B para gestión, diseño y entrega de dashboards interactivos. Conecta empresas con elaboradores de datos especializados.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
