export const createUser = (req, res) => {
    const token = req.headers['x-access-token'];
    res.json({ message: "Creating User" });
};