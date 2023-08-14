import React from 'react'
import { Button, Carousel } from "@material-tailwind/react";
import { HashLink } from 'react-router-hash-link';
import HeroImageOne from './HeroImageOne';
import HeroImageTwo from './HeroImageTwo';

const HeroSection = () => {
  return (
    <Carousel
      className=" h-[90vh] "
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-5 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >

      <HeroImageOne/>

    <HeroImageTwo/>
    </Carousel>
  )
}

export default HeroSection