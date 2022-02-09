let play = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
}
let  invoices = {
    "customer": "BigCo",
    "performances": [
        {
            "playID": "hamlet",
            "audience": 55
        },
        {
            "playID": "as-like",
            "audience": 35
        },
        {
            "playID": "othello",
            "audience": 40
        }
    ]
}
function statement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `顾客${invoice.customer}的账单: \n`;
    const format = new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD",
            minimumFractionDigits: 2 }).format;
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = 0;
        switch (play.type) {
            case "tragedy":
                thisAmount = 40000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error(`unknown type: ${play.type}`);
        }
// 添加数量学分
        volumeCredits += Math.max(perf.audience - 30, 0);
// 为每十名喜剧参与者增加额外的积分
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
// 此订单的打印行
        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} 座位)\n`
        ;
        totalAmount += thisAmount;
    }
    result += `账单 ${format(totalAmount/100)}\n`;
    result += `你赚取了 ${volumeCredits} 积分\n`;
    return result;
}

console.log(statement(invoices, play));
