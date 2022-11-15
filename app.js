const express = require('express');
const fileService = require('./services/file.servise');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => {

    res.json('hello');
});

app.get('/users', async (req, res) => {
    const usersFromService = await fileService.getUsers();
    res.json(usersFromService);
});

app.post('/users', async (req, res) => {
    const {age, name} = req.body;

    if (Number.isNaN(+age) || age <= 0) {
        res.status(400).json('Wrong Age');
        return;
    }

    const user = await fileService.insertUser({age, name});

    res.status(201).json(user);
})

app.get('/users/:userId', async (req, res) => {
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
});

app.delete('/users/:userId', async (req, res) => {
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
});

app.put('/users/:userId', async (req, res) => {
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
});




app.listen(5000, () => {

});
