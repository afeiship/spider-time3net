import request from 'request';
import cheerio from 'cheerio';
import config from './modules/config';
import categories from './config/categories';
import {asyncMap} from './modules/utils';

const totalPage = (inCate,$) => {
  const url = $('.page a').last().attr('href');
  const RE = new RegExp(`cate-${inCate}_(\\d+).html`);
  return url.match(RE)[1];
};


async function initialConfig(inCate) {
  const url = `http://www.timetimetime.net/cate-${inCate}.html`;
  return new Promise((resolve, reject) => {
    request(url,(err,response,body)=>{
      if(!err){
        const $ = cheerio.load(body);
        resolve({
          slug:inCate,
          total:totalPage(inCate,$)
        });
      }else{
        reject(err);
      }
    });
  });
};



(async ()=>{

  // let result =await asyncMap(categories,(cate,index)=>{
  //   return initialConfig(cate);
  // });

  config.set('data',null);


  // const result = await Promise.all(categories.map(async (cate) => {
  //   return await initialConfig(cate);
  // }));
  // console.log(result);

  // config.clear();
  // config.set('data',result);
  // config.save();

})();
