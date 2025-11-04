import {
  deleteCategoryAPI,
  fetchCategoryApi,
} from "../../../api/modules/category.api";
import { useEffect, useState } from "react";
import AddCategory from "./AddCategory";
import { Button } from "../../../components/ui/button";
import { toast } from "react-toastify";
import ConfirmDialog from "../../../components/products/ConfirmDialog";
const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [categoryId, setCategoryId] = useState<string>("");

  const getCategories = async () => {
    const res = await fetchCategoryApi();
    setCategories(res.data.data.categories);
  };

  const handleClickDelete = (category_id: string) => {
    setCategoryId(category_id);
    setShowDelete(true)
  };
  const handleDelete = async () => {
    try {
      const data= await deleteCategoryAPI(categoryId);
      if (data.success) {
        toast.success("Deleted Category");
        getCategories()
      } else {
        toast.error("Error in deleting Category");
      }
    } catch (error:any) {
      console.log(error);
      console.log(error.response.data.message);
      toast.error(`Error in deleting ${error.response.data.message}`)
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className=" bg-gray-100 min-h-full w-full">
        <h1 className="text-3xl text-gray-700 font-semibold p-2">Categories</h1>

        <div className="w-full flex flex-col gap-4 mt-4 items-center">
          <div className="self-start mt-2">
            <AddCategory getCategories={getCategories} />
          </div>

          <div className="max-h-100 w-full  overflow-y-auto">
            <table className="w-full text-left text-gray-500 dark:text-gray-400 ">
              <thead className="sticky top-0 bg-gray-100 text-lg capitalize text-gray-600 ">
                <tr>
                  <th className="text-xs sm:text-lg px-3 py-2 sm:px-6 sm:py-3">
                    SI.NO
                  </th>

                  <th className="text-xs sm:text-lg px-3 py-2 sm:px-6 sm:py-3">
                    Category Name
                  </th>
                  <th className="text-xs sm:text-lg px-3 py-2 sm:px-6 sm:py-3">
                    No. of Products
                  </th>
                  <th className="text-xs sm:text-lg px-3 py-2 sm:px-6 sm:py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-900">
                {categories?.length == 0 && (
                  <tr>
                    <td>No Data Available</td>
                  </tr>
                )}
                {categories.map((c: any, index) => (
                  <tr
                    key={c.category_id}
                    className="bg-white max-w-100 border border-gray-200 rounded-lg p-4 shadow-sm"
                  >
                    <td className="px-3 py-2 sm:px-6 sm:py-3">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {index + 1}
                      </p>
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-3">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {c.category_name}
                      </p>
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-3">
                      {c.product_count}
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-3">
                      <Button
                        className=" px-1 sm:px-5  text-[12px] sm:text-sm text-red-800 hover:text-red-900 bg-red-200 hover:bg-red-300"
                        onClick={() => handleClickDelete(c.category_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {showDelete && (
                <ConfirmDialog
                  open={showDelete}
                  setOpen={setShowDelete}
                  message="Are you sure to delete this Category?."
                  onConfirm={handleDelete}
                />
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
