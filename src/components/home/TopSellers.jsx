import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton"

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchTopSellers(){
      const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      setTopSellers(data)
      setLoading(false)
    }
    fetchTopSellers()
  },[])
  
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {!loading ? topSellers.map((sellers) => (
                <li key={sellers.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${sellers.id}`}>
                      <img
                        className="lazy pp-author"
                        src={sellers.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${sellers.id}`}>{sellers.authorName}</Link>
                    <span>{sellers.price} ETH</span>
                  </div>
                </li>
              )) : (
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <Skeleton width={"50px"} height={"50px"} borderRadius={"50px"}/>
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">
                        <Skeleton width={"90%"}/>
                      </Link>
                      <span>
                        <Skeleton width={"100px"}/>
                      </span>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
