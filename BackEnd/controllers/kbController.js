import KnowledgeBase from "../models/kbModel.js";
import asyncHandler from "express-async-handler";

// @desc    Fetch all knowledge base articles
// @route   GET /api/kb
// @access  Public
const getArticles = asyncHandler(async (req, res) => {
    const articles = await KnowledgeBase.find({});
    res.json(articles);
    }
);

// @desc    Fetch single knowledge base article
// @route   GET /api/kb/:id
// @access  Public
const getArticleById = asyncHandler(async (req, res) => {
    const article = await KnowledgeBase.findById(req.params.id);
    if (article) {
        res.json(article);
    } else {
        res.status(404);
        throw new Error("Article not found");
    }
});

// @desc    Delete a knowledge base article
// @route   DELETE /api/kb/:id
// @access  Private/Admin
const deleteArticle = asyncHandler(async (req, res) => {
    const article = await KnowledgeBase.findById(req.params.id);
    if (article) {
        await article.remove();
        res.json({ message: "Article removed" });
    } else {
        res.status(404);
        throw new Error("Article not found");
    }
});

// @desc    Create a knowledge base article
// @route   POST /api/kb
// @access  Private/Admin
const createArticle = asyncHandler(async (req, res) => {
    const { title, body, author, articleType, tags } = req.body;
    const article = new KnowledgeBase({
        title,
        body,
        author,
        articleType,
        tags,
    });

    const createdArticle = await article.save();
    res.status(201).json(createdArticle);
});

// @desc    Update a knowledge base article
// @route   PUT /api/kb/:id
// @access  Private/Admin
const updateArticle = asyncHandler(async (req, res) => {
    const { title, body, author, articleType, tags } = req.body;

    const article = await KnowledgeBase.findById(req.params.id);

    if (article) {
        article.title = title;
        article.body = body;
        article.author = author;
        article.articleType = articleType;
        article.tags = tags;

        const updatedArticle = await article.save();
        res.json(updatedArticle);
    } else {
        res.status(404);
        throw new Error("Article not found");
    }
});

export {
    getArticles,
    getArticleById,
    deleteArticle,
    createArticle,
    updateArticle,
};