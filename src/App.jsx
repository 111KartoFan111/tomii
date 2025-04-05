import React from 'react';
import Header from './components/Header.jsx';
import Banner from './components/Banner.jsx';
import PopularEvents from './components/PopularEvents';
import FeaturedEvent from './components/FeaturedEvent';
import EventsList from './components/EventsList';
import Footer from './components/Footer.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Banner />
      <div className="container">
        <PopularEvents />
        <FeaturedEvent />
        <EventsList />
      </div>
      <Footer />
    </div>
  );
}

export default App;