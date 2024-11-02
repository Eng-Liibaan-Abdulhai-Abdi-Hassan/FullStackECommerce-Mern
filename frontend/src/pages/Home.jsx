import Banner from "../components/Banner";
import HorizontalProducts from "../components/Products/HorizontalProducts";
import VerticalProduct from "../components/Products/VerticalProduct";
import CategoryList from "../components/ProductCategory/ProductCategoryList";
import ApiData from "../Api/ApiData";
const Home = () => {
  const { AllProductCategory } = ApiData();
  return (
    <div>
      <CategoryList />
      <Banner />
      {AllProductCategory.length === 0 && (
        <>
          <HorizontalProducts />
          <VerticalProduct />
        </>
      )}
      {AllProductCategory.map((data, index) => (
        <HorizontalProducts
          key={index}
          Category={data.Category}
          Heading={data.Category}
        />
      ))}
      {AllProductCategory.map((data, index) => (
        <VerticalProduct
          key={index}
          Category={data.Category}
          Heading={data.Category}
        />
      ))}
    </div>
  );
};

export default Home;
