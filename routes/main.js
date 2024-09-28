const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Index - Show all blog posts
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.render('index', { blogs });
    } catch (err) {
        res.status(500).send(err);
    }
});

// New - Show form to create new blog post
router.get('/new', (req, res) => {
    res.render('new');
});

// Create - Add new blog post to DB
router.post('/', async (req, res) => {
    try {
        await Blog.create(req.body.blog);
        res.redirect('/blogs');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Show - Show info about one blog post
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.render('show', { blog });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Edit - Show edit form for one blog post
router.get('/:id/edit', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.render('edit', { blog });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update - Update a particular blog post
router.put('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndUpdate(req.params.id, req.body.blog, { new: true });
        res.redirect(`/blogs/${req.params.id}`);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete - Delete a particular blog post
router.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndRemove(req.params.id);
        res.redirect('/blogs');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
