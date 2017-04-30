import {rimrafSync,mkdirpSync} from 'async-file-utils';
import {load} from 'async-spider-utils';
import {asyncEach,asyncFor,asyncMap} from 'async-array-utils';
import fs from 'fs';

import config from './modules/config';

async function getLinks(inUrl) {
  return new Promise((resolve, reject) => {
    request(inUrl,(err,response,body)=>{
      if(!err){
        const $ = cheerio.load(body);
        let links = [];
        $('.indexbox_l .title>a').each((index,item)=>{
          links.push( $(item).attr('href') );
        });
        resolve(links);
      }else{
        reject(err);
      }
    });
  });
};


(async ()=>{

  // const data = config.get('data');
  const categories = [
    'yuedu',
    'yulu',
    'renwu',
    'meiwen',
    'yuanchuang',
    'haoshu',
    'sanwen',
    'gushi',
    'lingyimian',
    'shenghuo',
    'zasui'
  ];

  class Category{
    constructor(inCate){
      this._cate = inCate;
    }

    async total (){
      const $ = await load(`http://www.timetimetime.net/cate-${this._cate}.html`);
      const url = $('.indexbox_l .page a').last().attr('href');
      return parseInt(url.split('_')[1]);
    }
  }




  // const app = new Category('yulu');

  // await asyncEach(categories,(item,index)=>{
  //   let html = await load()
  // })


function createFromRange(inStart, inEnd){
  let result = [];
  for(let i = inStart; i<= inEnd; i++){
    result.push(i);
  }
  return result;
}



for (let cate of categories){
  const app = new Category(cate);
  const task = config.get('task') || {
    current:1,
    total: await app.total(),
    slug: cate
  };

  const {current,total} = task;

  const arr = createFromRange(current,total);

  // console.log(arr);



  for(let item of arr){
    const filename = `./data/${cate}/${item}`;
    const page = `http://www.timetimetime.net/cate-${cate}_${item}.html`;
    const $page = await load(page);
    if(!fs.existsSync(filename)){
      mkdirpSync(filename);
    }
    // console.log(filename);
  }


}




})();
