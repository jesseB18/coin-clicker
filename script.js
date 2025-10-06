"use strict";

// ----- ELEMENTEN -----
let coin = document.querySelector('.coins'); // toont aantal munten
let parsedcoin = parseFloat(coin.innerHTML); // aantal munten als getal
let warning = document.getElementById("warning"); // waarschuwing bij te weinig munten

let cpctext = document.querySelector('#cpc-text'); // coins per click
let cpstext = document.querySelector('#cps-text'); // coins per second
let coinimgcontainer = document.querySelector('.coin-img-container');

let cpc = 1; // coins per click

// CPS variabelen voor upgrades
let cpsVars = {
    clickerCPS: 0,
    creditcardCPS: 0,
    moneyprinterCPS: 0,
    bankCPS: 0,
    multinational_companyCPS: 0,
    world_companyCPS: 0
};

// ----- FUNCTIE VOOR HET FORMATTEREN VAN GETALLEN -----
function formatNumber(num) {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9)  return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6)  return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3)  return (num / 1e3).toFixed(2) + 'K';
    return Math.round(num);
}

// ----- COIN CLICK FUNCTIE -----
window.incrementCoin = function(event) {
    parsedcoin += cpc;
    coin.innerHTML = formatNumber(parsedcoin);

    const div = document.createElement('div');
    div.innerHTML = `+${formatNumber(cpc)}`;
    const x = event.clientX;
    const y = event.clientY;
    div.style.cssText = `
        color: white; 
        position: absolute; 
        top: ${y}px; 
        left: ${x}px; 
        font-size: 18px; 
        font-weight: bold;
        pointer-events: none;
        transform: translate(-50%, -50%);
        text-shadow: 1px 1px 3px black;
    `;
    document.body.appendChild(div);
    div.classList.add('fade-up');
    setTimeout(() => div.remove(), 800);
};

document.querySelector('.coin-img').addEventListener('click', incrementCoin);

// ----- UPGRADES DEFINIEREN -----
const upgrades = [
    {
        elem: document.querySelector('.upgrade:nth-child(1)'),
        costElem: document.querySelector('.clicker-cost'),
        levelElem: document.querySelector('.clicker-level'),
        increaseElem: document.querySelector('.clicker-increase'),
        cost: parseFloat(document.querySelector('.clicker-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.clicker-cost').innerHTML),
        level: 0,
        type: 'click',
        baseIncreaseDivisor: 50
    },
    {
        elem: document.querySelector('.upgrade:nth-child(2)'),
        costElem: document.querySelector('.creditcard-cost'),
        levelElem: document.querySelector('.creditcard-level'),
        increaseElem: document.querySelector('.creditcard-increase'),
        cost: parseFloat(document.querySelector('.creditcard-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.creditcard-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'creditcardCPS',
        baseIncreaseDivisor: 100
    },
    {
        elem: document.querySelector('.upgrade:nth-child(3)'),
        costElem: document.querySelector('.moneyprinter-cost'),
        levelElem: document.querySelector('.moneyprinter-level'),
        increaseElem: document.querySelector('.moneyprinter-increase'),
        cost: parseFloat(document.querySelector('.moneyprinter-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.moneyprinter-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'moneyprinterCPS',
        baseIncreaseDivisor: 20
    },
    {
        elem: document.querySelector('.upgrade:nth-child(4)'),
        costElem: document.querySelector('.bank-cost'),
        levelElem: document.querySelector('.bank-level'),
        increaseElem: document.querySelector('.bank-increase'),
        cost: parseFloat(document.querySelector('.bank-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.bank-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'bankCPS',
        baseIncreaseDivisor: 10
    },
    {
        elem: document.querySelector('.upgrade:nth-child(5)'),
        costElem: document.querySelector('.multinational_company-cost'),
        levelElem: document.querySelector('.multinational_company-level'),
        increaseElem: document.querySelector('.multinational_company-increase'),
        cost: parseFloat(document.querySelector('.multinational_company-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.multinational_company-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'multinational_companyCPS',
        baseIncreaseDivisor: 50
    },
    {
        elem: document.querySelector('.upgrade:nth-child(6)'),
        costElem: document.querySelector('.world_company-cost'),
        levelElem: document.querySelector('.world_company-level'),
        increaseElem: document.querySelector('.world_company-increase'),
        cost: parseFloat(document.querySelector('.world_company-cost').innerHTML),
        baseCost: parseFloat(document.querySelector('.world_company-cost').innerHTML),
        level: 0,
        type: 'cps',
        cpsVar: 'world_companyCPS',
        baseIncreaseDivisor: 50
    }
];

// ----- FORMATTEER ALLE UPGRADE KOSTEN BIJ START -----
upgrades.forEach(upg => {
    upg.costElem.innerHTML = formatNumber(upg.cost);
});

// ----- ENE ENIGE INFO-BOX -----
let infoBox = document.createElement('div');
infoBox.className = 'next-level-info';
infoBox.style.position = 'absolute';
infoBox.style.display = 'none';
infoBox.style.pointerEvents = 'none';
document.body.appendChild(infoBox);

// ----- CLICK EN HOVER LOGICA -----
upgrades.forEach(upg => {

    // Klikken op upgrade
    upg.elem.addEventListener('click', () => {
        if (parsedcoin >= upg.cost) {

            let increase = Math.round(upg.baseCost / upg.baseIncreaseDivisor);
            if (increase < 1) increase = 1;

            parsedcoin -= upg.cost;
            upg.level++;
            upg.levelElem.innerHTML = upg.level;

            if (upg.type === 'click') {
                cpc += increase;
                upg.increaseElem.innerHTML = formatNumber(cpc);
            } else {
                cpsVars[upg.cpsVar] += increase;
                upg.increaseElem.innerHTML = formatNumber(cpsVars[upg.cpsVar]);
            }

            upg.cost *= 1.2;
            upg.costElem.innerHTML = formatNumber(upg.cost);

        } else {
            warning.style.display = "block";
            setTimeout(() => warning.style.display = "none", 2000);
        }
    });

    // Hover info realtime
    upg.elem.addEventListener('mouseenter', () => {
        infoBox.style.display = 'block';

        function updateInfo() {
            if (!infoBox) return;

            let increase = Math.round(upg.baseCost / upg.baseIncreaseDivisor);
            if (increase < 1) increase = 1;

            const rect = upg.elem.getBoundingClientRect();
            infoBox.style.top = `${rect.top}px`;
            infoBox.style.left = `${rect.right + 10}px`;
            infoBox.innerText = upg.type === 'click'
                ? `+${formatNumber(increase)} coins per click`
                : `+${formatNumber(increase)} coins per second`;

            requestAnimationFrame(updateInfo);
        }
        requestAnimationFrame(updateInfo);

        upg.elem.addEventListener('mouseleave', () => infoBox.style.display = 'none', { once: true });
    });
});

// ----- AUTOMATISCHE CPS UPDATE -----
let lastTime = performance.now();
function update(time) {
    let delta = (time - lastTime) / 1000;
    lastTime = time;

    let totalCPS = Object.values(cpsVars).reduce((a, b) => a + b, 0);
    parsedcoin += totalCPS * delta;

    coin.innerHTML = formatNumber(parsedcoin);
    cpctext.innerHTML = formatNumber(cpc);
    cpstext.innerHTML = formatNumber(totalCPS);

    requestAnimationFrame(update);
}

requestAnimationFrame(update);
