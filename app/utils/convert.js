import fs from 'fs';
import pdfkit from 'pdfkit';

export function convert(type = 'PDF', folderPath,name,cb){

    let temp = folderPath+'/temp';

    let files = fs.readdirSync(temp)
    .map((v)=> {
        return {
            name:v
        };
    })
    .sort((a, b)=> {
        return a.name.split('___')[1].split('.')[0] - b.name.split('___')[1].split('.')[0]
    })
    .map((v)=> {
        return temp+'/'+ v.name

    });

    let doc = new pdfkit();
    doc.pipe(fs.createWriteStream(folderPath+'/'+name+'.pdf'));

    files.forEach((el)=>{
        doc.addPage()
        .image(el)
        .text('Proportional to width', 0, 0);

    })

    doc.end();

    cb()


}
