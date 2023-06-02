import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchHotCollections() {
      setLoaded(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setLoaded(false);
      setHotCollections(data);
    }

    fetchHotCollections();
  }, []);

  const carouselOptions = {
    loop: true,
    margin: 0,
    nav: true,
    responsive: {
      0: {
        items: 1, // Show 1 item on screens smaller than 576px
      },
      576: {
        items: 1, // Show 2 items on screens equal to or larger than 576px
      },
      768: {
        items: 2, // Show 3 items on screens equal to or larger than 768px
      },
      992: {
        items: 3, // Show 4 items on screens equal to or larger than 992px
      },
      1200: {
        items: 4
      }
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {hotCollections.length > 0 ? (
            <OwlCarousel {...carouselOptions}
            >
              {hotCollections.map((collection, index) => (
                <div
                  className={`col-lg-12 col-md-12 col-sm-12 col-xs-12`}
                  key={collection.id}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <>
            <OwlCarousel {...carouselOptions}>
            {new Array(4).fill().map((_, index) => (
                <div
                  className={`col-lg-12 col-md-12 col-sm-12 col-xs-12`}
                  key={index}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                        <Skeleton width={"100%"} height={"100%"}/>
                    </div>
                    <div className="nft_coll_pp">
                      <div>
                        <Skeleton width={"3rem"} height={"3rem"} borderRadius={"999999px"}/>
                      </div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <div>
                        <h4>
                          <Skeleton width={"6rem"} height={"1rem"} borderRadius={"12px"}/>
                        </h4>
                      </div>
                      <span>
                        <Skeleton width={"3rem"} height={"1rem"} borderRadius={"12xp"}/>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
