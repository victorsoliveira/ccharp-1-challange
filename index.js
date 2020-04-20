'use strict';

const fs = require('fs');
const crypto = require("crypto");
const cs = require('./cesarSolver');
const request = require('request');

const path = 'answer.json';
const file = fs.readFileSync(path);
const answer = JSON.parse(file);

answer.decifrado = cs(answer.cifrado, answer.numero_casas);
answer.resumo_criptografico = crypto.createHash('sha1').update(answer.decifrado).digest('hex');

fs.writeFileSync(path, JSON.stringify(answer, null, 4));

console.log('Decoded and saved!');
console.log('Making request...');

const options = {
    method: "POST",
    url: "https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=e5545f25ba05fe3c8465ccee68516912c578070e",
    port: 443,
    headers: {
        "Content-Type": "multipart/form-data"
    },
    formData: {
        "answer": fs.createReadStream(path)
    }
};

request(options, function(err, res, body) {
    if (err) {
        console.error('Error: ', err)
        console.error('Request failed!');
    } else {
        console.log('Body: ', body);
        console.info('Request success!');
    };
});