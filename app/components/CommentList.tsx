import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Form, useActionData, useTransition } from "remix";
import { CommentEntry } from "~/api/comments";

type CommentsListProps = {
  filmId: string;
  comments: CommentEntry[];
  cateId: number;
};

export default function CommentsList({
  filmId,
  comments,
  cateId,
}: CommentsListProps) {
  const transition = useTransition();
  const actionData = useActionData();

  return (
    <Container>
      <Container className="rounded border p-2">
        <h2 className="fs-3 fw-light fst-italic mb-3 d-flex align-items-center ">
          Danh sách bình luận
        </h2>
        {comments.map((comment, index) => (
          <div className="rounded border p-2 mt-2" key={index}>
            <b>{comment.name}: </b>
            <span>{comment.comment}</span>
          </div>
        ))}

        <h2 className="fs-3 fw-light fst-italic mb-3 d-flex align-items-center mt-5">
          Bình luận của bạn
        </h2>
        <Form
          method="post"
          action={`/movie/detail/${filmId}?cate=${cateId}`}
          className="mt-1 rounded border p-2"
        >
          <fieldset disabled={transition.state === "submitting"}>
            <Container className="text-white p-2 ">
              <Row className="row g-4">
                <Col className="col" xl={3} lg={3} md={3} sm={3} xs={3}>
                  <div>
                    <label>Tên của bạn:</label>
                    <input
                      name="name"
                      type="text"
                      className="input-comment w-100"
                      placeholder="Nhập tên của bạn"
                    />
                    {actionData?.errors.name && (
                      <p className="text-danger">{actionData.errors.name}</p>
                    )}
                  </div>
                </Col>
                <Col className="col" xl={7} lg={7} md={7} sm={7} xs={7}>
                  <div>
                    <label>Bình luận của bạn:</label>
                    <br />
                    <input
                      name="comment"
                      className="input-comment w-100"
                      placeholder="Nhập bình luận của bạn"
                    />
                    {actionData?.errors.comment && (
                      <p className="text-danger">{actionData.errors.comment}</p>
                    )}
                  </div>
                </Col>
                <Col className="col" xl={2} lg={2} md={2} sm={2} xs={2}>
                  <br />
                  <button type="submit" className="btn-comment">
                    {transition.state === "submitting" ? "Đăng..." : "Đăng"}
                  </button>
                </Col>
              </Row>
            </Container>
          </fieldset>
        </Form>
      </Container>
    </Container>
  );
}
