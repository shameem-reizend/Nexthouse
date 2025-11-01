import { fetchCategoryApi } from "../../../api/modules/category.api"
import { useEffect, useState } from "react";
const CategoryPage = () => {

    const [categories,setCategories] = useState([])

    const getCategories = async() =>{
        const res =  await fetchCategoryApi();
        console.log(res.data.data.categories);
        setCategories(res.data.data.categories);
    }

    useEffect(()=>{
        getCategories();

    },[])

  return (
    <>
    <div className="space-y-4 bg-green-200 min-h-10">
        <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Category Page</h1>
            <div className="">
                <button className="border p-2 border-gray-700 rounded-lg font-semibold hover:text-white hover:bg-gray-900 active:bg-gray-700">
                    Add new Category
                </button>
            </div>
        </div>

        <div className="  flex gap-4">
            <div className="  border-2 w-full border-blue-500 min-h-2">
                      <div className=" max-h-96 space-y-4 overflow-y-scroll">
        {categories.map((c:any) => (
          <div key={c.category_id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900 capitalize">{c.category_name}</h3>
            </div>
            
          </div>
        ))}
      </div>

            </div>
            <div className="border-2 w-full border-red-400 ">

            </div>

        </div>

    </div>
    
    </>

  )
}

export default CategoryPage