import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  ActionFunction,
  Link,
  LoaderFunction,
  MetaFunction,
  redirect,
  useCatch,
  useLoaderData,
} from "remix";
import invariant from "tiny-invariant";
// import { addComment } from "~/api/comments";
import { getFilmDetail, MovieItemDetail } from "~/api/movie";
// import CommentsList from "~/components/CommentList";

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.aliasName,
    description: data.name,
    image: data.coverHorizontalUrl,
  };
};

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.name, "expected params.name");
  const url = new URL(request.url);
  const cateId = url.searchParams.get("cate");
  const body = await request.formData();

  const comment: any = {
    name: body.get("name") as string,
    comment: body.get("comment") as string,
    filmId: params.name,
    cateId,
  };
  console.log("comment", comment);

  const errors = { name: "", comment: "" };

  if (!comment.name) {
    errors.name = "Vui lòng nhập tên của bạn";
  }

  if (!comment.comment) {
    errors.comment = "Vui lòng nhập bình luận";
  }

  if (errors.name || errors.comment) {
    const values = Object.fromEntries(body);
    return { errors, values };
  }

  // await addComment(comment);

  return redirect(`/movie/detail/${params.name}?cate=${cateId}`);
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  const cate = url.searchParams.get("cate");
  invariant(params?.name, "expected params.name");
  const name = params?.name;

  const a = await getFilmDetail(name, cate);

  return a;
};

export default function index() {
  const filmData = useLoaderData();
  const film = filmData?.films;

  return (
    <div className="page-detail">
      <img
        src={film?.coverHorizontalUrl}
        alt={film?.name}
        className="row position-absolute detail-img"
      />
      <Row className="row p-5 gx-5 detail-row position-relative">
        <Col className="col-6 d-flex justify-content-end align-items-center">
          <img src={film?.coverVerticalUrl} alt="" width="400" height="500" />
        </Col>
        <Col className="col-6 text-white mt-5">
          <h1>{film?.name}</h1>
          <p>
            <span className="text-info">Năm:</span> 2020.
          </p>
          <p>
            <span className="text-info">Quốc gia:</span> {film?.areaNameList[0]}
            .
          </p>
          <p>
            <span className="text-info">Thể loại:</span>{" "}
            {film?.tagNameList?.map((item: string) => (
              <span key={item}>{item}, </span>
            ))}{" "}
            {film?.drameTypeVo.drameName}.
          </p>
          <p>
            <span className="text-info">Số tập:</span> {film?.episodeVo?.length}
            .
          </p>
          <p>
            <span className="text-info">Thời gian:</span> 30 phút/ tập.
          </p>
          <p className="tom-tat">
            <span className="text-info">Tóm tắt: </span>
            {film?.introduction}
          </p>
          <p className="d-flex align-items-center">
            <span className="text-info">Đánh giá: </span> &nbsp;{film?.score}
            &nbsp;
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/512px-Star_icon_stylized.svg.png"
              alt=""
              width="15"
            />
          </p>
          <Button variant="dark" className="border">
            Xem ngay
          </Button>
        </Col>
      </Row>
      <Container className="text-white p-5">
        <div className="mt-5">
          <h1 className="fs-3 fw-light fst-italic mb-3 d-flex align-items-center">
            <span>Phim tương tự</span>
          </h1>
          <Row className="row g-4">
            {film?.likeList.map((item: MovieItemDetail, index: number) => (
              <Col
                className="col"
                xl={2}
                lg={3}
                md={4}
                sm={6}
                xs={6}
                key={index}
              >
                <Link
                  to={`/movie/detail/${item.id}?cate=${item.category}`}
                  className="link-detail"
                  prefetch="intent"
                >
                  <div className="text-center">
                    <img
                      src={item.coverHorizontalUrl}
                      alt={item.name}
                      width="100%"
                      height="100%"
                    />
                    <p className="p-2 fs-6">{item.name}</p>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
      {/* <CommentsList
        filmId={film.id}
        comments={comments || []}
        cateId={film.category}
      /> */}
    </div>
  );
}

export function ErrorBoundary({ error }: any) {
  return (
    <div className="body">
      <div className="">Xin thông báo</div>
      <div className="">
        <div className="">Uh oh... Xin lỗi, đã có lỗi xảy ra!</div>
        <p>{error?.message}</p>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div className="body">
        <div className="">Xin thông báo</div>
        <div className="">
          <div className="">Không tìm thấy trang này!</div>
          <p>
            {caught.status} {caught.statusText}
          </p>
        </div>
      </div>
    );
  }

  throw new Error("Unkown error");
}
