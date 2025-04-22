const countries = [
    { nimi: "Suomi", paakaupunki: "Helsinki", lippu: "Suomi.png" },
    { nimi: "Ruotsi", paakaupunki: "Tukholma", lippu: "Ruotsi.png" },
    { nimi: "Saksa", paakaupunki: "Berliini", lippu: "Saksa.png" },
    { nimi: "Espanja", paakaupunki: "Madrid", lippu: "Espanja.png" },
    { nimi: "Tsekki", paakaupunki: "Praha", lippu: "Tsekki.png" },
    { nimi: "Tanska", paakaupunki: "Kööpenhamina", lippu: "Tanska.png" },
    { nimi: "Slovakia", paakaupunki: "Bratislava", lippu: "Slovakia.png" },
    { nimi: "Ranska", paakaupunki: "Pariisi", lippu: "Ranska.png" },
    { nimi: "Puola", paakaupunki: "Varsova", lippu: "Puola.png" },
    { nimi: "Norja", paakaupunki: "Oslo", lippu: "Norja.png" },
    { nimi: "Niger", paakaupunki: "Niamey", lippu: "Niger.png" },
    { nimi: "Liettua", paakaupunki: "Vilna", lippu: "Liettua.png" },
    { nimi: "Kreikka", paakaupunki: "Ateena", lippu: "Kreikka.png" },
    { nimi: "Kiina", paakaupunki: "Peking", lippu: "Kiina.png" },
    { nimi: "Kanada", paakaupunki: "Ottawa", lippu: "Kanada.png" },
    { nimi: "Japani", paakaupunki: "Tokio", lippu: "Japani.png" },
    { nimi: "Italia", paakaupunki: "Rooma", lippu: "Italia.png" },
    { nimi: "Israel", paakaupunki: "Jerusalem", lippu: "Israel.png" }
];


// Pelin tilastot
let oikeatVastaukset = 0;
let virheet = 0;
let kierros = 0;
const maxKierrokset = 10;

function uusiKierros() {
    // Satunnaisesti valitaan oikea maa
    const oikeaMaa = countries[Math.floor(Math.random() * countries.length)];
    const oikeaPaakaupunki = oikeaMaa.paakaupunki;

    // Valitaan kaksi väärää pääkaupunkia
    let väärätPääkaupungit = [];
    while (väärätPääkaupungit.length < 2) {
      const vääräMaa = countries[Math.floor(Math.random() * countries.length)];
      if (vääräMaa.paakaupunki !== oikeaPaakaupunki && !väärätPääkaupungit.includes(vääräMaa.paakaupunki)) {
        väärätPääkaupungit.push(vääräMaa.paakaupunki);
      }
    }

    // Sekoitetaan oikea pääkaupunki ja väärät pääkaupungit
    let vaihtoehdot = [oikeaPaakaupunki, väärätPääkaupungit[0], väärätPääkaupungit[1]];

    // Satunnaistetaan valintojen järjestys
    const randomOptions = vaihtoehdot.sort(() => Math.random() - 0.5);

    // Asetetaan vaihtoehdot select-elementtiin
    const selectElement = document.getElementById("maat");
    selectElement.innerHTML = randomOptions.map(option => `<option value="${option}">${option}</option>`).join('');

    // Näytetään oikean maan lippu (polku kuville)
    const flagElement = document.getElementById("flag");
    flagElement.src = "kuvat/" + oikeaMaa.lippu; // Lisää "img/"-polku kuviin

    return { oikeaMaa, oikeaPaakaupunki };
}

// Uusi kierros
let { oikeaMaa, oikeaPaakaupunki } = uusiKierros();

// Tarkistusnappulan toiminta
document.getElementById("checkButton").addEventListener('click', function() {
    const selectElement = document.getElementById("maat");
    const valittu = selectElement.value;
    const resultElement = document.getElementById("result");

    if (valittu === "") {
        resultElement.textContent = "Valitse pääkaupunki!";
        resultElement.style.color = "black";
    } else if (valittu === oikeaPaakaupunki) {
        resultElement.textContent = "Oikein! Se on " + oikeaPaakaupunki;
        resultElement.style.color = "green";
        oikeatVastaukset++;
    } else {
        resultElement.textContent = "Väärin! Oikea pääkaupunki on " + oikeaPaakaupunki;
        resultElement.style.color = "red";
        virheet++;
    }

    // Päivitetään tulokset
    kierros++;
    if (kierros < maxKierrokset) {
        setTimeout(() => {
            // Seuraava kierros
            ({ oikeaMaa, oikeaPaakaupunki } = uusiKierros());
        }, 1000);
    } else {
        // Pelin loppu ja tulosten näyttäminen
        setTimeout(() => {
            document.getElementById("score").textContent = `Peli loppui! Oikein: ${oikeatVastaukset} Väärin: ${virheet}`;
            document.getElementById("checkButton").disabled = true; // Estetään lisää kysymyksiä
        }, 1000);
    }
});