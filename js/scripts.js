const modelo = document.getElementById("inputModelo");
const cor = document.getElementById("inputCor");
const placa = document.getElementById("inputPlaca");
const ano = document.getElementById("inputAno");
const pesquisaPlacas = document.getElementById("inputPesquisaPlaca");

//JSON.parse(localStorage.getItem("veiculosNoBox")) ||
const veiculos = [];
const vagas = [
  { Vaga: "a1", Pos: 6 },
  { Vaga: "a2", Pos: 5 },
  { Vaga: "b1", Pos: 4 },
  { Vaga: "b2", Pos: 3 },
  { Vaga: "c1", Pos: 2 },
  { Vaga: "c2", Pos: 1 },
];

//const contabilVeiculos = JSON.parse(localStorage.getItem("contabil")) ||

const contabilVeiculos = [
  {
    Modelo: "",
    Cor: "",
    Placa: "",
    Ano: "",
    Entrada: "",
    TotalPagamentos: "",
  },
];

let box = [];
let horaEntrada = [];
let vPagar = "R$200,00";
let tempoBox = "2 horas";
let vaga = "";
let totalPagamentos = 50;
let vlPlaca = 0;
let storageContabil = [];
let indexVaga = 0;

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
  horaEntrada = data;
}
var timer = setInterval(relogio, 1000);

