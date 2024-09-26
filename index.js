const express = require("express");
const dotenv = require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

// Pegando as variáveis de ambiente
let url = process.env.URL;
let api = process.env.API;

// Inicializando o Express
const app = express();
app.use(express.json());

// Criando o cliente do Supabase
const supabase = createClient(url, api);

// Definindo rota home
const home = async (req, res) => {
  let { data, error } = await supabase.from("usuario").select("*");

  if (error) {
    res.status(500).json(error);
  } else {
    res.status(200).json(data);
  }
};

// Corrigindo a função buscaUsuario
const buscaUsuario = async (req, res) => {
  let id_param = req.params.id;

  let { data, error } = await supabase
    .from("usuario")
    .select()
    .eq("id", id_param);

  if (error) {
    res.status(500).json(error); // Retorna erro do servidor
  } else if (data.length === 0) {
    res.status(404).json({ message: "Usuário não encontrado" }); // Retorna 404 se não encontrar o usuário
  } else {
    res.status(200).json(data);
  }
};

// Rota para a função buscaUsuario
app.get("/buscaUsuario/:id", buscaUsuario); // Corrigido: passando corretamente a função

// Rota '/'
app.get("/", home);

// Iniciando o servidor
app.listen(3001, () => {
  console.log("Executando na porta 3001...");
});
