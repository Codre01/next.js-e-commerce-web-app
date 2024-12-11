
"use client";
import Layout from './components/layout';
import { useRouter } from 'next/navigation';
import { TrendingUp, Users, DollarSign, ShoppingBag, Edit2, Trash2 } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend: string;
}

const StatCard = ({ title, value, icon: Icon, trend }: StatCardProps) => {
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-dark-50 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-dark-100 mt-1">{value}</h3>
        </div>
        <div className="bg-primary/10 p-3 rounded-full">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      <p className="text-sm mt-4">
        <span className="text-green">{trend}</span> vs last month
      </p>
    </div>
  );
}

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export default function Dashboard() {
  const router = useRouter();
  const recentOrders: Order[] = [
    {
      id: '#ORD001',
      customer: 'John Doe',
      date: '2024-12-11',
      amount: '$299.99',
      status: 'completed',
    },
    // Add more orders as needed
  ];
  
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-dark-100">Dashboard Overview</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value="$24,890"
            icon={DollarSign}
            trend="+12.5%"
          />
          <StatCard
            title="Total Orders"
            value="450"
            icon={ShoppingBag}
            trend="+8.2%"
          />
          <StatCard
            title="Total Customers"
            value="2,420"
            icon={Users}
            trend="+5.1%"
          />
          <StatCard
            title="Average Order"
            value="$55.31"
            icon={TrendingUp}
            trend="+2.4%"
          />
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-dark-20">
            <h2 className="text-xl font-semibold text-dark-100">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-5">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-dark-60">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-dark-60">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-dark-60">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-dark-60">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-dark-60">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-dark-60">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-20">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 text-sm text-dark-80">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-dark-80">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 text-sm text-dark-80">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-dark-80">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'completed'
                            ? 'bg-green/10 text-green'
                            : order.status === 'pending'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-red/10 text-red'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex space-x-2">
                        <button className="text-primary hover:text-primarydark">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-red hover:text-red/80">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}