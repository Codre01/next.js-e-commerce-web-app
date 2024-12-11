
import { Package, User, MapPin, Phone, CreditCard } from 'lucide-react';
import OrderItemCard from './orderItemCard';
import { Order } from '../types';
import StatusDropdown from './statusDropdown';

interface OrderCardProps {
  order: Order;
  onUpdateOrderStatus: (orderId: number, status: string) => void;
  onUpdatePaymentStatus: (orderId: number, status: string) => void;
}
const OrderCard = ({ order, onUpdateOrderStatus, onUpdatePaymentStatus }: OrderCardProps) => {
  const orderStatusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  const paymentStatusOptions = ['pending', 'completed', 'failed'];
  // const getStatusColor = (status: Order['status']) => {
  //   const colors = {
  //     pending: 'bg-dark-40',
  //     processing: 'bg-blue',
  //     shipped: 'bg-primarylight',
  //     delivered: 'bg-green',
  //     cancelled: 'bg-red',
  //   };
  //   return colors[status];
  // };

  // const getPaymentStatusColor = (status: Order['payment_status']) => {
  //   const colors = {
  //     pending: 'bg-dark-40',
  //     completed: 'bg-green',
  //     failed: 'bg-red',
  //   };
  //   return colors[status];
  // };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Package className="text-primary" />
          <span className="font-semibold">Order #{order.id}</span>
        </div>
        <div className="flex space-x-2">
          
          
        </div>
        <div className="flex space-x-2">
          <span className='font-bold'>Edit Order Status: </span>
          <StatusDropdown
            currentStatus={order.status}
            options={orderStatusOptions}
            onStatusChange={(status) => onUpdateOrderStatus(order.id, status)}
            type="order"
          />
          <span className='font-bold'>Edit Payment Status: </span>
          <StatusDropdown
            currentStatus={order.payment_status}
            options={paymentStatusOptions}
            onStatusChange={(status) => onUpdatePaymentStatus(order.id, status)}
            type="payment"
          />
          
        </div>
      </div>

      <div className="flex items-start space-x-4 text-dark-60">
        <User size={16} />
        {/* <span>{order.user_id.username}</span> */}
        <MapPin size={16} />
        <span>{order.address.address} ({order.address.address_type})</span>
        <Phone size={16} />
        <span>{order.address.phone}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {order.items.length > 0 && order.items.map((item) => (
          <OrderItemCard key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-dark-20">
        <div className="flex items-center space-x-2">
          <CreditCard className="text-primary" />
          <span className="font-semibold">Total Amount:</span>
        </div>
        <span className="text-lg font-bold text-primary">
          ${order.total_amount}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;