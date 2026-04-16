'use client';

import Link from 'next/link';
import { BarChart3, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  userName?: string;
  onLogout?: () => void;
}

export default function Navbar({ userName, onLogout }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100">
      <Link href="/" className="flex items-center gap-2">
        <BarChart3 className="h-6 w-6 text-primary-600" />
        <span className="font-bold text-gray-900">DataFlow Studio</span>
      </Link>

      <div className="flex items-center gap-4">
        {userName && <span className="text-sm text-gray-600">{userName}</span>}
        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
          >
            <LogOut className="h-4 w-4" />
            Salir
          </button>
        )}
      </div>
    </nav>
  );
}
