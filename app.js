import request from 'request';
import cheerio from 'cheerio';
import categories,{
  cateUrl,
  totalPage
} from './config/categories';

const categoriyUrls = categories.map(item=>cateUrl(item));

async function sleep(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve();
    }, timeout);
  });
};


async function fetchHtml(timeout) {
  return new Promise((resolve, reject) => {
    request('http://www.timetimetime.net/cate-zasui.html',(err,response,body)=>{
      resolve(body);
    })
  });
};



(async function () {
  const html = await fetchHtml();
  const $ = cheerio.load(html);
  console.log(totalPage('zasui',$));
  //const url = $('.page a').last().attr('href');
  //'http://www.timetimetime.net/cate-zasui_41.html'
  // console.log(categoriyUrls);
  // const result = await fetchBaidu();
  // console.log(result);
  // await sleep(3000);
})();
