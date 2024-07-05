import { createContext, useState} from "react"

export const ProductContext = createContext();

export const ProductProvider = (props) =>{
  const [products,setproducts] = useState({ "data" :[] });
  return(
    <ProductContext.Provider value={[products,setproducts]}>
      {props.children}
    </ProductContext.Provider>
  );
}

