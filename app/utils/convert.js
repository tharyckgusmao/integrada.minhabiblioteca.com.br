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

    let doc = new pdfkit({size: [800, 1180], margin: 0});

    doc.pipe(fs.createWriteStream(folderPath+'/'+name+'.pdf'));

    files.forEach((el)=>{
        doc.addPage()
        .image(el , 0, 0,'height': 1180 , 'fit':[800, 1180]);

    })

    doc.end();

    cb()


}
