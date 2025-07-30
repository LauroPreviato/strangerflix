function capturaFormulario(){
    const form = document.querySelector('#informacoes');
    
    form.addEventListener('submit', function recebeEventoForm (evento) {
        evento.preventDefault();
        const email = form.querySelector('#email');
        const senha = form.querySelector('#senha');

            
    });

    return email, senha;
}
function capturaDadosBanco(email,senha){ 
    let {MongoClient, ObjetcId} = require("mongodb");

    let userName = "usuario";
    let password = "123456789987456321";
    let cluster = "cluster0";
    let dbname = "strangerflix";
    let collectionName = "login's";

    const url = `mongodb+srv://${userName}:${password}@${cluster}.iedga6s.mongodb.net/${dbname}?retryWrites=true&w=majority`;
    const client = new MongoClient(url);

    async function main() {
    await client.connect(); 
    console.log("conectado ao mongodb");

    let db = client.db(dbname); 
    let collection = db.collection(collectionName);
    const filtro = {
        'email':email,
        'senha':senha
    };
    login = await collection.find({filtro}).toArray();
    console.log(login);

    await client.close();
    }
    main();
}
capturaDadosBanco();
