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

    return blogs.length === 0
        ? null
        : blogs.reduce(reducer)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}