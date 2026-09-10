let nivel = 1;

let energiaJugador = 100;

let energiaMonstruo = 100;

let batallaActiva = false;

let posicionJugador = 80;

let esquivando = false;


const monstruos = [

    {
        nombre: "Slime de la oscuridad",
        color1: "#76498c",
        color2: "#34223f"
    },

    {
        nombre: "Fantasma del bosque",
        color1: "#8799a8",
        color2: "#3c4752"
    },

    {
        nombre: "Araña gigante",
        color1: "#8b4f57",
        color2: "#3d2229"
    },

    {
        nombre: "Dragón de fuego",
        color1: "#9a5139",
        color2: "#45221c"
    },

    {
        nombre: "Rey de las sombras",
        color1: "#49305e",
        color2: "#140f19"
    }

];


function abrirInvitacion() {

    document
        .getElementById("invitacion")
        .scrollIntoView({
            behavior: "smooth"
        });

}


function empezarBatalla() {

    nivel = 1;

    energiaJugador = 100;

    energiaMonstruo = 100;

    posicionJugador = 80;

    batallaActiva = true;


    document
        .getElementById("victoryScreen")
        .style.display =
        "none";


    document
        .getElementById("startBattleButton")
        .style.display =
        "none";


    cargarNivel();


    actualizarPantalla();


    document
        .getElementById("battleMessage")
        .textContent =
        "comienza la batalla";

}


function cargarNivel() {

    energiaMonstruo =
        100 + ((nivel - 1) * 20);


    const monstruo =
        monstruos[nivel - 1];


    document
        .getElementById("monsterName")
        .textContent =
        monstruo.nombre;


    const monsterBody =
        document.querySelector(
            ".monster-body"
        );


    monsterBody.style.background =
        `linear-gradient(
            ${monstruo.color1},
            ${monstruo.color2}
        )`;


    const monster =
        document.getElementById("monster");


    monster.classList.remove(
        "monster-defeated"
    );


    monster.style.opacity =
        "1";


    actualizarPantalla();

}


function actualizarPantalla() {

    document
        .getElementById("levelText")
        .textContent =
        nivel;


    document
        .getElementById("playerHealthText")
        .textContent =
        Math.max(
            energiaJugador,
            0
        );


    document
        .getElementById("monsterHealthText")
        .textContent =
        Math.max(
            energiaMonstruo,
            0
        );

}


function moverIzquierda() {

    if (!batallaActiva) {
        return;
    }


    posicionJugador -= 45;


    if (posicionJugador < 10) {

        posicionJugador = 10;

    }


    document
        .getElementById("battleCat")
        .style.left =
        posicionJugador + "px";

}


function moverDerecha() {

    if (!batallaActiva) {
        return;
    }


    const pantalla =
        document.getElementById(
            "battleScreen"
        );


    posicionJugador += 45;


    const limite =
        pantalla.clientWidth - 260;


    if (posicionJugador > limite) {

        posicionJugador = limite;

    }


    document
        .getElementById("battleCat")
        .style.left =
        posicionJugador + "px";

}


function saltar() {

    if (!batallaActiva) {
        return;
    }


    const gato =
        document.getElementById(
            "battleCat"
        );


    gato.classList.remove(
        "jump"
    );


    void gato.offsetWidth;


    gato.classList.add(
        "jump"
    );


    document
        .getElementById("battleMessage")
        .textContent =
        "Estelito salta";

}


function esquivar() {

    if (!batallaActiva) {
        return;
    }


    esquivando =
        true;


    const gato =
        document.getElementById(
            "battleCat"
        );


    gato.style.transform =
        "translateX(-50px) rotate(-15deg)";


    document
        .getElementById("battleMessage")
        .textContent =
        "Estelito esquivó el ataque";


    setTimeout(function () {

        gato.style.transform =
            "";


        esquivando =
            false;

    }, 500);

}


