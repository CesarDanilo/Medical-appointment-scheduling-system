const userControllers = (req, res) => {
    try {
        return res.send("API RODANDO NO CONTROLLER");
    } catch (error) {
        return res.status(500).send("API NÃO ESTA FUNCIONANDO")
    }
}

module.exports = userControllers;