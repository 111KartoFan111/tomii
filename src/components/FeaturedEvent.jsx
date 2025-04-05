import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './FeaturedEvent.css';

function FeaturedEvent() {
  const featuredEvents = [
    {
      id: 1,
      title: 'NCT 127 TOUR',
      subtitle: 'С кэшбеком 20%!',
      image: '/images/nct127-featured.jpg',
    },
    {
      id: 2,
      title: 'EXO PLANET',
      subtitle: 'Специальные места',
      image: '/images/exoplanet-featured.jpg',
    },
  ];

  return (
    <section className="featured-event">
      <h2>Интересное</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
      >
        {featuredEvents.map(event => (
          <SwiperSlide key={event.id}>
            <div className="featured-slide" style={{ backgroundImage: `url(${event.image})` }}>
              <div className="featured-content">
                <h3>{event.title}</h3>
                <p>{event.subtitle}</p>
                <button className="buy-ticket-btn">Купить билет</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default FeaturedEvent;