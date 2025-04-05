import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventService from '../services/EventService';
import './EventDetail.css';

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketType, setTicketType] = useState('standard');
  
  useEffect(() => {
    // Загружаем данные о мероприятии при монтировании компонента
    const eventData = EventService.getEventById(parseInt(id, 10));
    
    if (eventData) {
      setEvent(eventData);
      setLoading(false);
    } else {
      // Если мероприятие не найдено, перенаправляем на страницу афиши
      navigate('/afisha');
    }
  }, [id, navigate]);
  
  if (loading || !event) {
    return <div className="loading">Загрузка...</div>;
  }
  
  // Получаем категорию места по номеру ряда
  const getSeatCategory = (row) => {
    return EventService.getSeatCategory(event.id, row);
  };
  
  // Получаем цену для определенного места
  const getSeatPrice = (row) => {
    return EventService.getSeatPrice(event.id, row, ticketType);
  };
  
  // Проверяем, доступно ли место
  const isSeatAvailable = (row, seat) => {
    return EventService.isSeatAvailable(event.id, row, seat);
  };
  
  // Получаем цвет для категории места
  const getCategoryColor = (row) => {
    const category = getSeatCategory(row);
    if (category === 'vip') return '#8e44ad';
    if (category === 'premium') return '#3498db';
    return '#2ecc71';
  };
  
  const handleDateSelection = (dateId) => {
    setSelectedDate(dateId);
    setSelectedSeats([]);
  };

  const handleSeatClick = (row, seat) => {
    if (!isSeatAvailable(row, seat)) return;
    
    const seatId = `${row}-${seat}`;
    const isSeatSelected = selectedSeats.some(s => s.id === seatId);
    
    if (isSeatSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seatId));
    } else {
      const category = getSeatCategory(row);
      const price = getSeatPrice(row);
      setSelectedSeats([...selectedSeats, { 
        id: seatId, 
        row, 
        seat, 
        category,
        price
      }]);
    }
  };
  
  const handleTicketTypeChange = (type) => {
    setTicketType(type);
    // Обновляем цены для выбранных мест
    setSelectedSeats(selectedSeats.map(seat => ({
      ...seat,
      price: EventService.getSeatPrice(event.id, seat.row, type)
    })));
  };
  
  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  return (
    <div className="event-page">
      <div className="event-header" style={{ backgroundImage: `url(${event.image.detail})` }}>
        <div className="event-header-overlay">
          <div className="container">
            <div className="event-header-content">
              <h1>{event.title}</h1>
              <h2>{event.subtitle}</h2>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="event-content">
          <div className="event-info">
            <div className="event-info-item">
              <h3>Стоимость билета</h3>
              <p>{event.priceDisplay}</p>
            </div>
            <div className="event-info-item">
              <h3>Ограничение</h3>
              <p>{event.restriction}</p>
            </div>
          </div>
          
          <div className="event-description">
            <h3>Описание</h3>
            <div className="description-divider"></div>
            {event.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="event-booking">
            <div className="date-selection">
              <h3>Выберите дату мероприятия</h3>
              <div className="date-buttons">
                {event.dates.map(date => (
                  <button 
                    key={date.id} 
                    className={`date-button ${selectedDate === date.id ? 'selected' : ''}`}
                    onClick={() => handleDateSelection(date.id)}
                  >
                    {date.date}, {date.time}
                  </button>
                ))}
              </div>
            </div>
            
            {selectedDate && (
              <>
                <div className="ticket-type-selection">
                  <h3>Выберите тип билета</h3>
                  <div className="ticket-type-buttons">
                    <button 
                      className={`ticket-type-button ${ticketType === 'standard' ? 'selected' : ''}`}
                      onClick={() => handleTicketTypeChange('standard')}
                    >
                      Обычный
                    </button>
                    <button
                      className={`ticket-type-button ${ticketType === 'student' ? 'selected' : ''}`}
                      onClick={() => handleTicketTypeChange('student')}
                    >
                      Студенческий
                    </button>
                  </div>
                </div>

                <div className="seating-legend">
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#8e44ad' }}></div>
                    <span>VIP ({event.prices[ticketType].vip}тг)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#3498db' }}></div>
                    <span>Премиум ({event.prices[ticketType].premium}тг)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#2ecc71' }}></div>
                    <span>Стандарт ({event.prices[ticketType].standard}тг)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color selected"></div>
                    <span>Выбранные места</span>
                  </div>
                </div>
                <div className="seating-layout">
                  <div className="hall-schema">
                    <h3>Схема зала</h3>
                    <div className="stage">СЦЕНА</div>
                    <div className="seating-chart">
                      {[...Array(event.venue.seatLayout.rows)].map((_, rowIndex) => {
                        const row = rowIndex + 1;
                        const seatsInRow = event.venue.seatLayout.seatsInRow[rowIndex];
                        return (
                          <div key={row} className="seat-row">
                            <div className="row-number">{row}</div>
                            {[...Array(seatsInRow)].map((_, seatIndex) => {
                              const seat = seatIndex + 1;
                              const isAvailable = isSeatAvailable(row, seat);
                              const isSelected = selectedSeats.some(s => s.id === `${row}-${seat}`);
                              return (
                                <div
                                  key={seat}
                                  className={`seat ${isAvailable ? 'available' : 'unavailable'} ${isSelected ? 'selected' : ''}`}
                                  style={{
                                    backgroundColor: isSelected ? '#e74c3c' :
                                                    !isAvailable ? '#95a5a6' :
                                                    getCategoryColor(row)
                                  }}
                                  onClick={() => handleSeatClick(row, seat)}
                                />
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="selected-seats-summary">
                    <h3>Выбранные места</h3>
                    {selectedSeats.length === 0 ? (
                      <p className="no-seats-message">Выберите места на схеме зала</p>
                    ) : (
                      <>
                        <div className="selected-seats-list">
                          {selectedSeats.map(seat => (
                            <div key={seat.id} className="selected-seat-item">
                              <div className="seats">
                                <span className="seat-label">Ряд {seat.row}, Место {seat.seat}</span>
                                <span className="seat-category">
                                  {seat.category === 'vip' ? 'VIP' : 
                                   seat.category === 'premium' ? 'Премиум' : 'Стандарт'}
                                </span>
                              </div>
                              <div className="seat-price">{seat.price} тг</div>
                            </div>
                          ))}
                        </div>
                        <div className="total-price">
                          <div className="total-label">Итого:</div>
                          <div className="total-amount">{getTotalPrice()} тг</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="booking-notice">
                  <p>
                    Внимание! Выбранные вами билеты должны быть оплачены банковской картой в течение 30 минут. Обязательно распечатайте приобретенный вами электронный билет. Его необходимо предъявить при входе в театр.
                  </p>
                </div>
                <div className="booking-actions">
                  <button
                    className={`pay-button ${selectedSeats.length === 0 ? 'disabled' : ''}`}
                    disabled={selectedSeats.length === 0}
                  >
                    Оплатить билет
                  </button>
                  <button className="cancel-button">Отменить</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;