
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface StatusDropdownProps {
  currentStatus: string;
  options: string[];
  onStatusChange: (status: string) => void;
  type: 'order' | 'payment';
}

const StatusDropdown = ({ currentStatus, options, onStatusChange, type }: StatusDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getStatusColor = (status: string) => {
    const colors = type === 'order' 
      ? {
          pending: 'bg-dark-40',
          processing: 'bg-blue',
          shipped: 'bg-primarylight',
          delivered: 'bg-green',
          cancelled: 'bg-red',
        }
      : {
          pending: 'bg-dark-40',
          completed: 'bg-green',
          failed: 'bg-red',
        };
    return colors[status as keyof typeof colors];
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-white text-sm ${getStatusColor(currentStatus)}`}
      >
        <span>{currentStatus}</span>
        <ChevronDown size={14} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 py-1">
          {options.map((status) => (
            <button
              key={status}
              onClick={() => {
                onStatusChange(status);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-dark-5 flex items-center justify-between"
            >
              <span>{status}</span>
              {currentStatus === status && <Check size={14} className="text-green" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;