function atacar() {

    if (!batallaActiva) {
        return;
    }


    const gato =
        document.getElementById(
            "battleCat"
        );


    const monstruo =
        document.getElementById(
            "monster"
        );


    const orb =
        document.getElementById(
            "magicOrb"
        );


    gato.classList.remove(
        "attack"
    );


    orb.classList.remove(
        "shoot"
    );


    void gato.offsetWidth;


    gato.classList.add(
        "attack"
    );


    orb.classList.add(
        "shoot"
    );


    const dano =
        Math.floor(
            Math.random() * 16
        ) + 18;


    energiaMonstruo -=
        dano;


    mostrarEfectoAtaque(
        dano
    );


    monstruo.classList.remove(
        "monster-hit"
    );


    void monstruo.offsetWidth;


    monstruo.classList.add(
        "monster-hit"
    );


    document
        .getElementById("battleMessage")
        .textContent =
        "Estelito lanzó un ataque mágico";


    actualizarPantalla();


    if (energiaMonstruo <= 0) {

        derrotarMonstruo();

        return;

    }


    setTimeout(function () {

        ataqueMonstruo();

    }, 650);

}


function mostrarEfectoAtaque(dano) {

    const effect =
        document.getElementById(
            "attackEffect"
        );


    const damage =
        document.getElementById(
            "damageNumber"
        );


    effect.classList.remove(
        "show"
    );


    damage.classList.remove(
        "show"
    );


    void effect.offsetWidth;


    effect.classList.add(
        "show"
    );


    damage.textContent =
        "-" + dano;


    damage.classList.add(
        "show"
    );

}


function ataqueMonstruo() {

    if (!batallaActiva) {
        return;
    }


    if (esquivando) {

        document
            .getElementById("battleMessage")
            .textContent =
            "el monstruo falló";

        return;

    }


    const dano =
        Math.floor(
            Math.random() * 10
        ) + 8;


    energiaJugador -=
        dano;


    document
        .getElementById("battleMessage")
        .textContent =
        "el monstruo contraatacó";


    const gato =
        document.getElementById(
            "battleCat"
        );


    gato.style.transform =
        "translateX(-25px)";


    setTimeout(function () {

        gato.style.transform =
            "";

    }, 250);


    actualizarPantalla();


    if (energiaJugador <= 0) {

        perderBatalla();

    }

}


function derrotarMonstruo() {

    const monster =
        document.getElementById(
            "monster"
        );


    monster.classList.add(
        "monster-defeated"
    );


    document
        .getElementById("battleMessage")
        .textContent =
        monstruos[nivel - 1].nombre +
        " fue derrotado";


    if (nivel >= monstruos.length) {

        setTimeout(function () {

            ganarJuego();

        }, 1000);


        return;

    }


    batallaActiva =
        false;


    setTimeout(function () {

        nivel++;


        energiaJugador =
            Math.min(
                energiaJugador + 20,
                100
            );


        batallaActiva =
            true;


        cargarNivel();


        document
            .getElementById("battleMessage")
            .textContent =
            "nivel " +
            nivel +
            ": aparece un nuevo monstruo";

    }, 1200);

}


function perderBatalla() {

    batallaActiva =
        false;


    document
        .getElementById("battleMessage")
        .textContent =
        "Estelito necesita descansar. Inténtalo otra vez.";


    document
        .getElementById("startBattleButton")
        .style.display =
        "inline-block";


    document
        .getElementById("startBattleButton")
        .textContent =
        "intentar otra vez";

}


function ganarJuego() {

    batallaActiva =
        false;


    document
        .getElementById("battleMessage")
        .textContent =
        "Estelito completó su aventura";


    document
        .getElementById("victoryScreen")
        .style.display =
        "block";


    document
        .getElementById("victoryScreen")
        .scrollIntoView({
            behavior: "smooth"
        });

}


function reiniciarBatalla() {

    empezarBatalla();


    document
        .querySelector(
            ".game-header"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* CONTROLES DEL TECLADO */

document.addEventListener(
    "keydown",
    function (event) {

        if (!batallaActiva) {
            return;
        }


        if (event.key === "ArrowLeft") {

            moverIzquierda();

        }


        if (event.key === "ArrowRight") {

            moverDerecha();

        }


        if (event.key === "ArrowUp") {

            saltar();

        }


        if (event.key === " ") {

            event.preventDefault();

            atacar();

        }

    }
);