import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import '../App.css';

const Searchbar = ({ setSearchQuery }) => {
  const [searchInput, setSearchInput] = useState('');
  const [quote, setQuote] = useState('');
  const fullQuote = "Find what you love, and let it fill your cart!";
  const animationFrameRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  useEffect(() => {
    let currentIndex = 0;

    const typeQuote = () => {
      if (currentIndex < fullQuote.length) {
        setQuote(fullQuote.slice(0, currentIndex + 1));
        currentIndex++;
        animationFrameRef.current = requestAnimationFrame(typeQuote);
      }
    };

    animationFrameRef.current = requestAnimationFrame(typeQuote);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="container-fluid Search-container">
      <div className="quote-container">
        <h2 id="quote-text">{quote}</h2>
      </div>

      <Form className="d-flex form-container" onSubmit={handleSearch}>
        <Form.Control
          type="search"
          placeholder="Search for your product......"
          className="me-2"
          aria-label="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button variant="outline-success" type="submit" className='button-search'>
          Search
        </button>
      </Form>
    </div>
  );
};

export default Searchbar;