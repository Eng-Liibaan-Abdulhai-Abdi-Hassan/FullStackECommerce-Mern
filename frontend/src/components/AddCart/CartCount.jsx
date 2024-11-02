import ApiData from "../../Api/ApiData";
const CartCount = () => {
  let { count } = ApiData();
  return <div>{count}</div>;
};

export default CartCount;
