import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, LoaderFunction, useLoaderData } from "remix";
import { getFilms, ItemListTitle } from "~/api/movie";
import FormSearch from "~/components/FormSearch";
import ListMovie from "~/components/ListMovie";
import Slide from "~/components/Slide";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  const page = url.searchParams.get("page");

  return await getFilms(title, page);
};

export default function Index() {
  let listMovie = useLoaderData();

  const title = listMovie?.title;

  const newArrFilm = title ? listMovie?.newList : listMovie?.listData;

  let newListFilm = [];
  for (let i = 0; i < listMovie?.newArr?.length; i += 1) {
    for (let j = 0; j < listMovie?.newArr[i]?.length; j += 1) {
      newListFilm.push(listMovie?.newArr[i][j]);
    }
  }

  const listSlide = listMovie?.listData[0];

  return (
    <>
      <Slide listSlide={listSlide?.recommendContentVOList} />
      <Container className="text-white mb-5">
        <Row className="row g-6 mt-5">
          <Col className="col" lg={9} md={8} sm={8}>
            {title ? (
              <ListMovie
                movies={newListFilm}
                newTitle={title}
                title=""
                homeSectionId={0}
              />
            ) : (
              newArrFilm?.map((item: any, index: number) => (
                <ListMovie
                  movies={item?.recommendContentVOList}
                  title={item?.homeSectionName}
                  newTitle={title}
                  key={index}
                  homeSectionId={item?.homeSectionId}
                />
              ))
            )}
          </Col>

          <Col className="col" lg={3} md={4} sm={4}>
            <div className="sidebar">
              <FormSearch />
              {!title &&
                newArrFilm?.map((item: ItemListTitle, index: number) => (
                  <Link
                    to={`#movie-${item?.homeSectionId}`}
                    className="list-title mt-2 p-1"
                    key={index}
                  >
                    {item?.homeSectionName?.includes("Loklok")
                      ? "Phim tuy???n ch???n c???a REMIX"
                      : item?.homeSectionName?.includes("kinh")
                      ? "Phim kinh d???"
                      : item?.homeSectionName}
                  </Link>
                ))}
              <p className="choose-page">Ch???n trang</p>
              <div className="naviga">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8]?.map((i) => (
                  <Link
                    to={`?page=${i}`}
                    key={i}
                    className={`naviga-item ${
                      i === Number(listMovie?.newPage) ? "active-navi" : ""
                    }`}
                    prefetch="intent"
                  >
                    {i}
                  </Link>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="mt-5"></div>
    </>
  );
}
