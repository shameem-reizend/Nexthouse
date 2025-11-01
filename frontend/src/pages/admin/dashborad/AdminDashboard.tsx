import { useEffect, useState } from "react";
import { MetricsCard } from "../../../components/MetricsCard";
import UserList from "./UserList";
import { fetchAlleventsForAdminAPI, fetchAllOrdersForAdminAPI, fetchAllProductsForAdminAPI, fetchAllUsersForAdminAPI } from "../../../api/modules/admin.api";


export interface User {
        name: string;
        email: string;
        phone_number: string;
}

type Order = {
    order_id:string,
    createdAt:string,
    status:"pending"|"completed"|"rejected"
}

const AdminDashboard = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [products,setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [orders,setOrders] = useState([]);


  const getAllUsers = async () => {
    const res = await fetchAllUsersForAdminAPI();
    setUsers(res.users);
  };

  const getAllProducts = async () => {
    const res  = await fetchAllProductsForAdminAPI();
    setProducts(res.products);
  }

  const getAllEvents = async() => {
    const res = await fetchAlleventsForAdminAPI();
    console.log(res.data.events)
    setEvents(res.data.events);
  }

  const getAllOrders = async() => {
    const res = await fetchAllOrdersForAdminAPI();
    console.log(res.data.orders)

    setOrders(res.data.orders);
  }

  const pendingOrders = orders?.filter((o:Order) => o.status === "pending")


  useEffect(() => {
    getAllUsers();
    getAllProducts();
    getAllEvents();
    getAllOrders();


  }, []);

  return (
    <>
      <div className="">
        <h1 className="text-3xl text-gray-700 font-semibold p-2">
          Welcome to Admin Dashboard.
        </h1>
        <div className="flex items-center bg-gray-100 dark:bg-gray-900  mb-2">
          <div className="container max-w-full mx-auto py-3 ">
            <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              <MetricsCard heading="Total users" value={users.length} />
              <MetricsCard heading="Total Products" value={products.length} />
              <MetricsCard heading="Total events" value={events.length} />
              <MetricsCard heading="Total Orders" value={orders.length} />
              <MetricsCard heading="Pending orders" value={pendingOrders.length} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-2 shadow-md">
          <h1 className="font-semibold text-3xl  text-center p-2 mb-3">
            All Users
          </h1>
        </div>
        <UserList users={users} />
      </div>
    </>
  );
};

export default AdminDashboard;
