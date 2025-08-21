let chartInstance;
function calcularDesdeFactura() {
  const kWh = parseFloat(document.getElementById("consumoUsuario").value);

  if (isNaN(kWh) || kWh <= 0) {
    alert("Por favor ingresa un número válido de kWh.");
    return;
  }

  const porcentajeHidro = 70/100; 
  const porcentajeFosil = 30/100;
  const porcentajeOtros = 2/100;

  const kWhHidro = kWh * porcentajeHidro;
  const kWhFosil = kWh * porcentajeFosil;
  const kWhOtros = kWh * porcentajeOtros;
  const emisionesCO2 = kWh * 0.4;

  document.getElementById("resultadoKwh").textContent = `🔌 Consumo mensual es de ${kWh.toFixed(2)} kWh.`;
  document.getElementById("resultadoHidro").textContent = `💧 Un total de ${kWhHidro.toFixed(2)} kWh podría obtenerse a partir de energía hidroeléctrica.`;
  document.getElementById("resultadoCO2").textContent = `🌍  Si todo proviniera de origen fósil, generaría ${emisionesCO2.toFixed(2)} kg de CO₂.`;

   const ctx = document.getElementById("graficoConsumo").getContext("2d"); 

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Hidroeléctrica", "Fósil", "CO₂"],
      datasets: [{
        label: "Consumo en kWh",
        data: [kWhHidro, kWhFosil, emisionesCO2],
        backgroundColor: ["#1A7D96", "#080808", "#40843B"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  document.getElementById("graficoConsumo").style.display = "block";
  void document.getElementById("graficoConsumo").offsetWidth;
  document.getElementById("graficoConsumo").style.opacity = "1";
}