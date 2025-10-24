import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Product, { type ProductProps } from "../components/Product"

interface itemProp{
    id:string,
    product:ProductProps
}

const fetchLikedProducts=async()=>{
    const response=await axios.get("http://localhost:5000/liked",{headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}})
    console.log(response.data)
    return response.data
}


const LikedProducts = () => {


    const{data,error,isLoading}=useQuery({
        queryKey:["likedProducts"],
        queryFn:fetchLikedProducts,
        refetchOnWindowFocus:true,
    })


    if(error) return <div>Error occurred {error.message}</div>
    if(isLoading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 p-8 space-y-7">
        <div className="text-3xl font-semibold ">
            Favorite Products
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">

        {data.data.map((item:itemProp)=>{
            return (
                <Product key={item.id} product={item.product} />
            )
        })}
        </div>
    </div>
  )
}

export default LikedProducts