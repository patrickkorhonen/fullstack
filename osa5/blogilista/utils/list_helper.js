const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const initial = 0;
    const total = blogs.map((blog) => blog.likes).reduce(
        (a, c) => a + c,
        initial,
    )
    return total
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map((blog) => blog.likes)
    const max = Math.max(...likes)
    const mostLiked = blogs.find((blog) => blog.likes === max)
    return mostLiked
}

const mostBlogs = (blogs) => {
    const authorMap = new Map();
    blogs.map((blog) => authorMap.set(blog.author, authorMap.get(blog.author) + 1 || 1))
    const max = Math.max(...authorMap.values())
    let result = ""
    authorMap.forEach((value, key) => value === max ? result = key : null)
    return [result, max]
}

const mostLikes = (blogs) => {
    const authorMap = new Map();
    blogs.map((blog) => authorMap.set(blog.author, authorMap.get(blog.author) + blog.likes || blog.likes))
    const max = Math.max(...authorMap.values())
    let result = ""
    authorMap.forEach((value, key) => value === max ? result = key : null)
    return [result, max]    
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }