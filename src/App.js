import React from 'react';
import NavBar from './Components/NavBar';
import { Container } from 'react-bootstrap';
import MoviesDetails from './Components/MoviesDetials';
import MoviesList from './Components/MoviesList';
import './style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollTop from './Components/ScrollTop';

function App() {
  return (
    <BrowserRouter>
      <div className='font color-body'>
        <ScrollTop />
        <NavBar />
        <Container>
          <Routes>
            <Route path='/' element={<MoviesList />} />
            <Route path='/movie/:id' element={<MoviesDetails />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
