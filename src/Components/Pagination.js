import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css"
import "./pagination.css";

const Pagination = ({ carsPerPage, totalCars, currentPage, paginate }) => {
  const pageNumbers = [];
  const threshold = 768; // Set your threshold for switching to mobile view

  for (let i = 1; i <= Math.ceil(totalCars / carsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= threshold);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= threshold);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [threshold]);

  if (isMobileView) {
    return (
      <div className='pagination-line'>
        <div>
          <span className="pagination-page"> {currentPage}</span>of<span className="pagination-page">{Math.ceil(totalCars / carsPerPage)}</span>
        </div>
        <div className='pagination'>
          <Button 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1 || totalCars === 0}
            variant="primary"
          >
            Previous
          </Button>
          {currentPage > 1 && (
            <>
              <span className='pagination-button'>1</span>
              {currentPage > 2 && <span className='pagination-dots'>...</span>}
            </>
          )}
          <span className='pagination-button'>{currentPage}</span>
          {currentPage < Math.ceil(totalCars / carsPerPage) && (
            <>
              {currentPage < Math.ceil(totalCars / carsPerPage) - 1 && <span className='pagination-dots'>...</span>}
              <span className='pagination-button'>{Math.ceil(totalCars / carsPerPage)}</span>
            </>
          )}
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalCars / carsPerPage) || totalCars === 0}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }

  // Full pagination for desktop view
  return (
    <div className='pagination-line'>
      <div>
        <span className="pagination-page"> {currentPage}</span>of<span className="pagination-page">{Math.ceil(totalCars / carsPerPage)}</span>
      </div>
      <div className='pagination'>
        <Button 
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1 || totalCars === 0}
          variant="primary"
        >
          Previous
        </Button>
        {pageNumbers.map(number => (
          <button
            key={number}
            className='pagination-button'
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length || totalCars === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
