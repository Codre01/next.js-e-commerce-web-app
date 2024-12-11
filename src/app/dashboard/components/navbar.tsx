import { Menu, Bell, User } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray hover:text-primary"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray hover:text-primary">
            <Bell className="w-6 h-6" />
          </button>
          <button className="text-gray hover:text-primary">
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}