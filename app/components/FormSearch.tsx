import React from "react";
import { Form } from "remix";
import SearchIcon from "./SearchIcon";

export default function FormSearch() {
  return (
    <Form reloadDocument action="" className="form-search">
      <input
        type="text"
        name="title"
        placeholder="Nhập phim bạn muốn xem"
        className="text-white input-search"
      />
      <button className="btn-search" type="submit">
        <SearchIcon />
      </button>
    </Form>
  );
}
