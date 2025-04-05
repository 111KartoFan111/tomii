import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Banner.css';

function Banner() {
  return (
    <div className="banner-container">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
      >
        <SwiperSlide>
          <div className="banner-slide" style={{ backgroundImage: "url('/images/concert-blue.jpg')" }}>
            <div className="banner-content">
              <h1>LiveWave</h1>
              <p>Покупай билеты с нами!</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner-slide" style={{ backgroundImage: "url('/images/concert-alt.jpg')" }}>
            <div className="banner-content">
              <h1>Все концерты</h1>
              <p>В одном месте</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Banner;