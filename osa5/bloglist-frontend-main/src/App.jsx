import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    async function fetchData() {
    const blogs = await blogService.getAll()
    setBlogs(blogs);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleBlogCreation = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject);
      console.log(blog)
      setBlogs(blogs.concat({...blog, user: user}));
      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("blog was not created");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleLike = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const newBlog = {
      ...blog, likes: blog.likes + 1, user: blog.user?.id,
    }
    await blogService.like(id, newBlog)
    setBlogs(blogs.map((blog) => blog.id !== id ? blog : {...blog, likes: blog.likes + 1}));
  }

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
        <BlogForm createBlog={handleBlogCreation} />
      {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} setBlogs={blogDelete} />
      ))}
    </div>
  );

  return <div>{user === null ? loginForm() : blogList()}</div>;
};

export default App;
