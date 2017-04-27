


export default [
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

export const cateUrl = (inCate)=>{
  return `http://www.timetimetime.net/cate-${inCate}.html`;
};

export const totalPage = (inCate,$) => {
  const url = $('.page a').last().attr('href');
  const RE = new RegExp(`cate-${inCate}_(\\d+).html`);
  return url.match(RE)[1];
};


