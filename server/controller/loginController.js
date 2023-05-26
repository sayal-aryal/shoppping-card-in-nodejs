const users = require('../model/user');

exports.authenticate = (req, res, next) => {
    const { username, password } = req.body;
    const user = users.getAll().find((user) => user.name == username && user.password == password);
    if (user) {
        res.status(201).json({
            accessToken: `${user.name}-${Date.now().toString()}`,
            username: username
        });
    } else {
        res.status(401).json({ error: 'Invalid username or password' });
    }
}