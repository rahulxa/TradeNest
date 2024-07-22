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
    <Container fluid className="py-1 bg-light" style={{ marginTop: "-30px" }}>
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <h2 className="text-center text-primary border-bottom pb-2 d-inline-block mt-0">
            Latest Financial News
          </h2>
        </Col>
      </Row>
      <Row style={{ marginTop: "-20px" }}>
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
            <Row xs={1} md={2} lg={3} className="g-4">
              {news.map((article, index) => (
                <Col key={index}>
                  <Card
                    className="h-100 border-0 shadow-sm"
                    style={{
                      transition: 'all 0.3s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
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
                      <Card.Title className="h5 mb-3">{article.title}</Card.Title>
                      <Card.Text className="text-muted">{article.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-white border-0 d-flex justify-content-between align-items-center">
                      <small className="text-muted">{formatDate(article.published_at)}</small>
                      <Card.Link
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm"
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