const prisma = require("../utils/prisma");


const createComment = async (req, res) => {
    const { parentId, content, userId, postId } = req.body;
    const createdComment = await prisma.comment.create({
        data: {
            parentId,
            content,
            user: {
                connect: {
                    id: userId
                }
            },
            post: {
                connect: {
                    id: postId
                }
            }
        }
    });
    let parent;
    console.log("created Comment", createdComment)
    if (parentId) {
        const parentComment = await prisma.comment.findUnique({
            where: {
                id: parentId
            }
        });
        console.log("parent Comment", parentComment)
        parent = parentComment;
    }


    res.json({
        data: {
            createdComment: createdComment,
            parentComment: parent ? parent : "none"
        }
    });
}




module.exports = {
    createComment
}