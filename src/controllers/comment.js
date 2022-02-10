const prisma = require("../utils/prisma");


const createComment = async (req, res) => {
    const { parentId, content, userId, postId } = req.body;
    const createdComment = await prisma.comment.create({
        data: {
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
            },
            parent: {
                connect: {
                    id: parentId
                }
            }
        },
        include: {
            post: true
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


    return res.json({
        data: {
            createdComment: createdComment,
            parentComment: parent ? parent : "none"
        }
    });
}

const updateComment = async (req, res) => {
    const { commentId, content } = req.body;
    const updatedComment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data: {
            content: content
        },
        include: {
            user: true,
            post: true
        }
    })

    console.log("updating Comment", updatedComment);
    return res.json({ data: updatedComment });

}

const deleteComment = async (req, res) => {
    const { commentId } = req.params
    const parsedId = parseInt(commentId);
    const commentToCheck = await prisma.comment.findUnique({
        where: {
            id: parsedId
        },
        include: {
            comments: true
        }
    });
    console.log("check", commentToCheck);
    if (!commentToCheck.comments) {
        const deletedComment = await prisma.comment.delete({
            where: {
                id: parsedId
            }
        });
        console.log("deletedComment", deletedComment);

        return res.json({ data: { deletedComment } });
    }

    const updatedComment = await prisma.comment.update({
        where: {
            id: parsedId
        },
        data: {
            content: "[removed]"
        }
    })
    return res.json({ data: { updatedComment } });
}



module.exports = {
    createComment,
    updateComment,
    deleteComment
}