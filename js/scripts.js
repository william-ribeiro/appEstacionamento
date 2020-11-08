const veiculos = [];
const vagas = [
  { a1: "" },
  { a2: "" },
  { b1: "" },
  { b2: "" },
  { c1: "" },
  { c2: "" },
];

const modelo = document.getElementById("inputModelo");
const cor = document.getElementById("inputCor");
const placa = document.getElementById("inputPlaca");
const ano = document.getElementById("inputAno");

let vaga = "";

function registrar() {
  veiculos.push({
    Modelo: modelo.value,
    Cor: cor.value,
    Placa: placa.value,
    Ano: ano.value,
    Vaga: vaga,
  });
  console.log(veiculos);

  clear();
}

function clear() {
  modelo.value = "";
  cor.value = "";
  placa.value = "";
  ano.value = "";
  document.getElementById("closedForm").style.display = "none";
  document.getElementById(
    "titleVeiculo"
  ).innerHTML = `Clique na vaga \n para registrar o veículo`;
}

function enabled() {
  document.getElementById("closedForm").style.display = "block";
}

function closedForm(event) {
  let capture = event.target.id;
  vaga = capture;
  document.getElementById("titleVeiculo").innerHTML = `Box na vaga: ${capture}`;
  document.getElementById(capture).style.display = "none";

  enabled();
}
