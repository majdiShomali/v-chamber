import React, { useEffect } from "react";
// import CategoryCard from "../../../components/cards/CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompaniesByCategory } from "../../../actions/company/GetCompaniesByCategory";
import AddCompany from "../AddGeneralInfo/AddCompany";
import { Card } from "@mui/material";
import { fetchJuiceSize } from "../../../actions/juice/GetJuiceSize";
import { fetchJuiceNikotin } from "../../../actions/juice/GetJuiceNikotin";
import { fetchJuiceType } from "../../../actions/juice/GetJuiceType";
import { useParams } from "react-router-dom";
import { fetchJuiceTypeByCategory } from "../../../actions/juice/GetJuiceTypeByCategory";
import { fetchJuiceSizeByCategory } from "../../../actions/juice/GetJuiceSizeByCategory";
import { fetchJuiceNikotinByCategory } from "../../../actions/juice/GetJuiceNikotinByCategory";
import { fetchJuiceFlavorByCategory } from "../../../actions/juice/GetJuiceFlavorByCategory";

import AddJuiceSize from "../AddGeneralInfo/AddJuiceSize";
import AddJuiceNikotin from "../AddGeneralInfo/AddJuiceNikotin";
import AddJuiceType from "../AddGeneralInfo/AddJuiceType";
import AddJuiceFlavor from "../AddGeneralInfo/AddJuiceFlavor";
import EditCompany from "../AddGeneralInfo/editGeneralInfo/EditCompany";
import EditJuiceFlavor from "../AddGeneralInfo/editGeneralInfo/EditJuiceFlavor";
import EditJuiceNikotin from "../AddGeneralInfo/editGeneralInfo/EditJuiceNikotin";
import EditJuiceSize from "../AddGeneralInfo/editGeneralInfo/EditJuiceSize";
import EditJuiceType from "../AddGeneralInfo/editGeneralInfo/EditJuiceType"
const CategoryEditSection = ({ ItemData }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data: allCompaniesByCategory  } = useSelector(
    (state) => state.fetchCompaniesByCategory
  );
  const { data: allJuiceTypeByCategory  } = useSelector(
    (state) => state.fetchJuiceTypeByCategory
  );
  const { data: allJuiceSizeByCategory  } = useSelector(
    (state) => state.fetchJuiceSizeByCategory
  );
  const { data: allJuiceNikotinByCategory  } = useSelector(
    (state) => state.fetchJuiceNikotinByCategory
  );
  const { data: allJuiceFlavorByCategory  } = useSelector(
    (state) => state.fetchJuiceFlavorByCategory
  );

  // const { data: allJuiceSize } = useSelector((state) => state.fetchJuiceSize);
  // const { data: allJuiceType } = useSelector((state) => state.fetchJuiceType);
  // const { data: allJuiceNikotin } = useSelector((state) => state.fetchJuiceNikotin);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchCompaniesByCategory(id));
      dispatch(fetchJuiceTypeByCategory(id));
      dispatch(fetchJuiceSizeByCategory(id));
      dispatch(fetchJuiceNikotinByCategory(id));
      dispatch(fetchJuiceFlavorByCategory(id));
    }
    dispatch(fetchJuiceSize());
    dispatch(fetchJuiceNikotin());
    dispatch(fetchJuiceType());
  }, [dispatch, id]);

  return (
    <>
      <div className="w-full flex items-center justify-center">
        {/* <div>
          <CategoryCard category={ItemData} />
        </div> */}

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
                    <EditCompany item={company} ItemData={ItemData} />
                    {company.Name}
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="">
            <AddJuiceSize item={ItemData} />
            <div className="flex flex-wrap gap-3 p-1">
              {allJuiceSizeByCategory?.map((juice) => {
                return (
                  <Card
                    className="p-1 cursor-pointer hover:scale-105"
                    key={juice._id}
                  >
         <EditJuiceSize item={juice} ItemData={ItemData} />

                    {juice.size}
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="">
            <AddJuiceFlavor item={ItemData} />
            <div className="flex flex-wrap gap-3 p-1">
              {allJuiceFlavorByCategory?.map((juice) => {
                return (
                  <Card
                    className="p-1 cursor-pointer hover:scale-105"
                    key={juice._id}
                  >
                <EditJuiceFlavor item={juice} ItemData={ItemData} />

                    {juice.flavor}
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="">
            <AddJuiceType item={ItemData} />
            <div className="flex flex-wrap gap-3 p-1">
              {allJuiceTypeByCategory?.map((juice) => {
                return (
                  <Card
                    className="p-1 cursor-pointer hover:scale-105"
                    key={juice._id}
                  >
                <EditJuiceType item={juice} ItemData={ItemData} />

                    {juice.type}
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="">
<AddJuiceNikotin item={ItemData} />
<div className="flex flex-wrap gap-3 p-1">
  {allJuiceNikotinByCategory?.map((juice) => {
    return (
      <Card
        className="p-1 cursor-pointer hover:scale-105"
        key={juice._id}
      >
      <EditJuiceNikotin item={juice} ItemData={ItemData} />

        {juice.nikotin}
      </Card>
    );
  })}
</div>
</div>

          {/* {ItemData?.category === allJuiceSize[0]?.category ? 
          <>
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
          <div className="">
            <AddJuiceType item={ItemData} />
            <div className="flex flex-wrap gap-3 p-1">
              {allJuiceType?.map((juice) => {
                return (
                  <Card
                    className="p-1 cursor-pointer hover:scale-105"
                    key={juice._id}
                  >
                    {juice.Type}
                  </Card>
                );
              })}
            </div>
          </div>
          </>   
          :        
null

} */}

{/* {ItemData?.category === allJuiceNikotin[0]?.category ? 

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


} */}
        

        </div>
      </div>
    </>
  );
};

export default CategoryEditSection;
