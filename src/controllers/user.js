const prisma = require("../utils/prisma");


const createUser = async (req, res) => {
    const { username, email, password, firstName, lastName, age, pictureUrl } = req.body;
    const createdUser = await prisma.user.create({
        data: {
            username,
            email,
            password,
            profile: {
                create: {
                    firstName,
                    lastName,
                    age,
                    pictureUrl
                }
            }
        },
        include: {
            profile: true
        }
    })
    console.log("created user:", createdUser);
    res.json({ data: { createdUser } });
}

const updateUser = async (req, res) => {
    const { userId, username, email, password, firstName, lastName, age, pictureUrl } = req.body

    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            username,
            email,
            password,
            profile: {
                update: {
                    firstName,
                    lastName,
                    age,
                    pictureUrl
                }
            }
        },
        include: {
            profile: true
        }
    })
    console.log("updated user:", updatedUser);
    res.json({ data: { updatedUser } });
}

module.exports = {
    createUser, updateUser
}