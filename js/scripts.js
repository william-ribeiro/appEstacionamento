const modelo = document.getElementById("inputModelo");
const cor = document.getElementById("inputCor");
const placa = document.getElementById("inputPlaca");
const ano = document.getElementById("inputAno");

let busca = document.getElementById("busca");
let resultBusca = document.getElementById("resulBusca");

const relTop3 = document.getElementById("top3");
const tempoBox = document.getElementById("inputTempoBox");

const veiculos = JSON.parse(localStorage.getItem("veiculosNoBox")) || [];
const vagas = JSON.parse(localStorage.getItem("vagas")) || [
  { Vaga: "A1", Pos: 6 },
  { Vaga: "A2", Pos: 5 },
  { Vaga: "B1", Pos: 4 },
  { Vaga: "B2", Pos: 3 },
  { Vaga: "C1", Pos: 2 },
  { Vaga: "C2", Pos: 1 },
];

const contabilVeiculos = JSON.parse(localStorage.getItem("contabil")) || [
  {
    Modelo: "",
    Cor: "",
    Placa: "",
    Ano: "",
    TotalPagamentos: "",
  },
];

let box = [];
let capturePlaca = [];
let vaga = "";
let totalPagamentos = 0;
let vlPlaca = 0;
let storageContabil = [];
let res = 0;
let msgBox = "";
let fid = 0;

function vagaLivre() {
  switch (vagas[0].Pos) {
    case 6:
      vaga = "A1";
      break;
    case 5:
      vaga = "A2";
      break;
    case 4:
      vaga = "B1";
      break;
    case 3:
      vaga = "B2";
      break;
    case 2:
      vaga = "C1";
      break;
    case 1:
      vaga = "C2";
      break;

    default:
      break;
  }
}

