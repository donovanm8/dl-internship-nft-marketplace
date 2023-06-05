import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Timer from "../../miscellaneous/Timer";
import { carouselOptions } from "../../miscellaneous/carousel";
import Skeleton from "../UI/Skeleton";
import NewItem from "../UI/NewItem";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function fetchNewItems() {
      setLoading(true)
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNewItems(data);
      setLoading(false)
    }
    fetchNewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
            {!loading ? <NewItem newItems={newItems}/> :(<OwlCarousel {...carouselOptions}>
              {new Array(6).fill().map((item, index) => (
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <Skeleton width={"50px"} height={"50px"} borderRadius={"99px"}/>
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${""}`}>
                        <img
                          src={""}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                        <Skeleton width={"100%"} height={"300px"}/>
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>
                          <Skeleton width={"60%"} height={"30px"}/>
                        </h4>
                      </Link>
                      <div className="nft__item_price">
                        <Skeleton width={"30%"} height={"20px"}/>
                      </div>
                      <div className="nft__item_like">
                          <Skeleton width={"40px"} height={"15px"}/>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>)}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
