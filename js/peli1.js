const flags = [ //Vaihtoehtojen maat ja kuvat
    { country: "Suomi", image: "./kuvat/Flag_of_Finland.svg" },
    { country: "Ruotsi", image: "./kuvat/Flag_of_Sweden.svg" },
    { country: "Norja", image: "./kuvat/Flag_of_Norway.svg" },
    { country: "Tanska", image: "./kuvat/Flag_of_Denmark.svg" },
    { country: "Saksa", image: "./kuvat/Flag_of_Germany.svg" },
    { country: "Ranska", image: "./kuvat/Flag_of_France.svg" },
    { country: "Italia", image: "./kuvat/Flag_of_Italy.svg" },
    { country: "Espanja", image: "./kuvat/Flag_of_Spain.svg" },
    { country: "Portugali", image: "./kuvat/Flag_of_Portugal.svg" },
    { country: "Iso-Britannia", image: "./kuvat/Flag_of_the_United_Kingdom.svg" },
    { country: "Alankomaat", image: "./kuvat/Flag_of_the_Netherlands.svg" },
    { country: "Belgia", image: "./kuvat/Flag_of_Belgium.svg" },
    { country: "Sveitsi", image: "./kuvat/Flag_of_Switzerland.svg" },
    { country: "Itävalta", image: "./kuvat/Flag_of_Austria.svg" },
    { country: "Kreikka", image: "./kuvat/Flag_of_Greece.svg" },
    { country: "Puola", image: "./kuvat/Flag_of_Poland.svg" },
    { country: "Irlanti", image: "./kuvat/Flag_of_Ireland.svg" },
    { country: "Unkari", image: "./kuvat/Flag_of_Hungary.svg" },
    { country: "Islanti", image: "./kuvat/Flag_of_Iceland.svg" },
    { country: "Tsekki", image: "./kuvat/Flag_of_the_Czech_Republic.svg" },
    { country: "Viro", image: "./kuvat/Flag_of_Estonia.svg" },
    { country: "Latvia", image: "./kuvat/Flag_of_Latvia.svg" },
    { country: "Liettua", image: "./kuvat/Flag_of_Lithuania.svg" },
    { country: "Slovakia", image: "./kuvat/Flag_of_Slovakia.svg" },
    { country: "Slovenia", image: "./kuvat/Flag_of_Slovenia.svg" },
    { country: "Kroatia", image: "./kuvat/Flag_of_Croatia.svg" },
    { country: "Romania", image: "./kuvat/Flag_of_Romania.svg" },
    { country: "Bulgaria", image: "./kuvat/Flag_of_Bulgaria.svg" },
    { country: "Turkki", image: "./kuvat/Flag_of_Turkey.svg" },
    { country: "Ukraina", image: "./kuvat/Flag_of_Ukraine.svg" }
];


let selectedFlags = [];
let currentFlagIndex = 0;
let score = 0;
let attempts = 10;

function getRandomFlags(allFlags, count) {
    const shuffled = [...allFlags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function getRandomWrongAnswers(correctCountry) { //Arpoo Flagseista 2 väärää vastausvaihtoehtoa
    const wrongs = flags
        .filter(flag => flag.country !== correctCountry)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
    return wrongs.map(flag => flag.country);
}

function loadFlag() {
    if (attempts === 0 || currentFlagIndex >= selectedFlags.length) {
        document.getElementById("result").textContent = `Peli päättyi! Kokonaispisteet: ${score}/10`;
        document.getElementById("flag").style.display = "none";
        document.getElementById("choices").style.display = "none";
        document.getElementById("nextButton").style.display = "none";
        document.getElementById("yritykset").style.display = "none";
        document.getElementById("pisteet").style.display = "none";
        return;
    }

    const currentFlag = selectedFlags[currentFlagIndex];
    document.getElementById("flag").src = currentFlag.image;

    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    const wrongAnswers = getRandomWrongAnswers(currentFlag.country);
    const allAnswers = [...wrongAnswers, currentFlag.country].sort(() => 0.5 - Math.random());

    allAnswers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.onclick = () => checkAnswer(answer);
        choicesDiv.appendChild(btn);
    });

    document.getElementById("result").textContent = "";
}

function checkAnswer(selectedAnswer) {
    const correct = selectedFlags[currentFlagIndex].country;
    if (selectedAnswer === correct) {
        document.getElementById("result").textContent = "Oikein!";
        score++;
        document.getElementById("score").textContent = score;
    } else {
        document.getElementById("result").textContent = `Väärin! Oikea vastaus oli: ${correct}`;
    }

    const buttons = document.getElementById("choices").querySelectorAll("button");
    buttons.forEach(b => b.disabled = true);
}

function nextFlag() {
    attempts--;
    document.getElementById("attempts").textContent = attempts;
    currentFlagIndex++;
    loadFlag();
}

window.onload = function () {
    selectedFlags = getRandomFlags(flags, 10);
    loadFlag();
};