function vagaLivre() {
  switch (vagas[0].Pos) {
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
  if (vagas.length != 0) {
    vagaLivre();
    enterTheBox();
    relogio();

    veiculos.push({
      Modelo: modelo.value,
      Cor: cor.value,
      Placa: placa.value,
      Ano: ano.value,
      Vaga: vaga,
      Entrada: horaEntrada,
    });

    for (let index = 0; index < contabilVeiculos.length; index++) {
      if (contabilVeiculos[index].Placa == placa.value) {
        //FUNCAO NATIVA PARA EDITAR ITEM
        contabilVeiculos.forEach((item) => {
          item.TotalPagamentos = "100";
        });
        //
        vlPlaca = 1;
      }
    }

    if (vlPlaca == 0) {
      contabilVeiculos.push({
        Modelo: modelo.value,
        Cor: cor.value,
        Placa: placa.value,
        Ano: ano.value,
        Entrada: horaEntrada,
        TotalPagamentos: totalPagamentos,
      });
    }

    //localStorage.setItem("contabil", JSON.stringify(contabilVeiculos));

    vagas.splice(vagas.findIndex(find_vaga), 1);

    vagas.sort(function (a, b) {
      return a.Vaga > b.Vaga ? 1 : b.Vaga > a.Vaga ? -1 : 0;
    });

    //localStorage.setItem("veiculosNoBox", JSON.stringify(veiculos));
  } else {
    alert("Todas as vagas estão ocupadas");
  }
  vlPlaca = 0;
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

function start() {
  count2 = 0;
  for (let index = 0; index < veiculos.length; index++) {
    count2 = vagas[index].Pos;
    vaga = veiculos[index].Vaga;
    placa.value = veiculos[index].Placa;
    enterTheBox();
    placa.value = "";
  }
  console.log(count2);
  count2 = count2 - 1;
  console.log(count2);
  vaga = vagas[count2].Pos;
  console.log(vaga);
}

function captureId(event) {
  box = event.target.dataset.box;
}

function find_vaga(fVaga) {
  return fVaga["Vaga"] === vaga;
}

function find_car(car) {
  return car["Vaga"] === box;
}

function find_placa(fPlaca) {
  return fPlaca["Placa"] === buscaPlaca;
}

function exitBox() {
  if (box != "") {
    document.getElementById(box).style.display = "block";
    document.getElementById(`closed-${box}`).style.display = "none";
    document.getElementById(`removeRadio${box}`).remove();

    //Procura carro com a garagem e remove
    veiculos.splice(veiculos.findIndex(find_car), 1);
    //
    switch (box) {
      case "a1":
        position = 6;
        break;
      case "a2":
        position = 5;
        break;
      case "b1":
        position = 4;
        break;
      case "b2":
        position = 3;
        break;
      case "c1":
        position = 2;
        break;
      case "c2":
        position = 1;
        break;

      default:
        break;
    }

    vagas.push({
      Vaga: box,
      Pos: position,
    });

    vagas.sort(function (a, b) {
      return a.Vaga > b.Vaga ? 1 : b.Vaga > a.Vaga ? -1 : 0;
    });

    alert(`Atenção você ficou ${tempoBox} e deverá pagar ${vPagar}`);
  } else if (vagas.length == 6) {
    alert("Atenção todas as vagas estão livres");
  } else {
    alert("Você não selecionou nenhum veículo");
  }
  box = "";
}

function pesquisaModelo() {
  let busca = document.getElementById("busca");
  let resultBusca = document.getElementById("resulBusca");
  let pesquisaModelo = document.getElementById("inputPesquisaModelo");

  if (veiculos.length != 0) {
    if (pesquisaModelo.value != "") {
      resultBusca.innerHTML = "";
      busca.innerHTML = "";
      for (let index = 0; index < veiculos.length; index++) {
        if (veiculos[index].Modelo == pesquisaModelo.value) {
          busca.innerHTML = `<h5 id="busca" class="text-center">Os modelos ${pesquisaModelo.value} estão localizados em:</h5>`;

          resultBusca.innerHTML += `<h4 class="text-center">${veiculos[index].Vaga}</h4>`;
        }
      }
    } else {
      alert("Atenção campo Modelo não pode ser em branco");
    }
  } else {
    alert("Atenção todas as vagas estão livres");
  }
  pesquisaModelo.value = "";
}

function pesquisaCor() {
  let busca = document.getElementById("busca");
  let resultBusca = document.getElementById("resulBusca");
  let pesquisaCor = document.getElementById("inputPesquisaCor");
  if (veiculos.length != 0) {
    if (pesquisaCor.value != "") {
      resultBusca.innerHTML = "";
      busca.innerHTML = "";
      for (let index = 0; index < veiculos.length; index++) {
        if (veiculos[index].Cor == pesquisaCor.value) {
          busca.innerHTML = `<h5 id="busca" class="text-center">Os veículos de cor ${pesquisaCor.value} estão localizados em:</h5>`;

          resultBusca.innerHTML += `<h4 class="text-center">${veiculos[index].Vaga}</h4>`;
        }
      }
    } else {
      alert("Atenção campo Modelo não pode ser em branco");
    }
  } else {
    alert("Atenção todas as vagas estão livres");
  }
  pesquisaCor.value = "";
}

function pesquisaPlaca() {
  let busca = document.getElementById("busca");
  let resultBusca = document.getElementById("resulBusca");

  if (veiculos.length != 0) {
    if (pesquisaPlacas.value != "") {
      resultBusca.innerHTML = "";
      busca.innerHTML = "";
      for (let index = 0; index < veiculos.length; index++) {
        if (veiculos[index].Placa == pesquisaPlacas.value) {
          busca.innerHTML = `<h5 id="busca" class="text-center">Carro de Placa ${pesquisaPlacas.value} está localizado o vaga:</h5>`;

          resultBusca.innerHTML = `<h4 class="text-center">${veiculos[index].Vaga} </h4>`;
        }
      }
    } else {
      alert("Atenção campo Modelo não pode ser em branco");
    }
  } else {
    alert("Atenção todas as vagas estão livres");
  }
  pesquisaPlacas.value = "";
}

function pesquisaVaga() {
  let busca = document.getElementById("busca");
  let resultBusca = document.getElementById("resulBusca");
  let pesquisaVaga = document.getElementById("inputPesquisaVaga");

  if (veiculos.length != 0) {
    if (pesquisaVaga.value != "") {
      resultBusca.innerHTML = "";
      busca.innerHTML = "";
      for (let index = 0; index < veiculos.length; index++) {
        if (veiculos[index].Vaga == pesquisaVaga.value) {
          busca.innerHTML = `<h5 id="busca" class="text-center">Na Vaga ${pesquisaVaga.value} está localizado o Veículo:</h5>`;

          resultBusca.innerHTML = `<h4 class="text-center">Modelo ${veiculos[index].Modelo} de Placa: ${veiculos[index].Placa}</h4>`;
        }
      }
    } else {
      alert("Atenção campo Modelo não pode ser em branco");
    }
  } else {
    alert("Atenção todas as vagas estão livres");
  }
  pesquisaVaga.value = "";
}

function desconto() {
  let pesquisaVaga = document.getElementById("inputPesquisaVaga");

  if (pesquisaVaga.value > 2015) {
    alert(`Ano maior que 2015 não tem desconto. Valor à Pagar: ${vPagar}`);
  } else if (pesquisaVaga.value <= 2015 && pesquisaVaga.value >= 2010) {
    alert("Você tem desconto de 15%");
  } else if (pesquisaVaga.value <= 2009 && pesquisaVaga.value >= 2000) {
    alert("Você tem desconto de 20%");
  } else if (pesquisaVaga.value < 2000) {
    alert("Você tem desconto de 30%");
  }
}

function descontoCor() {
  let pesquisaVaga = document.getElementById("inputPesquisaVaga");

  if (pesquisaVaga.value == "azul") {
    alert(`Você tem 10 reais de desconto`);
  } else if (pesquisaVaga.value == "branco") {
    alert("Você tem 15 reais de desconto");
  } else if (pesquisaVaga.value == "preto") {
    alert("Você tem 20 reais de desconto");
  } else if (
    pesquisaVaga.value != "azul" ||
    pesquisaVaga.value != "branco" ||
    pesquisaVaga.value != preto
  ) {
    alert("Você não tem Desconto");
  }
}

relogio();
//start();
