import Base from './base';
export default class extends Base{
  constructor(inCate){
    this._cate = inCate;
  }
  get url(){
    return `http://www.timetimetime.net/cate-${this._cate}.html`;
  }
  get title(){}
  get keywords(){}
  get description(){}
}
