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

  /**
   * 取得分类首页的html
   */
  html(){
  }


  /**
   * 此分类页面的title
   */
  get title(){}

  /**
   * 此分类页面的keywords
   */
  get keywords(){}

  /**
   * 此分类页面的description
   */
  get description(){}

  /**
   * 此分类页面的起始页，基本都是1
   */
  get page(){}

  /**
   * 此分类页面的每页的条数
   */
  get rows(){}

  /**
   * 此分类页面的总页娄
   */
  get total(){}
}
