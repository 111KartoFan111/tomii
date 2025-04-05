import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import EventCard from './EventCard.jsx';
import './PopularEvents.css';

function PopularEvents() {
  const events = [
    {
      id: 1,
      title: 'NCT 127 TOUR',
      date: '24 мая, 18:30',
      location: 'Барыс Арена',
      image: '/images/nct127.jpg'
    },
    {
      id: 2,
      title: 'Jose Carreras',
      date: '1 июня, 16:00',
      location: 'QAZAQCONCERT',
      image: '/images/josecarreras.jpg'
    },
    {
      id: 3,
      title: 'EXO CHEN',
      date: '6 апр, 18:00',
      location: 'Алматы Арена',
      image: '/images/exochen.jpg'
    },
    {
      id: 4,
      title: 'EXO PLANET',
      date: '15 янв, 17:00',
      location: 'Барыс Арена',
      image: '/images/exoplanet.jpg'
    },
  ];

  return (
    <section className="popular-events">
      <h2>Популярное</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {events.map(event => (
          <SwiperSlide key={event.id}>
            <EventCard event={event} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default PopularEvents;