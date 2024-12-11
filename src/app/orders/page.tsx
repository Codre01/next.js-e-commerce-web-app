"use client";

import { useEffect, useState } from 'react';
import Layout from '../dashboard/components/layout';
import Session from '../helpers/Session';
import catchError from '../helpers/catchError';
import OrderCard from './components/orderCard';
import { Loader } from 'lucide-react';
import { Order } from './types';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () =>{
        const accessToken: string = Session.getCookie('x-access-token');
        const [error, result] = await catchError(
            fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/orders/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                }
            })
        );

        if (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
            return;
        }

        if (!result?.ok) {
            console.error("Failed to fetch orders:", result?.statusText);
            setLoading(false);
            return;
        }

        const data = await result.json();
        setOrders(data);
        setLoading(false);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateOrderStatus = async (orderId: number, status: string) => {
        const accessToken: string = Session.getCookie('x-access-token');
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/orders/${orderId}/update-status/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }
            fetchData();

            Session.showAlert({str: 'Order status updated successfully', type: 'success'});
        } catch (error) {
            console.error('Error updating order status:', error);
            Session.showAlert({str: 'Failed to update order status', type: 'error'});
        }
    };

    const handleUpdatePaymentStatus = async (orderId: number, paymentStatus: string) => {
        const accessToken: string = Session.getCookie('x-access-token');
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/orders/${orderId}/update-payment-status/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ payment_status: paymentStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update payment status');
            }

            // Update local state
            fetchData();

            Session.showAlert({str: 'Order payment status updated successfully', type: 'success'});
        } catch (error) {
            console.error('Error updating payment status:', error);
            Session.showAlert({str: 'Failed to update payment status', type: 'success'});
        }
    };

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-dark-80 mb-6">Orders</h1>
                
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className="animate-spin text-primary" size={32} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {orders.length > 0 && orders.map((order: Order) => (
                            <OrderCard key={order.id} order={order} 
                            onUpdateOrderStatus={handleUpdateOrderStatus}
                            onUpdatePaymentStatus={handleUpdatePaymentStatus}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Orders;
