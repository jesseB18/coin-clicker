let coin = document.querySelector('.coins');
let parsedcoin = parseFloat(coin.innerHTML);
let warning = document.getElementById("warning");

let clickercost = document.querySelector('.clicker-cost');
let parsedclickercost = parseFloat(clickercost.innerHTML);
let clickerlevel = document.querySelector('.clicker-level');
let clickerincrease = document.querySelector('.clicker-increase');
let parsedclickerincrease = parseFloat(clickerincrease.innerHTML);

let creditcardcost = document.querySelector('.creditcard-cost');
let parsedCreditcardcost = parseFloat(creditcardcost.innerHTML);
let creditcardlevel = document.querySelector('.creditcard-level');
let creditcardincrease = document.querySelector('.creditcard-increase');
let parsedCreditcardincrease = parseFloat(creditcardincrease.innerHTML);

let bankcost = document.querySelector('.bank-cost');
let parsedBankcost = parseFloat(bankcost.innerHTML);
let banklevel = document.querySelector('.bank-level');
let bankincrease = document.querySelector('.bank-increase');
let parsedBankincrease = parseFloat(bankincrease.innerHTML);

let moneyprintercost = document.querySelector('.moneyprinter-cost');
let parsedMoneyprintercost = parseFloat(moneyprintercost.innerHTML);
let moneyprinterlevel = document.querySelector('.moneyprinter-level');
let moneyprinterincrease = document.querySelector('.moneyprinter-increase');
let parsedMoneyprinterincrease = parseFloat(moneyprinterincrease.innerHTML);

let multinational_companycost = document.querySelector('.multinational_company-cost');
let parsedMultinational_companycost = parseFloat(multinational_companycost.innerHTML);
let multinational_companylevel = document.querySelector('.multinational_company-level');
let multinational_companyincrease = document.querySelector('.multinational_company-increase');
let parsedMultinational_companyincrease = parseFloat(multinational_companyincrease.innerHTML);

let cpctext = document.querySelector('#cpc-text');
let cpstext = document.querySelector('#cps-text');

let coinimgcontainer = document.querySelector('.coin-img-container')

let cpc = 1;

let cps = 0;

function incrementCoin(event) {
    coin.innerHTML = Math.round(parsedcoin += cpc);

    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(cpc)}`
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`
    coinimgcontainer.appendChild(div)

    div.classList.add('fade-up')
    timeout(div)
}

const timeout = (div) =>{
    setTimeout(() => {
        div.remove()
    }, 800)
}

function buyclicker() {
    if (parsedcoin >= parsedclickercost) {
        parsedcoin -= parsedclickercost;
        coin.innerHTML = parsedcoin.toFixed(0);

        clickerlevel.innerHTML ++

        cpc += 1;

        parsedclickerincrease = cpc;
        clickerincrease.innerHTML = parsedclickerincrease.toFixed(0)

        parsedclickercost *= 1.18;
        clickercost.innerHTML = Math.round(parsedclickercost)
    }
}

function buyCreditcard() {
    if (parsedcoin >= parsedCreditcardcost) {
        parsedcoin -= parsedCreditcardcost;
        coin.innerHTML = parsedcoin.toFixed(0);

        creditcardlevel.innerHTML++;

        cps += 10;
        creditcardincrease.innerHTML = cps.toFixed(0);

        parsedCreditcardcost *= 1.18;
        creditcardcost.innerHTML = Math.round(parsedCreditcardcost);
    }
}

function buybank() {
    if (parsedcoin >= parsedBankcost) {
        parsedcoin -= parsedBankcost;
        coin.innerHTML = parsedcoin.toFixed(0);

        banklevel.innerHTML++;

        cps += 1000;
        bankincrease.innerHTML = cps.toFixed(0);

        parsedBankcost *= 1.18;
        bankcost.innerHTML = Math.round(parsedBankcost);
    }
}

function buymoneyprinter() {
    if (parsedcoin >= parsedMoneyprintercost) {
        parsedcoin -= parsedMoneyprintercost;
        coin.innerHTML = parsedcoin.toFixed(0);

        moneyprinterlevel.innerHTML++;

        cps += 100;
        moneyprinterincrease.innerHTML = cps.toFixed(0);

        parsedMoneyprintercost *= 1.18;
        moneyprintercost.innerHTML = Math.round(parsedMoneyprintercost);
    }
}

function buymultinational_company() {
    if (parsedcoin >= parsedMultinational_companycost) {
        parsedcoin -= parsedMultinational_companycost;
        coin.innerHTML = parsedcoin.toFixed(0);

        multinational_companylevel.innerHTML++;

        cps += 10000;
        multinational_companyincrease.innerHTML = cps.toFixed(0);

        parsedMultinational_companycost *= 1.18;
        multinational_companycost.innerHTML = Math.round(parsedMultinational_companycost);
    } else{
        warning.style.display = "block";
        setTimeout(() => {
            warning.style.display = "none";
        }, 2000);
    }
}

setInterval(() => {
    parsedcoin += cps / 100
    coin.innerHTML = Math.round(parsedcoin)
    cpctext.innerHTML = Math.round(cpc)
    cpstext.innerHTML = Math.round(cps);
}, 10)