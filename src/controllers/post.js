const prisma = require("../utils/prisma");


const createPosts = async (req, res) => {
    const { title, content, imageUrl, userId, categories } = req.body;
    const createdPosts = await prisma.post.create({
        data: {
            title,
            content,
            imageUrl,
            user: {
                connect: {
                    id: userId
                }
            },
            categories: {
                create: categories.map((category) => {
                    return {
                        category: {
                            connectOrCreate: {
                                where: { name: category.name },
                                create: { name: category.name }
                            }
                        }
                    }
                })
            }
        },
        include: {
            user: true,
            categories: true,
            user: {
                include: {
                    profile: true
                }
            }
        }
    });
    console.log("created posts:", createdPosts);
    res.json({ data: { createdPosts } });
}


const getAllPosts = async (req, res) => {
    const { orderBy, limit } = req.query;
    const { id } = req.params;

    console.log("query", req.params);

    const createQueryObject = {
        include: {
            categories: true,
            comments: true,
            comments: {
                include: {
                    comments: true
                }
            }
        },
        orderBy: orderBy ? {
            publishedAt: orderBy
        } : {}
    }
    if (limit) {
        createObject.take = limit
    }

    isNaN(parseInt(id)) ? createQueryObject.where = {
        user: {
            is: {
                username: id
            }
        }
    } : { userId: parseInt(id) };

    const allPosts = await prisma.post.findMany(createQueryObject);
    console.log("getallposts", allPosts);
    return res.json({ data: { allPosts } });
}

const updatePost = async (req, res) => {
    const { postId, title, content, imageUrl, categories } = req.body
    const updateObject = {
        title,
        content,
        imageUrl,

    }
    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            ...updateObject,
            categories: {
                deleteMany: {},
                create: categories.map((category) => { //removes all categories already related with post and replaces them
                    return {
                        category: {
                            connectOrCreate: {
                                where: { name: category.name },
                                create: { name: category.name }

                            }
                        }
                    }
                })
            }
        },
        include: {
            categories: true
        }
    }
    );
    console.log("update Post:", updatedPost);
    return res.json({ data: { updatedPost } });
}


const deletePost = async (req, res) => {
    const { postId } = req.params;
    const parsedId = parseInt(postId);
    const deletedComments = await prisma.comment.deleteMany( //deleting related comments
        {
            where: {
                postId: parsedId
            }
        }
    );
    console.log("deleted Comments", deletedComments);

    const deletedCategories = await prisma.categoriesOnPosts.deleteMany({ //deleting related category relations
        where: {
            postId: parsedId
        }
    })
    console.log("delete CategoriesOnPost", deletedCategories);
    const deletedPost = await prisma.post.delete({
        where: {
            id: parsedId
        }
    });

    console.log("deleted Post", deletedPost);

    return res.json({ data: { deletedPost } });
}

module.exports = {
    createPosts,
    getAllPosts,
    updatePost,
    deletePost
}