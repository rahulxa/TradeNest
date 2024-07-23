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
    ['stock', 'market', 'trends'],
    ['commodity', 'trading', 'analysis'],
    ['investment', 'portfolio', 'diversification'],
    ['currency', 'forex', 'exchange'],
    ['economic', 'policy', 'impact'],
    ['corporate', 'merger', 'acquisition'],
    ['startup', 'funding', 'rounds'],
    ['global', 'trade', 'agreements']
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
          `https://api.thenewsapi.com/v1/news/all?api_token=${newsApiKey}&search=${param1}+${param2}+${param3}$categories=business&published_after=2024-07-16`
        );
        // response.some()
        console.log("fetching news:")
        setNews((prevNews) => {
          const newArticles = response.data.data.filter(newArticle => !prevNews.some(existingArticle => existingArticle.uuid === newArticle.uuid));
          return [...prevNews, ...newArticles];
        });
        console.log("this is news:", news)
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
    <Container fluid className="py-4 bg-light">
      <Row className="justify-content-center mb-3 mt-0">
        <Col xs="auto">
          <h2 className="text-center text-primary border-bottom pb-2 mb-3" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
            Latest Financial News
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-3 mt-0" style={{ marginLeft: "10px" }}>
              {news.map((article, index) => (
                <Col key={index} className="d-flex">
                  <Card
                    className="flex-grow-1 border-0 shadow-lg d-flex flex-column"
                    style={{
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      borderRadius: '0.5rem',
                      overflow: 'hidden',
                      height: '450px', // Fixed height for all cards
                      width: '100%' // Ensure full width within the column
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    {article.image_url && (
                      <div style={{ height: '200px', overflow: 'hidden' }}>
                        <Card.Img
                          variant="top"
                          src={article.image_url}
                          alt={article.title}
                          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                        />
                      </div>
                    )}
                    <Card.Body className="d-flex flex-column" style={{ overflow: 'hidden' }}>
                      <Card.Title className="h5 mb-3 text-dark" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                        {article.title}
                      </Card.Title>
                      <Card.Text className="text-muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                        {article.description}
                      </Card.Text>
                      <div className="mt-auto">
                        <small className="text-muted">{formatDate(article.published_at)}</small>
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-white border-0 d-flex justify-content-between align-items-center">
                      <Card.Link
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary"
                        style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem" }}
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