const xml2js = require('xml2js');
const request = require('request');

const URL = {
    email: 'gabrielferrer%40outlook.com.br',
    tokken: '83D26228AC2F4503A551F6B9C985CEB3'
}

function sessions(req, res) {
    const options = {
        url: `https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?email=${URL.email}&token=${URL.tokken}`,
        method: 'POST'
    };
    request(options, (err, resp, body) => {
        if (!err && resp.statusCode === 200) {
            const parser = new xml2js.Parser();
            parser.parseString(body, (err, result) => {
                res.status(200).json(result);
            })
        } else {
            res.status(400).json({
                message: 'Ocorreu um erro interno'
            });
        }
    })
}

function transactions(req, res) {
    const builder = new xml2js.Builder();
    const obj = req.body;
    let xml = builder.buildObject(obj);
    xml = xml.replace('<root>', '<payment>').replace('</root>', '</payment>');

    const options = {
        url: 'https://ws.sandbox.pagseguro.uol.com.br/v2/transactions?email=gabrielferrer%40outlook.com.br&token=83D26228AC2F4503A551F6B9C985CEB3',
        method: 'POST',
        headers: {
            'Content-Type': 'application/xml'
        },
        body: xml
    };
    request(options, (err, resp, body) => {
        if (!err && resp.statusCode === 200) {
            const parser = new xml2js.Parser();
            parser.parseString(body, (err, result) => {
                res.status(200).json(result);
            })
        } else {
            res.status(400).json(body);
        }
    });
}

module.exports = {
    sessions,
    transactions
}
