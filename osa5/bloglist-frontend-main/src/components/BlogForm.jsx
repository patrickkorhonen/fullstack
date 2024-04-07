import { useState } from "react";
import PropTypes from "prop-types"


const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [formShow, setFormShow] = useState(false);

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
    setFormShow(false);
  };

  return (
    <div>
      {formShow === false ? (
        <button onClick={() => setFormShow(true)}>new blog</button>
      ) : (
        <div>
          <h2>create new</h2>
          <form onSubmit={addBlog}>
            <div>
              title:
              <input
                type="text"
                placeholder="Title of the blog"
                value={title}
                name="title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author:
              <input
                type="text"
                placeholder="Author of the blog"
                value={author}
                name="author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url:
              <input
                type="text"
                placeholder="URL of the blog"
                value={url}
                name="url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <div>
              <button type="submit">create</button>
            </div>
          </form>
          <div>
            <button onClick={() => setFormShow(false)}>cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm;
