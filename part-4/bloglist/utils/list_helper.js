// import lodash
const _ = require('lodash')

// dummy function
const dummy = (blogs) => {
    return 1
} 

// function used to calculate total number of likes
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

// function used to retrieve blog with most likes 
const favoriteBlog = (blogs) => {
    const reducer = (prev, current) => {
        return prev.likes > current.likes 
            ? prev
            : current 
    }

    let blog = blogs.length === 0
        ? null
        : blogs.reduce(reducer)

    // format returned blog
    if (blog) {
        blog = {
            title: blog.title,
            author: blog.author,
            likes: blog.likes
        }
    }

    return blog
}

// function used to retrieve author with the most number of blogs
const mostBlogs = (blogs) => {
    // empty blogs
    if (blogs.length === 0) {
        return null
    }

    const result = _(blogs)
        .groupBy('author')
        .map((authorBlogs, authorName) => ({
            author: authorName,
            blogs: _.size(authorBlogs)
        }))
        .maxBy('blogs')
    
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}