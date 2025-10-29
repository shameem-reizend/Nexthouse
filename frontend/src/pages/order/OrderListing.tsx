import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router";
import { MetricsCard } from "../../components/MetricsCard";
import { getMyOrdersAPI, getReceivedOrderAPI } from "../../api/modules/order.api";
import type { ProductType, UserType } from "../product/Products";
import { OrderTable } from "./OrderTable";

export interface Order {
  createdAt: string,
  order_id: string,
  status: string,
  user: UserType
  product: ProductType
}

export type ActiveTabType = "myOrders" | "receivedOrders"

export const OrderListing: React.FC = () => {

  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [receivedOrders, setReceivedOrders] = useState<Order[]>([]);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTabType>('myOrders');

  const fetchMyOrders = async () => {
    try {
      const response = await getMyOrdersAPI();
      setMyOrders(response.orders)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchReceivedOrders = async () => {
    try {
      const response = await getReceivedOrderAPI();
      setReceivedOrders(response.orders);
      console.log(receivedOrders)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMyOrders();
    fetchReceivedOrders();
  }, []);

  useEffect(() => {
    setPendingOrders(receivedOrders.filter((order: Order) => order.status === 'pending'))
    setCompletedOrders(receivedOrders.filter((order: Order) => order.status === 'completed'))
  }, [receivedOrders])

  return (
    <div>
      <div className="flex items-center justify-between py-3">
          <div>
              <h1 className="text-3xl font-medium">Orders</h1>
          </div>
          <div>
              <Link to="/products">
                  <Button>Browse Products</Button>
              </Link>
          </div>
      </div>

      <div className="flex items-center bg-gray-100 dark:bg-gray-900">
          <div className="container max-w-full mx-auto py-3">
              <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                  <MetricsCard heading = 'Total Orders' value = {myOrders.length + receivedOrders.length}/>
                  <MetricsCard heading = 'My Orders' value = {myOrders.length}/>
                  <MetricsCard heading = 'Received Orders' value = {receivedOrders.length}/>
                  <MetricsCard heading = 'Pending Orders' value = {pendingOrders.length}/>
                  <MetricsCard heading = 'Completed Orders' value = {completedOrders.length}/>
              </div>
          </div>
      </div>

      <div className="max-w-full mx-auto py-3">
          <div className="bg-white rounded-lg shadow-lg">
              <div className="border-b border-gray-200">
                  <nav className="flex -mb-px">
                      <button
                      onClick={() => setActiveTab('myOrders')}
                      className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-colors duration-200 cursor-pointer ${
                          activeTab === 'myOrders'
                          ? 'border-b-2 border-zinc-900 text-zinc-900'
                          : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
                      }`}
                      >
                      My Orders
                      </button>
                      <button
                      onClick={() => setActiveTab('receivedOrders')}
                      className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-colors duration-200 cursor-pointer ${
                          activeTab === 'receivedOrders'
                          ? 'border-b-2 border-zinc-900 text-zinc-900'
                          : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
                      }`}
                      >
                      Received Orders
                      </button>
                  </nav>
              </div>
          </div>
      </div>

      <div className="max-w-full mx-auto py-3">
          <OrderTable activeTab={activeTab} orderData={activeTab === 'myOrders'? myOrders : receivedOrders} fetchReceivedOrders={fetchReceivedOrders}/>
      </div>

    </div>
  );
};
