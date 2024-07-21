import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeNavItems } from '../store/navSlice';
import { Card, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;
  const countRef = useRef(0)
  const intervalIdRef = useRef(0)
  const dispatch = useDispatch();

  const searchParams = [
    ['stock', 'market', 'news'],
    ['stock', 'exchange', 'updates'],
    ['economic', 'indicators', 'stocks'],
    ['investment', 'strategies', 'analysis'],
    ['corporate', 'earnings', 'reports'],
    ['market', 'volatility', 'factors'],
    ['commodity', 'prices', 'impact'],
    ['currency', 'exchange', 'rates']
  ];

  useEffect(() => {
    dispatch(changeNavItems({ currentItem: 'news' }));

    const fetchNews = async () => {

      if (countRef.current >= searchParams.length) {
        clearInterval(intervalIdRef.current);
        return
      }

      try {
        // setLoading(true);
        setError(null);
        const [param1, param2, param3] = searchParams[countRef.current];
        const response = await axios.get(
          `https://api.thenewsapi.com/v1/news/all?api_token=${newsApiKey}&search=${param1}+${param2}+${param3}`
        );

        setNews(prevNews => [...prevNews, ...response.data.data]);
        countRef.current += 1;

      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    intervalIdRef.current = setInterval(fetchNews, 1000)

    return () => clearInterval(intervalIdRef.current);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container fluid className="">
      <Row className="justify-content-center mb-3" style={{ marginTop: '-1rem' }}>
        <Col xs="auto">
          <h4 className="text-center text-muted border-bottom pb-2 d-inline-block text-uppercase fw-bold">Currently</h4>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-3">
              {news.map((article, index) => (
                <Col key={index}>
                  <Card
                    className="h-100"
                    style={{
                      boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
                      transition: 'all 0.3s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)';
                    }}
                  >
                    {article.image_url && (
                      <Card.Img
                        variant="top"
                        src={article.image_url}
                        alt={article.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{article.title}</Card.Title>
                      <Card.Text>{article.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-white border-0">
                      <small className="text-muted">{formatDate(article.published_at)}</small>
                      <Card.Link
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="float-end"
                      >
                        Read more
                      </Card.Link>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default News;