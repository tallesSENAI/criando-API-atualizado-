const expresso = require('express'); //requisitando o pacote "express"
const myServer = expresso();
const Sequelize = require('sequelize');


myServer.use(expresso.json()); //diz que ira utilizar a forma de comunicação "JSON"

//*******************************************************************************//
                        //CONEXÃO COM BANCO DE DADOS//
//*******************************************************************************//

                       //nome do BD | usuário | senha
const conexao = new Sequelize('atividade', 'root', 'root', {
    host: 'localhost', //conexão (endereço onde será hospedado)
    dialect: 'mysql' //tipo de banco que quero utilizar

});
                    //'then' esta recebendo a resposta do que está acontecendo (para as respostas COM sucesso)
conexao.authenticate().then(() => {
    console.log('Conectado com sucesso');
}).catch((erro) => { //'catch' recebe as respostas do que está acontecendo (para as respostas SEM sucesso)
    console.log('Deu erro: ', erro);
});

// Definição dos modelos
const Usuario = sequelize.define('Usuario', {

    codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING(150),
        allowNull: false
    },

    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        primaryKey: true
    }
});

const Cargo = sequelize.define('Cargo', {

    codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    descricao: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
});

//*******************************************************************************//
                                    //ROTAS//
//*******************************************************************************//

//***************************************** Rotas para usuários
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/usuarios', async (req, res) => {
    try {

        const { 

            nome, 
            idade, 
            cpf 

        } = req.body;

        const usuario = await Usuario.create({ nome, idade, cpf });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/usuarios/:usuarioId', async (req, res) => {
    try {

        const { 
            
            nome, 
            idade, 
            cpf 
        
        } = req.body;

        const usuario = await Usuario.findByPk(req.params.usuarioId);
        if (usuario) {
            await usuario.update({ nome, idade, cpf });
            res.json(usuario);
        } else {
            res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/usuarios/:usuarioId', async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.usuarioId);
        if (usuario) {
            await usuario.destroy();
            res.json({ mensagem: 'Usuário removido com sucesso' });
        } else {
            res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//******************************** Rotas para Cargos
app.get('/cargos', async (req, res) => {
    try {
        const cargos = await Cargo.findAll();
        res.json(cargos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/cargos', async (req, res) => {
    try {
        
        const { 

            nome, 
            descricao

        } = req.body;

        const cargo = await Cargo.create({ nome, descricao });
        res.status(201).json(cargo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/cargos/:cargoId', async (req, res) => {
    try {

        const { 
            
            nome, 
            descricao
        
        } = req.body;

        const cargo = await Cargo.findByPk(req.params.cargoId);
        if (cargo) {
            await cargo.update({ nome, descricao });
            res.json(cargo);
        } else {
            res.status(404).json({ mensagem: 'Cargo não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/cargos/:cargoId', async (req, res) => {
    try {
        const cargo = await Cargo.findByPk(req.params.cargoId);
        if (cargo) {
            await cargo.destroy();
            res.json({ mensagem: 'Cargo removido com sucesso' });
        } else {
            res.status(404).json({ mensagem: 'Cargo não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

Cargo.sync({
    alter: true //caso algo seja alterado dentro das tabelas, o 'alter' altera automaticamente
                //a cada vez que roda o programa
});

Usuario.sync({
    alter: true
});

//servidor se hospeda na porta 4300 para poder estar rodando
//esta função "listen" TEM QUE SER a última do arquivo/projeto/código
myServer.listen(4300, () =>{
    console.log("My first server on the door 4300.");
});