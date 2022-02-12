import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Slide({ listSlide }: any) {
  return (
    <Carousel className="relative" indicators={false}>
      {listSlide?.map((item: any, index: number) => (
        <Carousel.Item key={index} interval={1500}>
          <div
            className="bg-carousel"
            style={{
              backgroundImage: `url(${item?.imageUrl})`,
            }}
          ></div>
          <img
            className="d-block w-100 img-carousel"
            src={item.imageUrl}
            alt={item.title}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slide;
