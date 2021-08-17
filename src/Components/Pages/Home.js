import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setblog] = useState([]);

  useEffect(() => {
    onloadData();
  }, []);
  const onloadData = async () => {
    await axios
      .get("https://blog-api-task-node.herokuapp.com/api/v1/blog/getblog")
      .then((response) => {
        setblog(response.data.reverse());
      })
      .then((response) => {
        console.log("ress", response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteblog = (id) => {
    axios
      .delete(
        `https://blog-api-task-node.herokuapp.com/api/v1/blog/deleteblog/${id}`
      )
      .then((response) => {
        onloadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section class="section">
        <div class="container">
          <div class="row">
            {blogs.map((blog, index) => (
              <div class="col-lg-4 col-md-6 mb-4 pb-2">
                <div class="card blog rounded border-0 shadow overflow-hidden">
                  <div class="position-relative">
                    <img
                      src={blog.img.data}
                      height="200"
                      class="card-img-top"
                      alt="How to Build a Sales Pipeline?"
                      title="How to Build a Sales Pipeline?"
                    />
                    <div class="overlay rounded-top bg-dark"></div>
                  </div>
                  <div class="card-body content">
                    <h5>
                      <a
                        href="../../blog/how-to-build-a-sales-pipeline"
                        class="card-title title text-dark"
                      >
                        {blog.title}
                      </a>
                    </h5>
                    <div class="post-meta d-flex justify-content-between mt-3">
                      <ul class="list-unstyled mb-0">
                        <Link
                          class="btn btn-primary mr-2"
                          exact
                          to={`/blogs/view/${blog._id}`}
                        >
                          View
                        </Link>
                      </ul>

                      <Link
                        class="btn btn-danger"
                        onClick={() => deleteblog(blog._id)}
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
