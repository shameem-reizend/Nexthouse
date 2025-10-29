import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ProductType } from "../../pages/product/Products";
import { fetchProductsApi, fetchUserProductsApi } from "../../api/modules/product.api";

type ProductcontextType = {
  buyProducts: ProductType[] | null;
  setBuyProducts: React.Dispatch<React.SetStateAction<ProductType[] | null>>;
  myProducts:ProductType[] | [];
  setMyProducts:React.Dispatch<React.SetStateAction<ProductType[] | []>>;
};

export const ProductContext = createContext<ProductcontextType | undefined>(
  undefined
);

interface ProductProviderProps {
  children: ReactNode;
}
const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [buyProducts, setBuyProducts] = useState<null | ProductType[]>(null);
  const [myProducts, setMyProducts] = useState<ProductType[]>([]);

  const fetchingBuyProducts = async () => {
    const response = await fetchProductsApi();
    setBuyProducts(response.data.data);
  };
  const fetchingUserProducts = async () => {
      const response = await fetchUserProductsApi();
      setMyProducts(response.data.data);
    };
  useEffect(() => {
    fetchingBuyProducts();
    fetchingUserProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ buyProducts, setBuyProducts,myProducts,setMyProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a product provider");
  }
  return context;
};
