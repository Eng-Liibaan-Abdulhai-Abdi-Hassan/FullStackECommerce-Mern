import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterProductCard from "../Products/ProductSearchList";
import ApiData from "../../Api/ApiData";
const FilterProductCategory = () => {
  const {
    AllProductCategory,
    GetProductCategory,
    ProductCategory,
    setProductCategory,
  } = ApiData();
  const location = useLocation();
  const searchinput = new URLSearchParams(location.search);
  const GetAllSearch = searchinput.getAll("Category");
  const [sortby, setsortby] = useState("");
  let ObjectCategory = {};
  GetAllSearch.forEach((item) => {
    ObjectCategory[item] = true;
  });

  const [filterproduct, setfilterproduct] = useState([]);

  const [selected, setselected] = useState(ObjectCategory);

  const HandleRadioInPut = (e) => {
    let { value } = e.target;
    setsortby(value);
    if (value === "asc") {
      setProductCategory((prev) =>
        prev.sort((a, b) => a.SellingPrice - b.SellingPrice)
      );
    } else {
      setProductCategory((prev) =>
        prev.sort((a, b) => b.SellingPrice - a.SellingPrice)
      );
    }
  };

  const HandleSelected = (e) => {
    let { value, checked } = e.target;
    setselected((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    let ChangeObjectintoArray = Object.keys(selected)
      .map((data) => {
        if (selected[data]) {
          return data;
        }
        return null;
      })
      .filter((el) => el);
    setfilterproduct(ChangeObjectintoArray);
    const GoBackSearch = ChangeObjectintoArray.map((data, index) => {
      if (ChangeObjectintoArray.length - 1 === index) {
        return `Category=${data}`;
      } else {
        return `Category=${data}&&`;
      }
    });

    navigate("/FilterProductCategory?" + GoBackSearch.join(""));
  }, [selected]);

  const navigate = useNavigate();
  useEffect(() => {
    GetProductCategory(filterproduct);
  }, [filterproduct]);

  return (
    <div className="flex  ">
      <div className="md:w-[23%] sm:w-[50%]">
        <div className="flex gap-2 p-2">
          <input
            type="radio"
            name="sortby"
            checked={sortby === "asc"}
            value={"asc"}
            id={sortby}
            onChange={HandleRadioInPut}
          />
          <label htmlFor="radio">Low Price to Hight Price</label>
        </div>
        <div className="flex gap-2 p-2">
          <input
            type="radio"
            name="sortby"
            value={"desc"}
            checked={sortby === "desc"}
            onChange={HandleRadioInPut}
          />
          <label htmlFor="radio">High Price to Low Price</label>
        </div>

        <div className="overflow-y-scroll scroll h-[430px]">
          {AllProductCategory.map((data, index) => (
            <div key={index} className="flex gap-2 p-2">
              <input
                type="checkbox"
                onChange={HandleSelected}
                value={data.Category}
                name="selected"
                checked={selected[data.Category]}
              />
              <label htmlFor="checkbox">{data.Category}</label>
            </div>
          ))}
        </div>
      </div>

      <FilterProductCard data={ProductCategory} />
    </div>
  );
};

export default FilterProductCategory;
