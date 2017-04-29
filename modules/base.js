export default class{
  constructor(){}
  wrap(){}
  get html(){}
}

//intial.json
const data = [
  {
    slug: 'yuedu',
    start:1,
    current:1,
    total: 708
  }, {
    slug: 'yulu',
    start:1,
    current:10,
    total: 609
  }
];

// running.json
const task = {
  slug: 'yulu',
  current:10,
  links:[]
};

data.filter(item=>item.current>1 && item.current<10000);
