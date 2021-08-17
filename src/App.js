import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Pages/Home";
import Navbar from "./Components/Layout/Navbar";
import AddBlogs from "./Components/Blogs/AddBlogs";
import ViewBlog from "./Components/Blogs/ViewBlog";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/blog/add" component={AddBlogs} />
        <Route exact path="/blogs/view/:id" component={ViewBlog} />
      </Switch>
    </Router>
  );
}

export default App;
