let cartas = [];
let cartasOrdenadas = [];

const cambioDePintas = {
  1: "A",
  11: "J",
  12: "Q",
  13: "K",
};

function elegirCartasAlAzar() {
  let cantidad = document.getElementById("cantidadInput").value;
  let numero = [9, 5, 4, 3, 6, 7, 8, 1, 11, 12, 13, 2, 10];
  let pinta = ['♥', '♦', '♣', '♠'];
  cartas = generarCartas(cantidad, numero, pinta);
  mostrarCartas(cartas, "cartasContainer");
  document.getElementById("cartasOrdenadasContainer").innerHTML = "";
}

function generarCartas(cantidad, numero, pinta) {
  let cartasGeneradas = [];
  for (let i = 0; i < cantidad; i++) {
    let numRandom = numero[Math.floor(Math.random() * numero.length)];
    let pintaRandom = pinta[Math.floor(Math.random() * pinta.length)];
    let carta = {
      numero: numRandom,
      pinta: pintaRandom,
    };
    cartasGeneradas.push(carta);
  }
  return cartasGeneradas;
}

function mostrarCartas(cartasAMostrar, containerId) {
  let cartasContainer = document.getElementById(containerId);
  cartasContainer.innerHTML = "";

  cartasAMostrar.forEach(carta => {
    let cartaContainer = document.createElement("div");
    cartaContainer.classList.add("cartasContainer");

    let numeroElement = document.createElement("div");
    numeroElement.textContent = cambioDePintas[carta.numero] || carta.numero;
    numeroElement.classList.add("numero");

    let pintaElement = document.createElement("div");
    let pintaTexto = carta.pinta;
    pintaElement.classList.add("pinta");
    if (carta.pinta === "♥" || carta.pinta === "♦") {
      pintaElement.classList.add("rojo");
    }

    let pintaElementTop = document.createElement("p");
    pintaElementTop.textContent = pintaTexto;
    let pintaElementBottom = document.createElement("span");
    pintaElementBottom.textContent = pintaTexto;

    pintaElement.appendChild(pintaElementTop);
    pintaElement.appendChild(pintaElementBottom);

    cartaContainer.appendChild(numeroElement);
    cartaContainer.appendChild(pintaElement);

    cartasContainer.appendChild(cartaContainer);
  });
}



function bubbleSort(arr) {
    let pasos = [];
    arr = [...arr];
    let wall = arr.length - 1; 
    while (wall > 0) {
      let index = 0;
      while (index < wall) {
        if (arr[index].numero > arr[index + 1].numero) {
          let aux = arr[index];
          arr[index] = arr[index + 1];
          arr[index + 1] = aux;
          pasos.push([...arr]);
        }
        index++;
      }
      wall--; 
    }
    return pasos;
  }
  
  function ordenarCartas() {
    cartasOrdenadas = cartas.slice();
    mostrarPasosIntermedios(bubbleSort(cartasOrdenadas));
  }
function mostrarPasosIntermedios(pasos) {
  let container = document.getElementById("cartasOrdenadasContainer");
  container.innerHTML = "";

  let titulo = document.createElement("h1");
  titulo.textContent = "Bubble Sorting";
  container.appendChild(titulo);

  let pasosOrdenados = [...pasos, cartasOrdenadas];

  let indexUltimoPaso = pasosOrdenados.findIndex((step) =>
    step.every((carta, i) => carta.numero === cartasOrdenadas[i].numero && carta.pinta === cartasOrdenadas[i].pinta)
  );

  if (indexUltimoPaso !== -1) {
    pasosOrdenados = pasosOrdenados.slice(0, indexUltimoPaso);
  }

  let metodo = pasosOrdenados.map((step) => step.map((carta) => {
    const cartaContainer = document.createElement("div");
    cartaContainer.classList.add("carta");

    const numeroElement = document.createElement("div");
    numeroElement.textContent = cambioDePintas[carta.numero] || carta.numero;
    numeroElement.classList.add("numero");

    const pintaElement = document.createElement("div");
    pintaElement.classList.add("pinta");

    const pintaTextoTop = document.createElement("span");
    pintaTextoTop.textContent = carta.pinta;
    pintaTextoTop.classList.add("pinta-metodo-span");
    
    const pintaTextoBottom = document.createElement("p");
    pintaTextoBottom.textContent = carta.pinta;
    pintaTextoBottom.classList.add("pinta-metodo-p");

    if (carta.pinta === "♥" || carta.pinta === "♦") {
      pintaElement.classList.add("rojo");
    }

    pintaElement.appendChild(pintaTextoTop);
    pintaElement.appendChild(pintaTextoBottom);

    cartaContainer.appendChild(numeroElement);
    cartaContainer.appendChild(pintaElement);

    return cartaContainer;
  }));

  metodo.forEach((fila, index) => {
    const filaContainer = document.createElement("div");
    filaContainer.classList.add("filaContainer");

    fila.forEach((carta) => {
      const cartaContainer = document.createElement("div");
      cartaContainer.classList.add("cartasContainer");

      cartaContainer.appendChild(carta);
      filaContainer.appendChild(cartaContainer);
    });

    container.appendChild(filaContainer);
  });
}