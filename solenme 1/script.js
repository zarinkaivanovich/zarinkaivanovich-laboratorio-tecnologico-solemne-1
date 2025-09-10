const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const peliculas = [
  { anio: 1993, pelicula: "Hocus Pocus", rating: 95 },
  { anio: 1978, pelicula: "Halloween", rating: 90 },
  { anio: 1993, pelicula: "El extraño mundo de Jack", rating: 88 },
  { anio: 1988, pelicula: "Beetlejuice", rating: 83 },
  { anio: 2017, pelicula: "It", rating: 79 },
  { anio: 2009, pelicula: "Coraline", rating: 75 },
  { anio: 1980, pelicula: "Viernes 13", rating: 72 },
  { anio: 1996, pelicula: "Scream", rating: 70 },
  { anio: 1995, pelicula: "Casper", rating: 68 },
  { anio: 1991, pelicula: "The Addams Family", rating: 65 },
];

const radius = 50;
let mousePos = { x: 0, y: 0 };
let hoveredIndex = -1;

// Calculamos posiciones fijas distribuidas horizontalmente
const positions = peliculas.map((_, i) => {
  const spacing = canvas.width / (peliculas.length + 1);
  return {
    x: spacing * (i + 1),
    y: canvas.height / 2,
  };
});

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mousePos = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
  hoveredIndex = -1;
  positions.forEach(({ x, y }, i) => {
    const dx = mousePos.x - x;
    const dy = mousePos.y - y;
    if (dx * dx + dy * dy <= radius * radius) {
      hoveredIndex = i;
    }
  });
  draw();
});

function drawCircleWithText(x, y, radius, text, highlight = false) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = highlight ? "yellow" : "orange";
  ctx.fill();
  ctx.closePath();

  ctx.fillStyle = "black";
  ctx.font = "bold 14px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (text.length > 12) {
    text = text.slice(0, 11) + "...";
  }

  ctx.fillText(text, x, y);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Título
  ctx.fillStyle = "orange";
  ctx.font = "bold 32px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Películas más vistas en Halloween", canvas.width / 2, 50);

  // Dibujar círculos
  positions.forEach(({ x, y }, i) => {
    drawCircleWithText(x, y, radius, peliculas[i].pelicula, i === hoveredIndex);
  });

  // Mostrar info al pasar el mouse
  if (hoveredIndex !== -1) {
    const peli = peliculas[hoveredIndex];
    ctx.fillStyle = "orange";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Año: ${peli.anio}  |  Rating: ${peli.rating}`, canvas.width / 2, canvas.height - 60);
  }
}

// Dibuja la primera vez
draw();
