const fs = require('fs/promises');
const path = require("path");

const pathToFile = path.join(process.cwd(), 'dataBase', 'users.json');

const reader = async () => {
    try {
        const buffer = await fs.readFile(pathToFile);
        const data = buffer.toString();
        const users = data ? JSON.parse(data) : [];
        return users.sort((a, b) => a.id - b.id);
    } catch (e) {
        console.log(e);
    }
}


const writer = async (users) => {
    try {
        await fs.writeFile(pathToFile, JSON.stringify(users));
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    insertUser: async (userObject) => {
        const users = await reader();

        userObject.id = users.length ? users[users.length - 1].id + 1 : 1;
        users.push(userObject)

        await writer(users);

        return userObject
    },
    getUsers: () => {
        return reader();
    },
    getUser: async (id) => {
        const users = await reader();
        return users.find((user) => user.id === id);
    },
    deleteUser: async (id) => {
        const users = await reader();
        const index = users.findIndex((user) => user.id === id);

        if (index < 0) return;

        const user = users[index];
        users.splice(index, 1);

        await writer(users);

        return user;
    },
    updateUser: async (id, data) => {
        const users = await reader();
        const index = users.findIndex((user) => user.id === id);

        if (index < 0) return;

        users[index] = {...users[index], ...data};

        await writer(users);

        return users[index] ;
    },
}



