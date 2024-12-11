import { OrderItem } from "../types";
  
  const OrderItemCard = ({ item }: {item: OrderItem}) => {
    return (
      <div className="flex space-x-3 bg-dark-5 p-3 rounded-lg">
        <div className="w-20 h-20 bg-graylight rounded-md">
          <img
            src={item.product.image_urls[0]}
            alt={item.product.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-dark-80">{item.product.title}</h3>
          <div className="text-sm text-dark-50 space-y-1">
            <p>Quantity: {item.quantity}</p>
            <p>Size: {item.size}</p>
            <p>Color: {item.color}</p>
            <p className="font-semibold text-primary">${item.price}</p>
          </div>
        </div>
      </div>
    );
  };

  export default OrderItemCard;