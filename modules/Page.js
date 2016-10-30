var path = require('path');
var ROOT_PATH = require('root-path');
var co = require("co");
var request = require("co-request");
var cheerio = require('cheerio');
var fs = require('fs');
var config = require('../config/app.json');

module.exports = nx.declare({
  methods: {
    start: function*() {
      var cateItems = config.category.items;
      var currentIndex = config.page.currentIndex;
      console.log(currentCate);
      nx.each(cateItems,function* (index,item) {
        console.log(_);
        yield this.update(index,item);
      },this);
      // for (var i = currentCate.first; i < currentCate.last; i++) {
      //   this.update(i,yield this.info(currentCate.id, i))
      // }
    },
    url: function(inCateId, inPageId) {
      return nx.format(config.url.page, [inCateId, inPageId]);
    },
    info: function*(inCateId, inPageId) {
      var url = this.url(inCateId, inPageId);
      var response = yield request(url);
      var $ = cheerio.load(response.body);
      console.log(url);
      return null;
    },
    update: function*(inIndex,inItem) {
      fs.mkdirSync(path.join(ROOT_PATH,'./data/category-'+inItem.id));
      // config.page.currentIndex=inIndex;
      // this.write();
    },
    write: function() {
      fs.writeFileSync(
        path.join(ROOT_PATH, './config/app.json'),
        JSON.stringify(config, null, 2)
      );
    }
  }
});
