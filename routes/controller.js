const { readFile, writeFile } = require('fs/promises');
const { path } = require('app-root-path');
const sharp = require('sharp');
const { randomInt } = require('crypto');

const { HOST, PORT } = require('../config/settings');


class controller {
    async image(req, res) {
        try{
            const { data } = req.body;
            // console.log(req.body);
            const file = await readFile(`${path}/imgs/base_image.jpg`);
            const img = sharp(file);
            const textSVG = Buffer.from(
                `<svg height="1400" width="1000" font-size="26"> 
                    <text x="50%" y="280" text-anchor="middle" font-width="bold">
                        ${data.man.surname}
                    </text>
                    <text x="50%" y="320" text-anchor="middle" font-width="bold">
                        ${data.man.name}
                    </text>
                    <text x="50%" y="360" text-anchor="middle" font-width="bold">
                        ${data.man.patronymic}
                    </text>
                    <text x="50%" y="397" text-anchor="middle" font-width="bold">
                        ${data.man.citizenship}
                    </text>
                    <text x="60%" y="440" text-anchor="middle" font-width="bold">
                        ${data.man.datebirth}
                    </text>
                    <text x="50%" y="480" text-anchor="middle" font-width="bold">
                        ${data.man.placebirth}
                    </text>
                    <text x="50%" y="595" text-anchor="middle" font-width="bold">
                        ${data.wife.surname}
                    </text>
                    <text x="50%" y="635" text-anchor="middle" font-width="bold">
                        ${data.wife.name}
                    </text>
                    <text x="50%" y="675" text-anchor="middle" font-width="bold">
                        ${data.wife.patronymic}
                    </text>
                    <text x="50%" y="715" text-anchor="middle" font-width="bold">
                        ${data.wife.citizenship}
                    </text>
                    <text x="60%" y="755" text-anchor="middle" font-width="bold">
                        ${data.wife.datebirth}
                    </text>
                    <text x="50%" y="790" text-anchor="middle" font-width="bold">
                        ${data.wife.placebirth}
                    </text>
                    <text x="40%" y="1025" text-anchor="middle" font-width="bold">
                        ${data.final.assi_man_surname}
                    </text>
                    <text x="40%" y="1065" text-anchor="middle" font-width="bold">
                        ${data.final.assi_wife_surname}
                    </text>
                    <text x="60%" y="1140" text-anchor="middle" font-width="bold">
                        ${data.final.place_reg}
                    </text>
                    <text x="70%" y="1195" text-anchor="middle" font-width="bold">
                        ${data.final.date_reg}
                    </text>
                </svg>`);
            const picture = await img.composite([{ input: textSVG }]).toBuffer();
            let fileName = `${randomInt(100000)}_${parseInt(Date.now())}.jpg`;
            await writeFile(`${path}/imgs/${fileName}`, picture);
            let url = `http://${'192.168.0.9'}:${PORT}/imgs/${fileName}`;
            res.json({status: 1, url : url});
            return

        }catch(e){
            console.log(e);
            res.status(400).json({message : 'Ошибка на сервере! Перезагрузите приложение'});
            return
        }
    };

}

module.exports = new controller();