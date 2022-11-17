const fileService = require("../services/file.servise");

module.exports = {
    getUsers: async (req, res) => {
        const usersFromService = await fileService.getUsers();
        res.json(usersFromService);
    },

    createUser: async (req, res) => {
        const user = await fileService.insertUser(req.body);

        res.status(201).json(user);
    },

    getUserById: async (req, res) => {
        const {userId} = req.params;

        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(400).json('wrong ID');
            return;
        }

        const user = await fileService.getUser(+userId);

        if (!user) {
            res.status(404).json('Wrong ID');
            return;
        }

        res.json(user);
    },

    deleteUserById: async (req, res) => {
        const {userId} = req.params;

        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(400).json('wrong ID');
            return;
        }

        const user = await fileService.deleteUser(+userId);

        if (!user) {
            res.status(404).json('Wrong ID');
            return;
        }

        res.sendStatus(204);
    },

    updateUserById: async (req, res) => {
        const {userId} = req.params;

        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(400).json('wrong ID');
            return;
        }

        const user = await fileService.updateUser(+userId, req.body);

        if (!user) {
            res.status(404).json('Wrong ID');
            return;
        }

        res.status(204).json(user);
    }
}