function registrar() {
  if (vagas.length != 0) {
    vagaLivre();
    enterTheBox();

    veiculos.push({
      Modelo: modelo.value.toUpperCase(),
      Cor: cor.value.toUpperCase(),
      Placa: placa.value.toUpperCase(),
      Ano: ano.value.toUpperCase(),
      Vaga: vaga.toUpperCase(),
    });

    vagas.splice(vagas.findIndex(find_vaga), 1);

    ordenaVagas();

    localStorage.setItem("vagas", JSON.stringify(vagas));

    localStorage.setItem("veiculosNoBox", JSON.stringify(veiculos));
  } else {
    alert("Todas as vagas estão ocupadas");
  }

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
    data-placa=${placa.value.toUpperCase()}
    onclick="captureId(event)"    
  />
  <label class="custom-control-label" for="customRadio${vaga}"
    >${placa.value}| vaga:${vaga}</label
  >
  </div>`;

  document.getElementById("insertCars").innerHTML += insertCars;
}

function start() {
  for (let index = 0; index < veiculos.length; index++) {
    vaga = veiculos[index].Vaga;
    placa.value = veiculos[index].Placa;
    enterTheBox();
    placa.value = "";
  }
}

function captureId(event) {
  box = event.target.dataset.box;
  capturePlaca = event.target.dataset.placa;
}

function find_vaga(fVaga) {
  return fVaga["Vaga"] === vaga;
}

function find_car(car) {
  return car["Vaga"] === box;
}

function find_placa(fPlaca) {
  return fPlaca["Placa"] === capturePlaca;
}

function calcValor(tempo, horaBase, res) {
  horaBase = 100.0;
  tempo = tempoBox.value;
  res = horaBase * tempo;
  return res;
}

function exitBox() {
  if (box != "" && tempoBox.value != "") {
    document.getElementById(box).style.display = "block";
    document.getElementById(`closed-${box}`).style.display = "none";
    document.getElementById(`removeRadio${box}`).remove();

    res = calcValor(parseInt(tempoBox.value));
    descontoAno();

    for (let index = 0; index < contabilVeiculos.length; index++) {
      if (contabilVeiculos[index].Placa == capturePlaca) {
        top3();

        vlPlaca = 1;
      }
    }

    if (vlPlaca == 0) {
      pio = veiculos.findIndex(find_placa);

      contabilVeiculos.push({
        Modelo: veiculos[pio].Modelo,
        Cor: veiculos[pio].Cor,
        Placa: veiculos[pio].Placa,
        Ano: veiculos[pio].Ano,
        TotalPagamentos: res,
      });
    }
    ordenaContabil();

    localStorage.setItem("contabil", JSON.stringify(contabilVeiculos));

    //Procura carro com a garagem e remove
    veiculos.splice(veiculos.findIndex(find_car), 1);
    //
    switch (box) {
      case "A1":
        position = 6;
        break;
      case "A2":
        position = 5;
        break;
      case "B1":
        position = 4;
        break;
      case "B2":
        position = 3;
        break;
      case "C1":
        position = 2;
        break;
      case "C2":
        position = 1;
        break;

      default:
        break;
    }

    vagas.push({
      Vaga: box,
      Pos: position,
    });

    ordenaVagas();
    localStorage.setItem("vagas", JSON.stringify(vagas));
    localStorage.setItem("veiculosNoBox", JSON.stringify(veiculos));

    vlPlaca = 0;
  } else if (vagas.length == 6) {
    alert("Atenção todas as vagas estão livres");
  } else {
    alert("Selecione o veículo e preencha o tempo de permanência");
  }
  box = "";
  tempoBox.value = "";
  mostraTop3();
}

function pesquisaModelo() {
  const pesquisaModelo = document.getElementById("inputPesquisaModelo");
  if (veiculos.length != 0) {
    if (pesquisaModelo.value.toUpperCase() != "") {
      resultBusca.innerHTML = "";
      busca.innerHTML = "";
      for (let index = 0; index < veiculos.length; index++) {
        if (veiculos[index].Modelo == pesquisaModelo.value.toUpperCase()) {
          busca.innerHTML = `<h5 id="busca" class="text-center">O modelo ${pesquisaModelo.value.toUpperCase()} está localizado em:</h5>`;

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
  let pesquisaCor = document.getElementById("inputPesquisaCor");
  if (veiculos.length != 0) {
    if (pesquisaCor.value.toUpperCase() != "") {
      resultBusca.innerHTML = "";
      busca.innerHTML = "";
      for (let index = 0; index < veiculos.length; index++) {
        if (veiculos[index].Cor == pesquisaCor.value.toUpperCase()) {
          busca.innerHTML = `<h5 id="busca" class="text-center">Os veículos de cor ${pesquisaCor.value.toUpperCase()} estão localizados em:</h5>`;

          resultBusca.innerHTML += `<h4 class="text-center">${veiculos[index].Vaga}</h4>`;
        }
      }
    } else {
      alert("Atenção campo Cor não pode ser em branco");
    }
  } else {
    alert("Atenção todas as vagas estão livres");
  }
  pesquisaCor.value = "";
}

function pesquisaPlaca() {
  const pesquisaPlacas = document.getElementById("inputPesquisaPlaca");

  if (veiculos.length != 0) {
    if (pesquisaPlacas.value.toUpperCase() != "") {
      resultBusca.innerHTML = "";
      busca.innerHTML = "";
      for (let index = 0; index < veiculos.length; index++) {
        if (veiculos[index].Placa == pesquisaPlacas.value.toUpperCase()) {
          busca.innerHTML = `<h5 id="busca" class="text-center">Carro de Placa ${pesquisaPlacas.value.toUpperCase()} está localizado o vaga:</h5>`;

          resultBusca.innerHTML = `<h4 class="text-center">${veiculos[index].Vaga} </h4>`;
        }
      }
    } else {
      alert("Atenção campo Placa não pode ser em branco");
    }
  } else {
    alert("Atenção todas as vagas estão livres");
  }
  pesquisaPlacas.value = "";
}

function pesquisaVaga() {
  const pesquisaVaga = document.getElementById("inputPesquisaVaga");

  if (veiculos.length != 0) {
    if (pesquisaVaga.value.toUpperCase() != "") {
      resultBusca.innerHTML = "";
      busca.innerHTML = "";
      for (let index = 0; index < veiculos.length; index++) {
        if (veiculos[index].Vaga == pesquisaVaga.value.toUpperCase()) {
          busca.innerHTML = `<h5 id="busca" class="text-center">Na Vaga ${pesquisaVaga.value.toUpperCase()} está localizado o Veículo:</h5>`;

          resultBusca.innerHTML = `<h4 class="text-center">Modelo ${veiculos[index].Modelo} de Placa: ${veiculos[index].Placa}</h4>`;
        }
      }
    } else {
      alert("Atenção campo Vaga não pode ser em branco");
    }
  } else {
    alert("Atenção todas as vagas estão livres");
  }
  pesquisaVaga.value = "";
}

function descontoAno() {
  for (index in veiculos) {
    if (veiculos[index].Placa == capturePlaca) {
      if (parseInt(veiculos[index].Ano) > 2015) {
        msgBox = `Você ficou ${tempoBox.value}h. \n\ `;
      } else if (
        parseInt(veiculos[index].Ano) <= 2015 &&
        parseInt(veiculos[index].Ano) >= 2010
      ) {
        res -= 0.15 * res;
        msgBox = `Você ficou ${tempoBox.value}h. \n\nValor à pagar com desconto de 15% pelo ano.\n`;
      } else if (
        parseInt(veiculos[index].Ano) <= 2009 &&
        parseInt(veiculos[index].Ano) >= 2000
      ) {
        res -= 0.2 * res;
        msgBox = `Você ficou ${tempoBox.value}h. \n\nValor à pagar com desconto de 20% pelo ano.\n`;
      } else if (parseInt(veiculos[index].Ano) < 2000) {
        res -= 0.3 * res;
        msgBox = `Você ficou ${tempoBox.value}h. \n\nValor à pagar com desconto de 30% pelo ano.\n`;
      }
    }
  }
  descontoCor();
}

function descontoCor() {
  for (index in veiculos) {
    if (veiculos[index].Placa == capturePlaca) {
      if (veiculos[index].Cor == "AZUL") {
        res -= 10;
        msgBox += `\n + R$ 10,00 de desconto por cor. \nValor total ${res.toLocaleString(
          "pt-br",
          { style: "currency", currency: "BRL" }
        )}`;
      } else if (veiculos[index].Cor == "BRANCO") {
        res -= 15;
        msgBox += `\n + R$ 15,00 de desconto por cor. \nValor total ${res.toLocaleString(
          "pt-br",
          { style: "currency", currency: "BRL" }
        )}`;
      } else if (veiculos[index].Cor == "PRETO") {
        res -= 20;
        msgBox += `\n + R$ 20,00 de desconto por cor. \nValor total ${res.toLocaleString(
          "pt-br",
          { style: "currency", currency: "BRL" }
        )}`;
      } else {
        msgBox += `\n Valor total ${res.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}`;
      }
    }
  }
  fidelidade();
}

function fidelidade() {
  for (index in contabilVeiculos) {
    if (contabilVeiculos[index].Placa == capturePlaca) {
      res -= 0.5 * res;
      alert(
        `${msgBox}\n\n + 50% desconto fidelidade. Valor à pagar: ${res.toLocaleString(
          "pt-br",
          { style: "currency", currency: "BRL" }
        )}`
      );
      fid = 1;
    }
  }
  if (fid == 0) {
    alert(msgBox);
  }
}

function ordenaContabil() {
  contabilVeiculos.sort(function (a, b) {
    return a.TotalPagamentos > b.TotalPagamentos
      ? -1
      : b.TotalPagamentos > a.TotalPagamentos
      ? 1
      : 0;
  });
}

function ordenaVagas() {
  vagas.sort(function (a, b) {
    return a.Vaga > b.Vaga ? 1 : b.Vaga > a.Vaga ? -1 : 0;
  });
}
function top3() {
  let newCar = [];

  contabilVeiculos.forEach(myFunction);

  function myFunction(item, index, arr) {
    arr[index] = item;
    if (item.Placa == capturePlaca) {
      cx = item.TotalPagamentos;

      newCar.push(arr[index]);

      arr.splice(index, 1);
      cx += res;

      contabilVeiculos.push({
        Modelo: newCar[0].Modelo,
        Cor: newCar[0].Cor,
        Placa: newCar[0].Placa,
        Ano: newCar[0].Ano,
        TotalPagamentos: cx,
      });

      newCar.slice(0, 1);
      ordenaContabil();
      localStorage.setItem("contabil", JSON.stringify(contabilVeiculos));
    }
  }

  console.log(contabilVeiculos);
}

function mostraTop3() {
  cc = 1;
  relTop3.innerHTML = "";
  for (let index = 0; index < 3; index++) {
    relTop3.innerHTML += `<h5 class="text-center">${cc}º -${
      contabilVeiculos[index].Modelo
    } - Ano: ${contabilVeiculos[index].Ano} - Placa: ${
      contabilVeiculos[index].Placa
    } | Total Gasto R$ ${contabilVeiculos[index].TotalPagamentos.toLocaleString(
      "pt-br",
      {
        style: "currency",
        currency: "BRL",
      }
    )}</h5>`;
    cc++;
  }
}
start();
mostraTop3();
