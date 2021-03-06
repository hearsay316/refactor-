// noinspection DuplicatedCode

let plays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
}

let invoices = [{
    "customer": "BigCo", "performances": [{
        "playID": "hamlet", "audience": 55
    }, {
        "playID": "as-like", "audience": 35
    }, {
        "playID": "othello", "audience": 40
    }]
}]

function statement(invoice, plays) {
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    }
    // let totalAmount = appleSauce();
    result += `Amount owed is ${usd(totalAmount())}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;

    function volumeCreditsFor(perf) {
        let volumeCredits = 0;
        volumeCredits += Math.max(perf.audience - 30, 0);
        if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
        return volumeCredits;
    }

    function amountFor(aPerformance) {
        let result = 0;
        switch (playFor(aPerformance).type) {
            case "tragedy":
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`unknown type: ${playFor(aPerformance).type}`);
        }
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function totalVolumeCredits() {
        let volumeCredits = 0;
        for (let perf of invoices[0].performances) {
            volumeCredits += volumeCreditsFor(perf)
        }
        return volumeCredits
    }

    function totalAmount() {
        let result = 0;
        for (const perf of invoices[0].performances) {
            result += amountFor(perf)
        }
        return result
    }

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US", {
            style: "currency", currency: "USD", minimumFractionDigits: 2
        }).format(aNumber / 100);
    }
}


invoices.forEach(item => {
    console.log(statement(item, plays));
})

