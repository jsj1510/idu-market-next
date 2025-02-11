import React from "react";
import Link from "next/link";
import { BsBookHalf } from "react-icons/bs";
import { GiClothes } from "react-icons/gi";
import { BsLaptop } from "react-icons/bs";
import { FaArrowCircleRight } from "react-icons/fa";

const Articles = () => {
  return (
    <section id="home-articles " className="home-articles">
      <div className="container">
        <h1 className="article-title">ARTICLES</h1>
        <div className="article-box">
          <div className="article-item-box box1">
            <p className="article-item-icon">
              <BsBookHalf />
            </p>
            <h2 className="article-item-title">Book</h2>
            <Link href="/boards/book">
              <a>
                <FaArrowCircleRight className="article-btn" />
              </a>
            </Link>
          </div>
          <div className="article-item-box box2">
            <p className="article-item-icon">
              <GiClothes />
            </p>
            <h2 className="article-item-title">Clothes</h2>
            <Link href="/boards/clothes">
              <a>
                <FaArrowCircleRight className="article-btn" />
              </a>
            </Link>
          </div>
          <div className="article-item-box box3">
            <p className="article-item-icon">
              <BsLaptop />
            </p>
            <h2 className="article-item-title">Device</h2>
            <Link href="/boards/device">
              <a>
                <FaArrowCircleRight className="article-btn" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;
