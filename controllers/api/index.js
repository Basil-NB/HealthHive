const router = require("express").Router()
const userRoutes = require("./userRoutes.js")
const postRoutes = require("./postroutes.js")
const blogRoutes = require("./blogRoutes.js")
const commentRoutes = require("./commentRoutes.js")

//http://localhost:3001/api/users
router.use("/users", userRoutes)
router.use("/posts", postRoutes)
router.use("/blogs", blogRoutes)
router.use("/comments", commentRoutes)

module.exports = router