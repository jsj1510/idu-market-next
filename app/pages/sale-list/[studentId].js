import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import Head from "next/head";

import BoardBanner from "../../components/Board/BoardBanner";
import MarketListItem from "../../components/Board/MarketListItem";

const saleListPage = () => {
  const [productList, setProductList] = useState([]);
  const [validation, setValidation] = useState(false);

  const router = useRouter();
  const { studentId } = router.query;

  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id && studentId) {
      if (id === studentId) {
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/sale-list/${studentId}`)
          .then((response) => {
            if (response.data.success) {
              const result = response.data.saleLists;
              setProductList(result);
            }
          })
          .catch((err) => {
            const response = err.response;
            console.log(response.data.msg);
            setValidation(false);
          });
      } else {
        alert("잘못된 접근입니다.");
        router.back();
      }
    }
  }, [id, studentId]);

  return (
    <>
      <Head>
        <title>IUAM | 판매 목록</title>
      </Head>
      <BoardBanner title="IUAM" desc="sale-list" />
      <section className="market" id="market">
        <Link href={`/students/${studentId}`}>
          <a className="profile-move-btn">Profile</a>
        </Link>
        <h1 className="watchlist-title">
          {`판매 목록 (${productList.length})`}
        </h1>
        <div className="container">
          {productList.length > 0 ? (
            <MarketListItem productList={productList} profile />
          ) : (
            <h1 className="empty-list-desc">판매 목록이 비어있습니다.</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default saleListPage;
