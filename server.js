// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const app = express();
// const port = process.env.PORT || 5101;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 5101;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Указываем правильный путь к папке со статикой
app.use(express.static(path.join('/root/farmtelegatest', 'dist')));

// Обслуживаем index.html для всех маршрутов
app.get('/*', (req, res) => {
  res.sendFile(path.join('/root/farmtelegatest', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


