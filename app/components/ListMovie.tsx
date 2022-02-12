import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "remix";
import { MovieItem, PropMovieItem } from "~/api/movie";

export default function ListMovie({
  title,
  movies,
  homeSectionId,
  newTitle,
}: PropMovieItem) {
  return (
    <div id={`movie-${homeSectionId ? homeSectionId : "0"}`}>
      {!newTitle && (
        <h1 className="fs-3 fw-light fst-italic mb-3 d-flex align-items-center">
          <span>
            {title.includes("Loklok")
              ? "Phim tuyển chọn của REMIX"
              : title.includes("kinh")
              ? "Phim kinh dị"
              : title}
          </span>
        </h1>
      )}
      <Row className="row g-4">
        {movies &&
          movies?.map((item: MovieItem, index: number) => (
            <Col className="col" xl={2} lg={3} md={4} sm={6} xs={6} key={index}>
              <Link
                prefetch="intent"
                to={`/movie/detail/${item.id}?cate=${item.category}`}
                className="link-detail"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  width="100%"
                  height="100%"
                />
                <p className="p-2 fs-6">{item.title}</p>
              </Link>
            </Col>
          ))}
      </Row>
    </div>
  );
}
