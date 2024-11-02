import { useLocation } from "react-router-dom";
import ApiData from "../../Api/ApiData";
import { useEffect } from "react";
import ProductSearchList from "./ProductSearchList";
const ProductSearch = () => {
  const locaation = useLocation();
  const { searchProduct, Searchproduct } = ApiData();
  const searchinput = new URLSearchParams(locaation.search);
  let GetAllSearch = searchinput.getAll("Search");
  useEffect(() => {
    searchProduct(GetAllSearch);
  }, [locaation]);

  return (
    <div>{Searchproduct && <ProductSearchList data={Searchproduct} />}</div>
  );
};

export default ProductSearch;
