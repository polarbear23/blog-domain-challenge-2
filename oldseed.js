/*const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const createUser = async (req, res) => {
    const createdUser = await prisma.user.create({
        data: {
            username: "bob12",
            email: "bob12@gmail.com",
            password: "bob456",
        }
    })
    console.log("created user", createdUser);
}

const createProfile = async (req, res) => {
    const createdProfile = await prisma.profile.create({
        data: {
            firstName: "bob",
            lastName: "david",
            age: 50,
            pictureUrl: "www.bob-david.com/picture/1"
        }
    });
    console.log("created profile", createdProfile);
}

const createPost = async (req, res) => {
    const createdPost = await prisma.post.create({
        data: {
            title: "bob loves playstation",
            content: "Hello guys please add me on ps I love playstation",
            imageUrl: "www.playstation.com/bob",
            publishedAt: new Date()
        }
    });
    console.log("created post", createdPost);
}

const createComment = async (req, res) => {
    const createdComment = await prisma.comment.create({
        data: {
            content: "yes I love ps1 the most",

        }
    });
    console.log("created comment", createdComment);
}
const createCategory = async (req, res) => {
    const createdCategory = await prisma.category.create({
        data: {
            name: "gaming"
        }
    });
    console.log("created category", createdCategory);
}

async function seed() {
    await createUser();
    await createProfile();
    await createPost();
    await createComment();
    await createCategory();
    process.exit(0);
}

seed()
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));*/