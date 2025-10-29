import React from 'react'
import type { ActiveTabType, Order } from './OrderListing'
import { NoResults } from '../NoResults';
import { toast } from 'react-toastify';
import { makeOrderCompleteAPI, makeOrderRejectAPI } from '../../api/modules/order.api';

interface OrderTableProptype {
    orderData: Order[]
    activeTab: ActiveTabType,
    fetchReceivedOrders: () => void
}

export const OrderTable: React.FC <OrderTableProptype> = ({orderData, activeTab, fetchReceivedOrders}) => {

    const formatDate = (dateString: string)  => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    const handleApproveOrder = async (order_id: string) => {
        try {
            const orderResponse = await makeOrderCompleteAPI({orderId: order_id});
            if(orderResponse.success === true) {
                toast.success("Order Approved");
                fetchReceivedOrders();
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to Approve")
        }
    }

    const handleRejectOrder = async (order_id: string) => {
        try {
            const orderResponse = await makeOrderRejectAPI({orderId: order_id});
            if(orderResponse.success === true) {
                toast.success("Order Rejected");
                fetchReceivedOrders();
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to Reject")
        }
    }


  return (
    <div className="relative w-full overflow-x-auto rounded-xl shadow-md">
        <table className="w-full min-w-max table-auto text-left text-gray-700 bg-white">
            <thead className="hidden lg:table-header-group">
                <tr>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">SI NO</p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Image</p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Product Name</p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Price</p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Seller</p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Order Date</p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Status</p>
                    </th>
                    {activeTab === 'receivedOrders' ? 
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Action</p>
                    </th>
                    :
                    null
                    }
                </tr>
            </thead>

            <tbody>
                {orderData.length !== 0 ? 
                orderData.map((order, index) => (
                    <tr key={order.order_id} className="block md:table-row border-b border-blue-gray-100 last:border-b-0">
                       
                        <td className="lg:hidden p-4 flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <img src={order.product.image} alt={order.product.name} className="h-12 w-12 object-cover rounded" />
                                    <div>
                                        <p className="font-sans text-sm antialiased font-medium text-blue-gray-900">{order.product.name}</p>
                                        <p className="font-sans text-xs antialiased font-normal text-blue-gray-700">${order.product.price}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-sans text-xs antialiased font-normal text-blue-gray-700">#{index + 1}</p>
                                    {order.status === 'pending' ?
                                    <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20">{order.status}</span> :
                                    order.status === 'completed' ?
                                    <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">{order.status}</span> :
                                    <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">{order.status}</span>}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div>
                                    <p className="font-sans text-xs antialiased font-normal text-blue-gray-700 opacity-70">Seller</p>
                                    <p className="font-sans text-sm antialiased font-normal text-blue-gray-900">{order.product.user.name}</p>
                                </div>
                                <div>
                                    <p className="font-sans text-xs antialiased font-normal text-blue-gray-700 opacity-70">Order Date</p>
                                    <p className="font-sans text-sm antialiased font-normal text-blue-gray-900">{formatDate(order.createdAt)}</p>
                                </div>
                            </div>
                            
                            {activeTab === 'receivedOrders' && 
                            <div className="mt-3 flex justify-between">
                                {order.status === 'pending' ? (
                                    <>
                                        <div onClick={() => handleApproveOrder(order.order_id)} className="cursor-pointer inline-flex items-center rounded-md bg-green-400/10 px-3 py-1.5 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">Approve</div>
                                        <div onClick={() => handleRejectOrder(order.order_id)} className="cursor-pointer inline-flex items-center rounded-md bg-red-400/10 px-3 py-1.5 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">Reject</div>
                                    </>
                                ) : (
                                    <div className="w-full text-center">
                                        {order.status === 'completed' ?
                                        <span className="inline-flex items-center rounded-md bg-green-400/10 px-3 py-1.5 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">Approved</span> :
                                        <span className="inline-flex items-center rounded-md bg-red-400/10 px-3 py-1.5 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">Rejected</span>}
                                    </div>
                                )}
                            </div>
                            }
                        </td>
                        
                        <td className="hidden lg:table-cell p-4 border-b border-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {index + 1}
                            </p>
                        </td>   
                        <td className="hidden lg:table-cell p-4 border-b border-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                <img src={order.product.image} alt={order.product.name} height="50px" width="50px" className="object-cover rounded"/>
                            </p>
                        </td> 
                        <td className="hidden lg:table-cell p-4 border-b border-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {order.product.name}
                            </p>
                        </td>   
                        <td className="hidden lg:table-cell p-4 border-b border-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {order.product.price}
                            </p>
                        </td>   
                        <td className="hidden lg:table-cell p-4 border-b border-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {order.product.user.name}
                            </p>
                        </td> 
                        <td className="hidden lg:table-cell p-4 border-b border-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {formatDate(order.createdAt)}
                            </p>
                        </td> 
                        <td className="hidden lg:table-cell p-4 border-b border-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {order.status === 'pending'?
                                <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20">{order.status}</span>:
                                order.status === 'completed'?
                                <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">{order.status}</span>:
                                <span className="cursor-pointer inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">{order.status}</span>}
                            </p>
                        </td>    
                        {activeTab === 'receivedOrders' ? 
                        <td className="hidden lg:table-cell p-4 border-b border-blue-gray-50">
                            <p className="font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 flex flex-col lg:flex-row gap-3 items-center">
                                {order.status === 'pending'? (
                                    <>
                                        <div onClick={() => handleApproveOrder(order.order_id)} className="cursor-pointer inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">Approve</div>
                                        <div onClick={() => handleRejectOrder(order.order_id)} className="cursor-pointer inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">Reject</div>
                                    </>
                                ) : (
                                    order.status === 'completed' ?
                                    <span className="mr-3 cursor-pointer inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">Approved</span>:
                                    <span className="cursor-pointer inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">Rejected</span>
                                )}
                            </p>
                        </td>
                        :
                        null
                        }    
                    </tr>
                )):
                <tr>
                    <td colSpan={activeTab === 'receivedOrders' ? 8 : 7} className="p-4 border-b border-blue-gray-50">
                        <NoResults />
                    </td>
                </tr>
                }
            </tbody>
        </table>
    </div>
  )
}
