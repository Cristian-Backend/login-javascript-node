import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { methods as authentication } from './controllers/authentication.controllers.js';
import { methods as authorization} from './middlewares/authorization.js'
import cookieParser from 'cookie-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// server
const app = express();

// Sirve los archivos estáticos desde la carpeta 'pages/public'
app.use(express.static(path.join(__dirname, 'pages', 'public')));
app.use(express.json());

app.use(cookieParser());

// Ruta para servir el archivo login.html
app.get('/', authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, 'pages', 'login.html')));
app.get('/register', authorization.soloPublico, (req, res) => res.sendFile(path.join(__dirname, 'pages', 'register.html')));
app.get('/admin', authorization.soloAdmin, (req, res) => res.sendFile(path.join(__dirname, 'pages', 'admin', 'admin.html')));
app.post('/api/register', authentication.register);
app.post('/api/login', authentication.login);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
