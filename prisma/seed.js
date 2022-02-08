const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const createUser = async (req, res) => {
    const createdUser = await prisma.user.create({
        data: {
            username: "bob12",
            email: "bob12@gmail.com",
            password: "bob456",
            profile: {
                create: {
                    firstName: "bob",
                    lastName: "david",
                    age: 50,
                    pictureUrl: "www.bob-david.com/picture/1"
                }
            }
        }
    })
    console.log("created user", createdUser);
    return createdUser
}

const createPost = async (createdUser) => {
    const createdPost = await prisma.post.create({
        data: {
            title: "bob loves ps 1",
            content: "I really love ps1 and ps2 they are such fun consoles",
            imageUrl: "www.ps1.com/ps1",
            publishedAt: new Date(),
            user: {
                connect: {
                    id: createdUser.id
                }
            },
            comments: {
                createMany: {
                    data: [{
                        content: "yes I love ps1 the most",
                        userId: createdUser.id
                    }
                    ]
                }
            },
            categories: {
                create: [
                    {
                        category: {
                            create: {
                                name: "gaming"
                            }
                        }
                    }
                ]
            }
        },
        include: {
            comments: true,
            categories: true,
            user: true,
        }
    })
    console.log("created post", createdPost);
    return createdPost
}


async function seed() {
    const user = await createUser();
    await createPost(user);

    process.exit(0);
}

seed()
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));