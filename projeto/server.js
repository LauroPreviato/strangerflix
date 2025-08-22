const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json()); // para ler JSON do body da requisição

let userName = "usuario";
let password = "123456789987456321";
let cluster = "cluster0";
let dbname = "strangerflix";
let collectionName = "login_users";

const url = `mongodb+srv://${userName}:${password}@${cluster}.iedga6s.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const client = new MongoClient(url);

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  // console.log('foi')
  

  try {
    await client.connect();
   
    let db = client.db(dbname); 
    let collection = db.collection(collectionName);

    const login = await collection.findOne({email: email, senha: senha});
        
   if (login) {
      res.status(200).json({ message: 'Login realizado com sucesso', user: login });
    } else {
      res.status(401).json({ message: 'Email ou senha inválidos' });
    }
  

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  } finally {
    await client.close();
  }
});


app.use(express.static(path.join(__dirname, 'public',)));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});