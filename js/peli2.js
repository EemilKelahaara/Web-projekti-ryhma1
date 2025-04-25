const countries = [ //Vastausvaihtoehdot ja kuvat
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

let oikeat = 0, vaarat = 0, kierros = 0;
const maxKierrokset = 10;
let oikeaPaakaupunki = "";

function uusiKierros() {
    const maa = countries[Math.floor(Math.random() * countries.length)];
    oikeaPaakaupunki = maa.paakaupunki;

    const vaaratVaihtoehdot = [];
    while (vaaratVaihtoehdot.length < 2) {
        const vaara = countries[Math.floor(Math.random() * countries.length)].paakaupunki;
        if (vaara !== oikeaPaakaupunki && !vaaratVaihtoehdot.includes(vaara)) {
            vaaratVaihtoehdot.push(vaara);
        }
    }

    const vaihtoehdot = [oikeaPaakaupunki, ...vaaratVaihtoehdot].sort(() => Math.random() - 0.5);

    document.getElementById("flag").src = "kuvat/" + maa.lippu;
    document.getElementById("maat").innerHTML = vaihtoehdot
        .map(v => `<option value="${v}">${v}</option>`)
        .join('');
    
    document.getElementById("result").textContent = "";
}

function tarkistaVastaus() {
    const valinta = document.getElementById("maat").value;
    const tulos = document.getElementById("result");

    if (!valinta) {
        tulos.textContent = "Valitse paakaupunki!";
        tulos.style.color = "black";
        return;
    }

    if (valinta === oikeaPaakaupunki) {
        tulos.textContent = "Oikein!";
        tulos.style.color = "green";
        oikeat++;
    } else {
        tulos.textContent = `Väärin! Oikea vastaus oli ${oikeaPaakaupunki}`;
        tulos.style.color = "red";
        vaarat++;
    }

    kierros++;

    if (kierros < maxKierrokset) {
        uusiKierros();
    } else {
        document.getElementById("score").textContent =
            `Peli loppui! Oikein: ${oikeat} Väärin: ${vaarat}`;
        document.getElementById("checkButton").disabled = true;
    }
}

document.getElementById("checkButton").addEventListener("click", tarkistaVastaus);
uusiKierros();
