import "../assets/styles/layouts/Home.scss";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

import sliderImg from "../assets/images/slider-img.jpg";

import { MessageCircle } from "lucide-react";
import { Heart } from "lucide-react";
import { TentTree } from "lucide-react";

function Home() {
  return (
    <div className="home-wrapper">
      <section className="home-bg">
        <div className="home-title">
          <p className="home-title__left">
            CIT<span>Y</span>
          </p>
          <p className="home-title__right">
            <span>G</span>UIDE
          </p>
        </div>
      </section>
      <div className="home-content">
        <section className="container home-slider">
          <h1>Meilleurs visites</h1>
          <Splide
            options={{
              rewind: true,
              gap: "3rem",
              perMove: 1,
              perPage: 3,
            }}
            hasTrack={false}
            aria-label="..."
          >
            <div className="slider-wrapper">
              <SplideTrack>
                <SplideSlide>
                  <div className="slide-body">
                    <img
                      className="slide-img"
                      src={sliderImg}
                      alt="slider-img"
                    />
                    <div className="slide-content">
                      <h3 className="slide-content__title">Nom du lieu</h3>
                      <p className="slide-content__cat">catégorie</p>
                      <p className="slide-content__desc">
                        description du lieu coupé lorem ipsum...
                      </p>
                      <p className="slide-content__town">Nom de la ville</p>
                      <div className="slide-content__buttons">
                        <button>
                          <MessageCircle />
                        </button>
                        <button>
                          <Heart />
                        </button>
                      </div>
                    </div>
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="slide-body">
                    <img
                      className="slide-img"
                      src={sliderImg}
                      alt="slider-img"
                    />
                    <div className="slide-content">
                      <h3 className="slide-content__title">Nom du lieu</h3>
                      <p className="slide-content__cat">catégorie</p>
                      <p className="slide-content__desc">
                        description du lieu coupé lorem ipsum...
                      </p>
                      <p className="slide-content__town">Nom de la ville</p>
                      <div className="slide-content__buttons">
                        <button>
                          <MessageCircle />
                        </button>
                        <button>
                          <Heart />
                        </button>
                      </div>
                    </div>
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="slide-body">
                    <img
                      className="slide-img"
                      src={sliderImg}
                      alt="slider-img"
                    />
                    <div className="slide-content">
                      <h3 className="slide-content__title">Nom du lieu</h3>
                      <p className="slide-content__cat">catégorie</p>
                      <p className="slide-content__desc">
                        description du lieu coupé lorem ipsum...
                      </p>
                      <p className="slide-content__town">Nom de la ville</p>
                      <div className="slide-content__buttons">
                        <button>
                          <MessageCircle />
                        </button>
                        <button>
                          <Heart />
                        </button>
                      </div>
                    </div>
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="slide-body">
                    <img
                      className="slide-img"
                      src={sliderImg}
                      alt="slider-img"
                    />
                    <div className="slide-content">
                      <h3 className="slide-content__title">Nom du lieu</h3>
                      <p className="slide-content__cat">catégorie</p>
                      <p className="slide-content__desc">
                        description du lieu coupé lorem ipsum...
                      </p>
                      <p className="slide-content__town">Nom de la ville</p>
                      <div className="slide-content__buttons">
                        <button>
                          <MessageCircle />
                        </button>
                        <button>
                          <Heart />
                        </button>
                      </div>
                    </div>
                  </div>
                </SplideSlide>
              </SplideTrack>
            </div>
            <div className="splide__arrows" />
          </Splide>
        </section>
        <section className="home-grid">
          <h1 className="container home-grid__title">
            Des destinations diversifiées
          </h1>
          <div className="grid-wrapper">
            <div className="grid-item">
              <div className="grid-item__icon">
                <TentTree color="white" />
              </div>
              <p className="grid-item__title">title</p>
            </div>
            <div className="grid-item">
              <div className="grid-item__icon">
                <TentTree color="white" />
              </div>
              <p className="grid-item__title">title</p>
            </div>
            <div className="grid-item">
              <div className="grid-item__icon">
                <TentTree color="white" />
              </div>
              <p className="grid-item__title">title</p>
            </div>
            <div className="grid-item">
              <div className="grid-item__icon">
                <TentTree color="white" />
              </div>
              <p className="grid-item__title">title</p>
            </div>
            <div className="grid-item">
              <div className="grid-item__icon">
                <TentTree color="white" />
              </div>
              <p className="grid-item__title">title</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
