const maanosat = [
    { nimi: "aasia", kuva: "kuvat/aasia.png" },
    { nimi: "eurooppa", kuva: "kuvat/eurooppa.png" },
    { nimi: "afrikka", kuva: "kuvat/afrikka.png" },
    { nimi: "pohjois-amerikka", kuva: "kuvat/pohjois-amerikka.png" },
    { nimi: "etelämanner", kuva: "./kuvat/etelämanner.png" },
    { nimi: "australia", kuva: "./kuvat/australia.png" },
    { nimi: "etelä-amerikka", kuva: "kuvat/etelä-amerikka.png" }
  ];
  
  let nykyinenIndeksi = 0;
  

  const kuvaElementti = document.getElementById("maanosakuvat");
  kuvaElementti.src = maanosat[nykyinenIndeksi].kuva;
  
  document.querySelector('input[type="submit"]').addEventListener("click", (event) => {
    event.preventDefault();
  

    const valittuMaanosa = document.getElementById("maanosa").value;
  

    if (valittuMaanosa === maanosat[nykyinenIndeksi].nimi) {
      alert("Oikein!");
    } else {
      alert(`Väärin! Oikea vastaus on ${maanosat[nykyinenIndeksi].nimi}.`);
    }
  

    nykyinenIndeksi = (nykyinenIndeksi + 1) % maanosat.length;
    kuvaElementti.src = maanosat[nykyinenIndeksi].kuva;
  });
  
