// components/Sidebar.tsx
import { Home, Package, ShoppingCart, Tags, Grid } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathName = usePathname();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: ShoppingCart, label: 'Orders', href: '/orders' },
    { icon: Package, label: 'Products', href: '/products' },
    { icon: Tags, label: 'Categories', href: '/category' },
    { icon: Grid, label: 'Brands', href: '/brands' },
  ];

  return (
    <div
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed md:relative md:translate-x-0 z-30 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out w-64`}
    >
      <div className="p-4 border-b border-dark-20">
        <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathName === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-6 py-3 hover:bg-primary hover:text-white ${
                isActive ? 'bg-primary text-dark-5' : 'text-dark-80'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}