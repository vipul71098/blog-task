import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddBlogs = () => {
  let history = useHistory();
  const [blogs, setblogs] = useState({
    title: "",
    blog: "",
    comments: "",
    image: "",
  });
  const { title, comments, blog, image } = blogs;
  var upImg;

  /**
   * get input box value and set to the state value
   * @param {object} e
   */
  const inputLoad = (e) => {
    setblogs({
      ...blogs,
      [e.target.name]: e.target.value || e.target.files[0].name,
    });
  };

  /**
   * append form value into the formData and pass formData into insert Api
   * @param {object} e
   */

  let fd = new FormData();
  const inputLoadFile = (e) => {
    let imgs = e.target.files[0];
    upImg = e.target.files[0].name;
    fd.append("image", imgs);
    fd.append("title", title);
    fd.append("blog", blog);
    fd.append("comments", comments);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://blog-api-task-node.herokuapp.com/api/v1/blog/insertblog",
        fd
      )
      .then(() => history.push("/"))
      .catch(() => console.log("not submitted........"));
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Blog</h2>
        <form
          onSubmit={(e) => onSubmit(e)}
          method="post"
          enctype="multipart/form-data"
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your title Name"
              required
              value={title}
              name="title"
              onChange={(e) => {
                inputLoad(e);
              }}
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your blog"
              required
              value={blog}
              name="blog"
              rows="5"
              style={{ resize: "none" }}
              onChange={(e) => {
                inputLoad(e);
              }}
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your comments"
              required
              value={comments}
              name="comments"
              rows="3"
              style={{ resize: "none" }}
              onChange={(e) => {
                inputLoad(e);
              }}
            />
          </div>

          <div className="form-group">
            <input
              type="file"
              className="form-control form-control-lg"
              name="image"
              required
              value={upImg}
              onChange={(e) => {
                inputLoadFile(e);
              }}
            />
          </div>
          <button className="btn btn-primary btn-block">Add Blog</button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;
