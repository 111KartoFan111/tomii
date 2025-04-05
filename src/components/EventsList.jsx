import React from 'react';
import EventCard from './EventCard.jsx';
import './EventsList.css';

function EventsList() {
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
      title: 'EXO PLANET',
      date: '15 янв, 17:00',
      location: 'Барыс Арена',
      image: '/images/exoplanet.jpg'
    },
    {
      id: 3,
      title: 'EXO PLANET',
      date: '15 янв, 17:00',
      location: 'Барыс Арена',
      image: '/images/exoplanet.jpg'
    },
  ];

  return (
    <section className="events-list">
      <div className="events-header">
        <h2>Афиша событий</h2>
        <a href="/all-events" className="see-all">Показать все</a>
      </div>
      <div className="events-grid">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}

export default EventsList;