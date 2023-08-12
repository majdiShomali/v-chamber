import React, { useEffect } from "react";
import CategoryCard from "../../../components/cards/CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompaniesByCategory } from "../../../actions/company/GetCompaniesByCategory";
import AddCompany from "../AddGeneralInfo/AddCompany";
import { Card } from "@mui/material";
import { fetchJuiceSize } from "../../../actions/juice/GetJuiceSize";
import { fetchJuiceNikotin } from "../../../actions/juice/GetJuiceNikotin";
import { useParams } from "react-router-dom";

import AddJuiceSize from "../AddGeneralInfo/AddJuiceSize";
import AddJuiceNikotin from "../AddGeneralInfo/AddJuiceNikotin";
const CategoryEditSection = ({ ItemData }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data: allCompaniesByCategory  } = useSelector(
    (state) => state.fetchCompaniesByCategory
  );
  const { data: allJuiceSize } = useSelector((state) => state.fetchJuiceSize);
  const { data: allJuiceNikotin } = useSelector(
    (state) => state.fetchJuiceNikotin
  );

  console.log(allJuiceNikotin);
  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchCompaniesByCategory(id));
    }
    dispatch(fetchJuiceSize());
    dispatch(fetchJuiceNikotin());
  }, [dispatch, id]);
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div>
          <CategoryCard category={ItemData} />
        </div>

        <div>
          <div className="">
            <AddCompany item={ItemData} />
            <div className="flex flex-wrap gap-3 p-1">
              {allCompaniesByCategory?.map((company) => {
                return (
                  <Card
                    className="p-1 cursor-pointer hover:scale-105"
                    key={company._id}
                  >
                    {company.Name}
                  </Card>
                );
              })}
            </div>
          </div>

          {ItemData?.category === allJuiceSize[0]?.category ? 
          <div className="">
            <AddJuiceSize item={ItemData} />
            <div className="flex flex-wrap gap-3 p-1">
              {allJuiceSize?.map((juice) => {
                return (
                  <Card
                    className="p-1 cursor-pointer hover:scale-105"
                    key={juice._id}
                  >
                    {juice.size}
                  </Card>
                );
              })}
            </div>
          </div>
          :
          
null


}

{ItemData?.category === allJuiceNikotin[0]?.category ? 

<div className="">
<AddJuiceNikotin item={ItemData} />
<div className="flex flex-wrap gap-3 p-1">
  {allJuiceNikotin?.map((juice) => {
    return (
      <Card
        className="p-1 cursor-pointer hover:scale-105"
        key={juice._id}
      >
        {juice.nikotin}
      </Card>
    );
  })}
</div>
</div>


: 

null


}
        

        </div>
      </div>
    </>
  );
};

export default CategoryEditSection;
