import request from 'request';
import cheerio from 'cheerio';


async function getArticle(inId) {
  const url = `http://www.timetimetime.net/${inId}.html`;
  return new Promise((resolve, reject) => {
    request(url,(err,response,body)=>{
      const $ = cheerio.load(body);
      resolve({
        id:inId,
        title:$('.indexbox_l h1').text(),
        content:$('.indexbox_l .neir.a2').text()
      });
    })
  });
};


// eg: http://www.timetimetime.net/8.html


(async function () {
  const article = await getArticle(1);

  console.log(article);

  // console.log(totalPage('zasui',$));
  //const url = $('.page a').last().attr('href');
  //'http://www.timetimetime.net/cate-zasui_41.html'
  // console.log(categoriyUrls);
  // const result = await fetchBaidu();
  // console.log(result);
  // await sleep(3000);
})();
