const veiculos = [];
const vagas = [];

let countVagasLivres = 6;
box = [];

const modelo = document.getElementById("inputModelo");
const cor = document.getElementById("inputCor");
const placa = document.getElementById("inputPlaca");
const ano = document.getElementById("inputAno");

let vaga = "";
let v = 0;

function relogio() {
  var data = new Date();
  var hor = data.getHours();
  var min = data.getMinutes();
  var seg = data.getSeconds();

  if (hor < 10) {
    hor = "0" + hor;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (seg < 10) {
    seg = "0" + seg;
  }

  var horas = hor + ":" + min + ":" + seg;
  document.getElementById("horaAtual").innerHTML = horas;
}
var timer = setInterval(relogio, 1000);

function vagaLivre() {
  switch (countVagasLivres) {
    case 6:
      vaga = "a1";
      break;
    case 5:
      vaga = "a2";
      break;
    case 4:
      vaga = "b1";
      break;
    case 3:
      vaga = "b2";
      break;
    case 2:
      vaga = "c1";
      break;
    case 1:
      vaga = "c2";
      break;

    default:
      break;
  }
}

function registrar() {
  if (countVagasLivres > 0) {
    vagaLivre();
    if (v != 0) {
      console.log("entrou");
      vf = vagas.findIndex(find_car);
    }
    enterTheBox();
    veiculos.push({
      Modelo: modelo.value,
      Cor: cor.value,
      Placa: placa.value,
      Ano: ano.value,
      Vaga: vaga,
      Entrada: document.getElementById("horaAtual").innerText,
    });
    console.log(countVagasLivres);
    vagas.push({
      Vaga: vaga,
      Pos: countVagasLivres,
    });

    vagas.sort(function (a, b) {
      return a.Vaga > b.Vaga ? 1 : b.Vaga > a.Vaga ? -1 : 0;
    });

    console.log(vagas);
    if (v == 0) {
      countVagasLivres--;
    }
  } else {
    alert("Todas as vagas estão ocupadas");
  }

  v = 0;
  clear();
}

function clear() {
  modelo.value = "";
  cor.value = "";
  placa.value = "";
  ano.value = "";
}

function enterTheBox() {
  document.getElementById(vaga).style.display = "none";

  document.getElementById(`closed-${vaga}`).style.display = "block";

  const insertCars = `<div id="removeRadio${vaga}"class="custom-control custom-radio">
  <input
    type="radio"
    id="customRadio${vaga}"
    name="customRadio"
    class="custom-control-input"
    data-box="${vaga}"
    onclick="captureId(event)"    
  />
  <label class="custom-control-label" for="customRadio${vaga}"
    >${placa.value}| vaga:${vaga}</label
  >
  </div>`;
  document.getElementById("insertCars").innerHTML += insertCars;
}

function captureId(event) {
  box = event.target.dataset.box;
}

function find_car(car) {
  return car["Vaga"] === box;
}

function exitBox() {
  if (box != "") {
    document.getElementById(box).style.display = "block";

    document.getElementById(`closed-${box}`).style.display = "none";

    document.getElementById(`removeRadio${box}`).remove();

    //Procura carro com a garagem e remove

    veiculos.splice(veiculos.findIndex(find_car), 1);

    vagas.sort();

    //countVagasLivres

    vf = vagas.findIndex(find_car);

    countVagasLivres = vagas[vf].Pos;

    vagas.splice(vf, 1);
    v = 1;

    //countVagasLivres = 6 - countVagasLivres;

    //
    /**
    

    
    console.log(`numero de vagas livres apos liberação ${countVagasLivres}`);
     */
  }
}

relogio();
