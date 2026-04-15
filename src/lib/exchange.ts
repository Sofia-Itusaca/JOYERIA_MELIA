export async function getDollarRateToday(): Promise<number> {
  const today = new Date().toISOString().split("T")[0];

  const savedData = localStorage.getItem("exchangeRateData");

  if (savedData) {
    const parsed = JSON.parse(savedData);

    // ✅ Si ya es de hoy → NO llamar API
    if (parsed.date === today) {
      console.log("Usando dólar guardado:", parsed.rate);
      return parsed.rate;
    }
  }

  // ❌ Si no existe o es de otro día → llamar API
  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await res.json();

    const rate = data.rates.PEN;

    // 💾 Guardar en localStorage
    localStorage.setItem(
      "exchangeRateData",
      JSON.stringify({
        rate,
        date: today,
      })
    );

    console.log("Nuevo dólar guardado:", rate);

    return rate;
  } catch (error) {
    console.error("Error obteniendo dólar:", error);

    // fallback seguro
    return 3.8;
  }
}