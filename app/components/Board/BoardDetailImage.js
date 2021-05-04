import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const BoardDetailImage = ({ boardDetail }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const SLIDES_LENGTH = boardDetail.images.length;

  const nextSlide = () => {
    setCurrentImage(currentImage === SLIDES_LENGTH - 1 ? 0 : currentImage + 1);
  };

  const prevSlide = () => {
    setCurrentImage(currentImage === 0 ? SLIDES_LENGTH - 1 : currentImage - 1);
  };

  // if (!Array.isArray(boardDetail.images) || SLIDES_LENGTH <= 0) return null;

  return (
    <section className="board-detail-image">
      {boardDetail.images ? (
        boardDetail.images.map((image, index) => {
          return (
            <div
              className={
                index === currentImage ? "detail-slide active" : "detail-slide"
              }
              key={index}
            >
              <img src={image} alt="이미지" className="detail-image" />
            </div>
          );
        })
      ) : (
        <></>
      )}
      <div className="detail-arrow-box">
        <BsChevronCompactLeft
          className="detail-left-arrow"
          onClick={prevSlide}
        />
        <BsChevronCompactRight
          className="detail-right-arrow"
          onClick={nextSlide}
        />
      </div>
      <div className="slide-btns">
        {/* <div
            className={currentImage === 0 ? "slide-btn active" : "slide-btn"}
            onClick={() => setCurrentImage(0)}
          />
          <div
            className={currentImage === 1 ? "slide-btn active" : "slide-btn"}
            onClick={() => setCurrentImage(1)}
          />
          <div
            className={currentImage === 2 ? "slide-btn active" : "slide-btn"}
            onClick={() => setCurrentImage(2)}
          /> */}
      </div>
    </section>
  );
};

export default BoardDetailImage;
