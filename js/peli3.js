const maanosat = [ //vastausvaihtoehdot ja kuvat
  { nimi: "aasia", kuva: "kuvat/aasia.png" },
  { nimi: "eurooppa", kuva: "kuvat/eurooppa.png" },
  { nimi: "afrikka", kuva: "kuvat/afrikka.png" },
  { nimi: "pohjois-amerikka", kuva: "kuvat/pohjois-amerikka.png" },
  { nimi: "etelämanner", kuva: "kuvat/etelämanner.png" },
  { nimi: "australia", kuva: "kuvat/australia.png" },
  { nimi: "etelä-amerikka", kuva: "kuvat/etelä-amerikka.png" }
];

function sekoitaTaulukko(taulukko) { 
  for (let i = taulukko.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [taulukko[i], taulukko[j]] = [taulukko[j], taulukko[i]];
  }
}

sekoitaTaulukko(maanosat);

let nykyinenIndeksi = 0;
let pisteet = 0;

const kuvaElementti = document.getElementById("maanosakuvat");
const palauteElementti = document.getElementById("palaute");
const pisteetElementti = document.getElementById("pisteet");

kuvaElementti.src = maanosat[nykyinenIndeksi].kuva;

document.querySelector('input[type="submit"]').addEventListener("click", (event) => {
  event.preventDefault();

  const valittuMaanosa = document.getElementById("maanosa").value;
  const palauteElementti = document.getElementById("palaute");
  const pisteetElementti = document.getElementById("pisteet");

  if (valittuMaanosa === maanosat[nykyinenIndeksi].nimi) {
    pisteet++;
    palauteElementti.textContent = "Oikein!";
  } else {
    palauteElementti.textContent = `Väärin! Oikea vastaus oli ${maanosat[nykyinenIndeksi].nimi}.`;
  }

  pisteetElementti.textContent = `Pisteet: ${pisteet}`;

  nykyinenIndeksi++;

  if (nykyinenIndeksi >= maanosat.length) {
    kuvaElementti.style.display = "none";
    document.getElementById("maanosa").style.display = "none";
    document.querySelector('label[for="maanosa"]').style.display = "none";
    document.querySelector('input[type="submit"]').style.display = "none";
    palauteElementti.textContent += ` Peli loppui! Sait ${pisteet} / ${maanosat.length} pistettä.`;
  }
  
   else {
    kuvaElementti.src = maanosat[nykyinenIndeksi].kuva;
  }
});

