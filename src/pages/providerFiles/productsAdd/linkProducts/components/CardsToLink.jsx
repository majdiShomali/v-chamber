import React from "react";
import Icon from "@mdi/react";
import { mdiLinkBoxVariant } from "@mdi/js";

const CardsToLink = ({ Items }) => {
  const ImagesUrl = process.env.REACT_APP_IMAGES_URL;

  return (
    <>
      <div className="w-full flex flex-wrap justify-center">
        {Items.map((item) => {
          return (
            <>
              <div className="relative">
                <img
                  className="w-32 h-32"
                  src={`${ImagesUrl}/${item?.image}`}
                />
                <Icon
                  // onClick={handleOpen}
                  color={"blue"}
                  path={mdiLinkBoxVariant}
                  size={1.5}
                  className="absolute top-5 right-5 z-10 hover:scale-110 hover:cursor-pointer"
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CardsToLink;
