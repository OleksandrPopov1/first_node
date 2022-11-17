module.exports = {
    checkIsUserBodyValid: async (req, res, next) =>{
        const {age, name} = req.body;

        if (Number.isNaN(+age) || age <= 0) {
            res.status(400).json('Wrong Age');
            return;
        }

        if (name.length < 2) {
            res.status(400).json('Wrong Name');
            return;
        }

        next();
    }
}
