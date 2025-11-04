import { useQuery } from "@tanstack/react-query"
import { fetchAdminProductDashoard, fetchAllProductsForAdminAPI1 } from "../../../api/modules/admin.api"


import { NoResults } from "../../NoResults"
import ProductTable, { type ProductProp } from "../../../components/products/ProductTable"
import FilterProduct from "../../../components/products/FilterProduct"
import { useEffect, useState } from "react"
import { MetricsCard } from "../../../components/MetricsCard"
import { Button } from "../../../components/ui/button"
import {  IndianRupee } from "lucide-react"

interface responseProps{
  message:string,
  success:boolean,
  products:ProductProp[]
}
interface dashboardProp{
  message:string,
  success:boolean,
  data:{
   categorycount: string
freecount: string
productcount: string
soldcount: string
totalprice:string

  }

}

const ProductListing = () => {

    const {data,isPending,error}=useQuery<responseProps>({
        queryKey:["allProducts"],
        queryFn:fetchAllProductsForAdminAPI1,
        
    })

    const{data:data1,isPending:isPending1,error:error1}=useQuery<dashboardProp>({
      queryKey:["productDashboard"],
      queryFn:fetchAdminProductDashoard
    })

    const[filter,setFilter]=useState("All")
    const[products,setProducts]=useState<ProductProp[]>([])
    // const [showInput,setShowInput]=useState<boolean>(false)

    useEffect(() => {
    if (!data?.products) return;

    let filtered = data.products;

    switch (filter) {
      case "Free":
        filtered = data.products.filter((p:ProductProp) => p.isFree === true);
        break;
      case "Priced":
        filtered = data.products.filter((p:ProductProp) => p.isFree === false);
        break;
      case "Sold":
        filtered = data.products.filter((p:ProductProp) => p.isSold === true);
        break;
      case "Available":
        filtered = data.products.filter((p:ProductProp) => p.isSold === false);
        break;
      case "All":
        filtered = data.products;
        break;
      default:
        filtered = data.products.filter(
          (p:ProductProp) => p.category.category_name === filter
        );
        break;
    }

    setProducts(filtered);
  }, [filter, data]);
    if(isPending || isPending1) return <div>Loading...</div>
    if(error) return <div>{error.message}</div>
    if(error1) return <div>{error1.message}</div>
  return (
    <div className="min-h-screen">
        <div className="text-3xl text-gray-700 font-semibold p-2">Listed Products</div>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <MetricsCard heading="Total Products" value={Number(data1.data.productcount)}/>
             <MetricsCard heading="Free Products" value={Number(data1.data.freecount)}/>
              <MetricsCard heading="Priced Products" value={Number(data1.data.productcount)-Number(data1.data.freecount)}/>
              <MetricsCard heading="Sold Products" value={Number(data1.data.soldcount)}/>
               <MetricsCard heading="Total Category" value={Number(data1.data.categorycount)}/>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <FilterProduct filter={filter} setFilter={setFilter} />
          <div className="flex space-x-4 items-center">
          
          <Button className="bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-200 w-[300px] py-2 flex text-black justify-between items-center">
            <span className="text-gray-400">Total Product Price: </span>
            <div className="flex items-center justify-center">
            <IndianRupee/>
            <span className="text-xl tracking-wider">{data1.data.totalprice}</span>
            </div>
          </Button>
          </div>
          </div>
        </div>
        <div>
            {products.length===0?<div className="bg-white"><NoResults/></div>:(
                <ProductTable data={products}/>
                )}
        </div>
    </div>
  )
}

export default ProductListing