import {rimrafSync,mkdirpSync} from 'async-file-utils';
import {load} from 'async-spider-utils';
import {asyncEach,asyncFor,asyncMap} from 'async-array-utils';
import fs from 'fs';
import config from './modules/config';


//helpers:
function createFromRange(inStart, inEnd){
  let result = [];
  for(let i = inStart; i<= inEnd; i++){
    result.push(i);
  }
  return result;
}

async function getArticle(inId) {
  const $ = await load(`http://www.timetimetime.net/${inId}.html`);
  return {
    id:inId,
    title:$('.indexbox_l h1').html(),
  };
};


(async ()=>{
  const PER_PAGE = 16;
  const categories = [
    'zasui',
    'shenghuo',
    // 'yuedu',
    // 'yulu',
    // 'renwu',
    // 'meiwen',
    // 'yuanchuang',
    // 'haoshu',
    // 'sanwen',
    // 'gushi',
    // 'lingyimian'
  ];

  class App{
    async init(){
      this._cateIndex = config.get('cateIndex') || 0;
      this._cate = categories[ this._cateIndex ];
      this._data = config.get(this._cate) || [];
      if(this._cateIndex < categories.length){
        await this.start();
      }else{
        console.log('Has Finish!');
        config.set('cateIndex',0);
        config.save();
      }
    }


    async saveArticles(inCurrent,inIds){
      for(let id of inIds){
        const article = await getArticle(id);
        fs.writeFileSync(`./data/${this._cate}/${inCurrent}/${id}.json`, JSON.stringify(article,null,2) );
      }
    }

    async start(){
      const pages =  this._data;
      const current = pages.length + 1;
      console.log('current page is :=>',this._cate,current);
      const $ = await load(`http://www.timetimetime.net/cate-${this._cate}_${current}.html`);
      const ids = Array.from($('.indexbox_l .title>a')).map((item)=>{
        return parseInt( $(item).attr('href').split('/').pop() );
      });

      mkdirpSync(`./data/${this._cate}/${current}`);
      await this.saveArticles(current,ids);

      pages.push(ids);
      config.set(this._cate,pages);

      //The last page:
      if(ids.length!= PER_PAGE){
        console.log('update cate index?');
        this._cateIndex++ ;
        config.set('cateIndex',this._cateIndex);
      }

      config.save();
      await this.init();
    }
  }


  //start collector:
  // const app = new App();
  // await app.init();


  const res = await getArticle(1);
  console.log(res);




})();
