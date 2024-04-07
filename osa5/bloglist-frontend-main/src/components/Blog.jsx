import { useState } from "react"
import blogService from "../services/blogs"
import PropTypes from "prop-types"

const Blog = ({ blog, setBlogs, user, handleLike }) => {
  const [open, setOpen] = useState(false)
  const initialUser = blog.user?.name || "unknown"
  const id = blog.id
  
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }
/*
  const handleLike = async () => {
    const newBlog = {
      user: blog.user?.id,
      likes: newblog.likes + 1,
      author: newblog.author,
      title: newblog.title,
      url: newblog.url
    }
    const likedBlog = await blogService.like(newblog.id, newBlog)
    setNewBlog(likedBlog)
  }
*/
  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(id)
      setBlogs(id)
    }
  }

  
return (
  <div style={blogStyle}>
    {open ? (
      <div>
        <div>{blog.title} {blog.author}
        <button onClick={() => setOpen(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}
          <button onClick={() => handleLike(id)}>like</button>
        </div>
        <div>{initialUser}</div>
        {blog.user?.username === user?.username && (
          <div>
            <button onClick={() => handleDelete()}>delete</button>
          </div>
        
        )}
      </div>
    ) : (
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setOpen(true)}>view</button>
      </div>
    )}
  </div>
)  
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired
}

export default Blog