"use strict";
let coin = document.querySelector('.coins');
let parsedcoin = parseFloat(coin.innerHTML);
let warning = document.getElementById("warning");

let clickercost = document.querySelector('.clicker-cost');
let parsedclickercost = parseFloat(clickercost.innerHTML);
let clickerlevel = document.querySelector('.clicker-level');
let clickerincrease = document.querySelector('.clicker-increase');

let creditcardcost = document.querySelector('.creditcard-cost');
let parsedCreditcardcost = parseFloat(creditcardcost.innerHTML);
let creditcardlevel = document.querySelector('.creditcard-level');
let creditcardincrease = document.querySelector('.creditcard-increase');

let bankcost = document.querySelector('.bank-cost');
let parsedBankcost = parseFloat(bankcost.innerHTML);
let banklevel = document.querySelector('.bank-level');
let bankincrease = document.querySelector('.bank-increase');

let moneyprintercost = document.querySelector('.moneyprinter-cost');
let parsedMoneyprintercost = parseFloat(moneyprintercost.innerHTML);
let moneyprinterlevel = document.querySelector('.moneyprinter-level');
let moneyprinterincrease = document.querySelector('.moneyprinter-increase');

let multinational_companycost = document.querySelector('.multinational_company-cost');
let parsedMultinational_companycost = parseFloat(multinational_companycost.innerHTML);
let multinational_companylevel = document.querySelector('.multinational_company-level');
let multinational_companyincrease = document.querySelector('.multinational_company-increase');

let world_companycost = document.querySelector('.world_company-cost');
let parsedWorld_companycost = parseFloat(world_companycost.innerHTML);
let world_companylevel = document.querySelector('.world_company-level');
let world_companyincrease = document.querySelector('.world_company-increase');

let cpctext = document.querySelector('#cpc-text');
let cpstext = document.querySelector('#cps-text');
let coinimgcontainer = document.querySelector('.coin-img-container');

let cpc = 1;
let clickerCPS = 0;
let creditcardCPS = 0;
let moneyprinterCPS = 0;
let bankCPS = 0;
let multinational_companyCPS = 0;
let world_companyCPS = 0;
let cps = 0;

function formatNumber(num) {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9)  return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6)  return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3)  return (num / 1e3).toFixed(2) + 'K';
    return Math.round(num);
}

function incrementCoin(event) {
    parsedcoin += cpc;
    coin.innerHTML = formatNumber(parsedcoin);
    const x = event.offsetX;
    const y = event.offsetY;
    const div = document.createElement('div');
    div.innerHTML = `+${formatNumber(cpc)}`;
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`;
    coinimgcontainer.appendChild(div);
    div.classList.add('fade-up');
    setTimeout(() => div.remove(), 800);
}

function buyclicker() {
    if (parsedcoin >= parsedclickercost) {
        parsedcoin -= parsedclickercost;
        clickerlevel.innerHTML++;
        let increase = Math.round(parsedclickercost / 50);
        cpc += increase;
        clickerincrease.innerHTML = formatNumber(cpc);
        parsedclickercost *= 2.5;
        clickercost.innerHTML = formatNumber(parsedclickercost);
    } else {
        warning.style.display = "block";
        setTimeout(() => warning.style.display = "none", 2000);
    }
}

function buyCreditcard() {
    if (parsedcoin >= parsedCreditcardcost) {
        parsedcoin -= parsedCreditcardcost;
        creditcardlevel.innerHTML++;
        let increase = Math.round(parsedCreditcardcost / 100);
        creditcardCPS += increase;
        creditcardincrease.innerHTML = formatNumber(creditcardCPS);
        parsedCreditcardcost *= 1.2;
        creditcardcost.innerHTML = formatNumber(parsedCreditcardcost);
    } else {
        warning.style.display = "block";
        setTimeout(() => warning.style.display = "none", 2000);
    }
}

function buybank() {
    if (parsedcoin >= parsedBankcost) {
        parsedcoin -= parsedBankcost;
        banklevel.innerHTML++;
        let increase = Math.round(parsedBankcost / 10);
        bankCPS += increase;
        bankincrease.innerHTML = formatNumber(bankCPS);
        parsedBankcost *= 1.2;
        bankcost.innerHTML = formatNumber(parsedBankcost);
    } else {
        warning.style.display = "block";
        setTimeout(() => warning.style.display = "none", 2000);
    }
}

function buymoneyprinter() {
    if (parsedcoin >= parsedMoneyprintercost) {
        parsedcoin -= parsedMoneyprintercost;
        moneyprinterlevel.innerHTML++;
        let increase = Math.round(parsedMoneyprintercost / 20);
        moneyprinterCPS += increase;
        moneyprinterincrease.innerHTML = formatNumber(moneyprinterCPS);
        parsedMoneyprintercost *= 1.2;
        moneyprintercost.innerHTML = formatNumber(parsedMoneyprintercost);
    } else {
        warning.style.display = "block";
        setTimeout(() => warning.style.display = "none", 2000);
    }
}

function buymultinational_company() {
    if (parsedcoin >= parsedMultinational_companycost) {
        parsedcoin -= parsedMultinational_companycost;
        multinational_companylevel.innerHTML++;
        let increase = Math.round(parsedMultinational_companycost / 50);
        multinational_companyCPS += increase;
        multinational_companyincrease.innerHTML = formatNumber(multinational_companyCPS);
        parsedMultinational_companycost *= 1.2;
        multinational_companycost.innerHTML = formatNumber(parsedMultinational_companycost);
    } else {
        warning.style.display = "block";
        setTimeout(() => warning.style.display = "none", 2000);
    }
}

function buyworld_company() {
    if (parsedcoin >= parsedWorld_companycost) {
        parsedcoin -= parsedWorld_companycost;
        world_companylevel.innerHTML++;
        let increase = Math.round(parsedWorld_companycost / 50);
        world_companyCPS += increase;
        world_companyincrease.innerHTML = formatNumber(world_companyCPS);
        parsedWorld_companycost *= 1.2;
        world_companycost.innerHTML = formatNumber(parsedWorld_companycost);
    } else {
        warning.style.display = "block";
        setTimeout(() => warning.style.display = "none", 2000);
    }
}

let lastTime = performance.now();
function update(time) {
    let delta = (time - lastTime) / 1000;
    lastTime = time;
    cps = clickerCPS + creditcardCPS + moneyprinterCPS + bankCPS + multinational_companyCPS + world_companyCPS;
    parsedcoin += cps * delta;
    coin.innerHTML = formatNumber(parsedcoin);
    cpctext.innerHTML = formatNumber(cpc);
    cpstext.innerHTML = formatNumber(cps);
    requestAnimationFrame(update);
}

requestAnimationFrame(update);
