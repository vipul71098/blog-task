import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import backimg from '../../assests/images/back.png';
import { useHistory, useParams, Link } from "react-router-dom";

const ViewBlog = () => {
  const { id } = useParams();

  const [blog, setblog] = useState({
    title: "",
    blog: "",
    comments: "",
    img: "",
  });
  const inputLoad = (e) => {
    setblog({ ...blog, [e.target.name]: e.target.value });
  };
  const intialLoad = (e) => {
    axios
      .get(
        `https://blog-api-task-node.herokuapp.com/api/v1/blog/getsingleblog/${id}`
      )
      .then((response) => {
        setblog(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://blog-api-task-node.herokuapp.com/api/v1/blog/updateblog/${id}`,
        blog
      )
      .then(() => alert('comment Udated.......'))
      .catch(() => console.log("not submitted........"));
  };
  useEffect(() => {
    intialLoad();
  }, []);
  return (
    <div class="mt-4">
    <Link exact to="/"><img src={backimg} style={{float:'left', marginLeft: '40px'}} width='50' height='50' /></Link>
      <section style={{paddingTop: '20px'}} class="bg-half bg-light d-table w-100">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12 text-center">
              <div class="page-next-level">
                <h1>{blog.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-6">
              <div class="card blog blog-detail border-0 shadow rounded">
                <img
                  src={blog.img.data}
                  style={{ height: "350px" }}
                  class="img-fluid rounded-top"
                  alt={blog.title}
                  title={blog.title}
                />
              </div>
              <div class="card-body content mt-3">
                <h4 class="text-muted" style={{ letterSpacing: '1px'}}>{blog.blog}</h4>

                <div class="mt-4">
                  <div>
                    <label style={{fontWeight: 'bold', fontSize:'20px'}}>Comments :</label>{" "}
                    <h5 class="text-muted">{blog.comments}</h5><br/>
                  </div>
                  <div style={{display: 'grid'}}>
                      <textarea style={{resize: 'none'}}
                        name="comments" rows='5'
                        onChange={(e) => {
                          inputLoad(e);
                        }}
                        value={blog.comments}
                      ></textarea>{" "}
                      &nbsp;&nbsp;&nbsp;
                      <button style={{width: '300px'}}
                        class="btn btn-primary"
                        onClick={(e) => {
                          onSubmit(e);
                        }}
                      >
                        {" "}
                        Update Comment{" "}
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewBlog;
