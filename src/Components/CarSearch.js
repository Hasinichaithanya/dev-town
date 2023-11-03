import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import "./carsearch.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CarCard from './CarCard';
import Pagination from './Pagination';

function CarSearch({ cars }) {
  const { page } = useParams();
  const navigate = useNavigate(); 

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [selectedMileage,setMileage] = useState("Mileage");
  const [selectedBrand,setBrand] = useState("All Brands");
  const carsPerPage = 6;

    const filterCars = (cars, query, brand,mileage) => {
      let filteredCars = cars;
      if (query) {
        filteredCars = filteredCars.filter((car) =>
          car.name.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (mileage === "high") {
        filteredCars.sort((a, b) => b.mileage - a.mileage);
      } else if (mileage === "low") {
        filteredCars.sort((a, b) => a.mileage - b.mileage);
      }
   
      if (brand !== "All Brands") {
        filteredCars = filteredCars.filter((car) => car.name === brand);
      } 

      return filteredCars;
    };
       
    const filteredCarsList = filterCars(cars,searchQuery,selectedBrand,selectedMileage);
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCarsList.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    navigate(`/page/${pageNumber}`); 
  };

  useEffect(() => {
    if (!page) {
      navigate('/page/1'); 
    }
  }, [page, navigate]);
 
 
  return (
    <div className="car-search">
      <div className="search-and-filters">
      <div className="search-input-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={searchQuery}      
              onChange={e => setSearchQuery(e.target.value)}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className='icon'/>
      </div>

      <select className='mileage' name="mileage" value={selectedMileage} onChange={(e) => setMileage(e.target.value)} >
        <option value="Mileage">Mileage</option>
        <option value="high">High</option>
        <option value="low">Low</option>
      </select>

     <select name="cars" value={selectedBrand} onChange={(e) => setBrand(e.target.value)} >
        <option value="All Brands">All Brands</option>
        <option value="Honda">Honda</option>
        <option value="Volvo">Volvo</option>
        <option value="Ford">Ford</option>
        <option value="BMW">BMW</option>
        <option value="Ferrari">Ferrari</option>
      </select>
    </div>
  
      <div className="car-list">
        { filteredCarsList.length>0? 
        currentCars.map(car => (
          <CarCard key={uuidv4()} car={car} />
        )):<h3>No Cars Found!</h3>}
      </div>

      <Pagination
        carsPerPage={carsPerPage}
        totalCars={filteredCarsList.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default CarSearch;
