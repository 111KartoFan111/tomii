import React from 'react';
import './EventCard.css';

function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-image" style={{ backgroundImage: `url(${event.image})` }}>
        <div className="event-date-label">{event.date}</div>
      </div>
      <div className="event-details">
        <h3 className="event-title">{event.title}</h3>
        <div className="event-location">{event.location}</div>
      </div>
    </div>
  );
}

export default EventCard;
