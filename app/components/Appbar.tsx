import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "remix";

export default function Appbar() {
  return (
    <div className="position-fixed fixed-bottom ">
      <div className="p-0 navbar">
        <Container>
          <Link
            to="/"
            prefetch="intent"
          >
            <div>
              <img
                alt=""
                src="https://remixplay.net/wp-content/uploads/2021/05/remix-play.png"
                width="200"
                height="60"
                className="d-inline-block align-top"
              />
            </div>
          </Link>
          <div>
            <Button variant="dark" className="border">
              <Link
                prefetch="intent"
                to="/"
                className="text-white text-decoration-none w-100 link-login"
              >
                Đăng nhập
              </Link>
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
