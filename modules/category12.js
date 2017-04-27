export default class {
  constructor(inCate){
    this._cate = inCate;
  }

  /**
   * 获取分类的首页
   */
  url(){
    return `http://www.timetimetime.net/cate-${this._cate}.html`;
  }

  html(){

  }

  get title(){}
  get keywords(){}
  get description(){}
  get page(){}
  get rows(){}
  get total(){}
}
