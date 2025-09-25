import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {
  Film,
  Star,
  Calendar,
  Users,
  BookOpen,
  Play,
  ArrowLeft,
} from 'lucide-react';

const MoviesDetails = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const param = useParams();

  // Get Movies Details
  const getAllMoviesDetails = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${param.id}?api_key=d672df6415f38db3264df07da7c0ffad&append_to_response=videos%2Cimages`
      );
      setMovie(res.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMoviesDetails();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ minHeight: '100vh' }}>
        <div className='text-center'>
          <div
            className='spinner-border mb-3'
            style={{ width: '3rem', height: '3rem' }}></div>
          <h3>Loading...</h3>
        </div>
      </div>
    );
  }

  const {
    title = 'Unknown Title',
    release_date = '',
    vote_count = 0,
    vote_average = 0,
    overview = 'No overview available.',
    poster_path = null,
    homepage = '',
  } = movie;

  return (
    <Container className='py-4'>
      {/* Main Movie Card */}
      <Card className='mb-4'>
        <Row className='g-0'>
          {/* Poster Section */}
          <Col md={4} className='p-3'>
            {poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={title}
                className='w-100 rounded'
                style={{ aspectRatio: '2/3', objectFit: 'cover' }}
              />
            ) : (
              <div
                className='w-100 rounded bg-light d-flex align-items-center justify-content-center text-muted'
                style={{ aspectRatio: '2/3' }}>
                <Film size={48} />
              </div>
            )}
          </Col>

          {/* Details Section */}
          <Col md={8} className='p-3'>
            <div className='d-flex justify-content-between align-items-start mb-3'>
              <h1 className='h2 mb-0'>{title}</h1>
              {vote_average > 0 && (
                <span className='badge bg-warning text-dark d-flex align-items-center gap-1'>
                  <Star size={16} fill='currentColor' />
                  {vote_average.toFixed(1)}
                </span>
              )}
            </div>

            {/* Quick Stats */}
            <Row className='mb-3'>
              <Col sm={6}>
                <div className='d-flex align-items-center gap-2 text-muted mb-2'>
                  <Calendar size={16} />
                  <span>Release Date</span>
                </div>
                <div className='fw-bold'>
                  {release_date
                    ? new Date(release_date).getFullYear()
                    : 'Unknown'}
                </div>
              </Col>
              <Col sm={6}>
                <div className='d-flex align-items-center gap-2 text-muted mb-2'>
                  <Users size={16} />
                  <span>Votes</span>
                </div>
                <div className='fw-bold'>
                  {vote_count ? vote_count.toLocaleString() : '0'}
                </div>
              </Col>
            </Row>

            {/* Rating Bar */}
            {vote_average > 0 && (
              <div className='mb-3'>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                  <span className='text-muted small'>Rating</span>
                  <span className='fw-bold'>{vote_average.toFixed(1)}/10</span>
                </div>
                <div className='progress' style={{ height: '8px' }}>
                  <div
                    className='progress-bar bg-warning'
                    style={{ width: `${(vote_average / 10) * 100}%` }}></div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Card>

      {/* Story Section */}
      <Card className='mb-4'>
        <Card.Body>
          <h3 className='h4 mb-3 d-flex align-items-center gap-2'>
            <BookOpen size={20} />
            Story
          </h3>
          <p className='text-muted mb-0'>{overview}</p>
        </Card.Body>
      </Card>

      {/* Action Buttons */}
      <div className='d-flex gap-3'>
        <Link to='/' className='text-decoration-none'>
          <Button
            variant='secondary'
            className='d-flex align-items-center gap-2'>
            <ArrowLeft size={16} />
            Back Home
          </Button>
        </Link>

        {homepage && (
          <a
            href={homepage}
            target='_blank'
            rel='noreferrer noopener'
            className='text-decoration-none'>
            <Button
              variant='primary'
              className='d-flex align-items-center gap-2'>
              <Play size={16} />
              Watch Now
            </Button>
          </a>
        )}
      </div>
    </Container>
  );
};

export default MoviesDetails;
