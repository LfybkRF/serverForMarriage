const { readFile, writeFile, unlink } = require('fs/promises');
const { path } = require('app-root-path');
const sharp = require('sharp');
const { randomInt } = require('crypto');

const { HOST, PORT } = require('../config/settings');

const files = []
let count = 0;

class controller {
    async image(req, res) {
        try{
            const { man, woman, final } = req.body.data;
            // console.log(man);
            // console.log(woman);
            // console.log(final);
            const file = await readFile(`${path}/imgs/base_image.jpg`);
            const img = sharp(file);

            const textSVG = Buffer.from(
                `<svg height="1400" width="1000" font-size="26"> 
                    <text x="50%" y="280" text-anchor="middle" font-width="bold">
                        ${man.surname}
                    </text>
                    <text x="50%" y="320" text-anchor="middle" font-width="bold">
                        ${man.name}
                    </text>
                    <text x="50%" y="360" text-anchor="middle" font-width="bold">
                        ${man.patronymic}
                    </text>
                    <text x="50%" y="397" text-anchor="middle" font-width="bold">
                        ${man.citizenship}
                    </text>
                    <text x="60%" y="440" text-anchor="middle" font-width="bold">
                        ${man.datebirth}
                    </text>
                    <text x="50%" y="480" text-anchor="middle" font-width="bold">
                        ${man.placebirth}
                    </text>
                    <text x="50%" y="595" text-anchor="middle" font-width="bold">
                        ${woman.surname}
                    </text>
                    <text x="50%" y="635" text-anchor="middle" font-width="bold">
                        ${woman.name}
                    </text>
                    <text x="50%" y="675" text-anchor="middle" font-width="bold">
                        ${woman.patronymic}
                    </text>
                    <text x="50%" y="715" text-anchor="middle" font-width="bold">
                        ${woman.citizenship}
                    </text>
                    <text x="60%" y="755" text-anchor="middle" font-width="bold">
                        ${woman.datebirth}
                    </text>
                    <text x="50%" y="790" text-anchor="middle" font-width="bold">
                        ${woman.placebirth}
                    </text>
                    <text x="40%" y="1025" text-anchor="middle" font-width="bold">
                        ${final.assi_man_surname}
                    </text>
                    <text x="40%" y="1065" text-anchor="middle" font-width="bold">
                        ${final.assi_wife_surname}
                    </text>
                    <text x="60%" y="1140" text-anchor="middle" font-width="bold">
                        ${final.place_reg}
                    </text>
                    <text x="70%" y="1195" text-anchor="middle" font-width="bold">
                        ${final.date_reg}
                    </text>
                </svg>`);
            const picture = await img.composite([{ input: textSVG }]).toBuffer();
            let fileName = `${randomInt(100000)}_${parseInt(Date.now())}.jpg`;
            await writeFile(`${path}/imgs/${fileName}`, picture);
            let url = `http://${HOST}:${PORT}/imgs/${fileName}`;
            files.push(fileName);
            if (files.length > 15) {
                await unlink(`${path}/imgs/${files[0]}`);
                files.shift()
            } 
            console.log(files);
            console.log(count++);
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
