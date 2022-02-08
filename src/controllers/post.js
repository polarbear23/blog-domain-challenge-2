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

module.exports = {
    createPosts
}