const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const args = process.argv.slice(2);
const fs = require('fs');

var dir = './Download';
var output = []; 


if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const csvWriter = createCsvWriter({  
  path: `${dir}/${args}.csv`,
  header: [
    {id: 'title', title: 'Judul Artikel'},
    {id: 'sypnosis', title: 'Sipnosis'},
    {id: 'link', title: 'Link'},
  ]
});

getData();

async function getData()
{
    var getData = await axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${args}`);
    var data =  getData.data;
   
    for(var x=0;x<data[1].length;x++){
        var obj = {
            title: data[1][x],
            sypnosis: data[2][x],
            link: data[3][x]
        };
        output.push(obj);
    }

    csvWriter  
    .writeRecords(output)
    .then(() => console.log("Success"))
    .catch(err => console.log(err));
}
