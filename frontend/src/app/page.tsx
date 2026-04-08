import Link from 'next/link';
import { BarChart3, Zap, Shield, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-7 w-7 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">DataFlow Studio</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="bg-primary-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Comenzar gratis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
          Dashboards empresariales{' '}
          <span className="text-primary-600">entregados por expertos</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl">
          Conectamos tu empresa con elaboradores de datos especializados para diseñar,
          construir y mantener dashboards interactivos que impulsan decisiones.
        </p>
        <div className="flex gap-4">
          <Link
            href="/register"
            className="bg-primary-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary-700 transition-colors"
          >
            Solicitar servicio
          </Link>
          <Link
            href="/login"
            className="border border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Ver demo
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-16 max-w-5xl mx-auto">
        {[
          {
            icon: <BarChart3 className="h-8 w-8 text-primary-600" />,
            title: 'Dashboards en tiempo real',
            desc: 'KPIs actualizados automáticamente con filtros dinámicos y vistas por rol.',
          },
          {
            icon: <Zap className="h-8 w-8 text-secondary-600" />,
            title: 'Elaboradores verificados',
            desc: 'Profesionales de datos certificados asignados a cada proyecto.',
          },
          {
            icon: <Shield className="h-8 w-8 text-green-600" />,
            title: 'Acceso granular (RBAC)',
            desc: 'Control de permisos por usuario, rol y nivel de visualización.',
          },
        ].map((f) => (
          <div key={f.title} className="p-6 rounded-2xl border border-gray-100 bg-gray-50">
            <div className="mb-4">{f.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
