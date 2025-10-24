import { useEffect, useState } from "react";
import { fetchProductsApi } from "../../api/modules/product.api";
import ProductDisplay from "../../components/products/ProductDisplay";

export interface ProductType {
  product_id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  isFree: boolean;
  isSold: boolean;
  category: {
    category_id: string;
    category_name: string;
  };
}

const Products = () => {
  const [products, setProducts] = useState<null | ProductType[]>(null);

  const fetching = async () => {
    const response = await fetchProductsApi();
    setProducts(response.data.data);
  };

  useEffect(() => {
    fetching();
  }, []);
  return (
    <div>
      <h4 className="text-center">All Products</h4>
      <div
        className="w-full grid gap-5 p-4 bg-white rounded-xl grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
      >
        {products?.length == 0 ? (
          <div className="text-center">Nothing to show</div>
        ) : (
          products?.map((prod: ProductType) => (
            <ProductDisplay key={prod.product_id} product={prod} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
