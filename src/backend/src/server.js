const app = require('./app');
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server backend in ascolto sulla porta ${PORT}`);
    console.log(`Verifica la home su: http://localhost:${PORT}`);
    console.log(`Verifica i prodotti su: http://localhost:${PORT}/api/prodotti`);
});
