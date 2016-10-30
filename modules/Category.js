var ROOT_PATH = require('root-path');
var path = require('path');
var request = require("co-request");
var cheerio = require('cheerio');
var fs = require('fs');
var config = require('../config/app.json');


module.exports = nx.declare({
  methods: {
    start: function*() {
      var category = config.category;
      var i = category.startIndex > 1 ? (category.startIndex + 1) : 1;
      for (; i <= category.endIndex; i++) {
        this.update(i, yield this.info(i));
      }
    },
    url: function(inId) {
      console.info('current cate id :', inId);
      return nx.format(config.url.category, [inId]);
    },
    info: function*(inId) {
      var url = this.url(inId);
      var response = yield request(url);
      var $ = cheerio.load(response.body);
      var name = $('.nrtopgg.a16 a:last-child').text();
      if (name) {
        var lastUrl = $('.pagebar .last-page').parent().attr('href');
        var description = $('.indexbox_l .flshuom').text();
        var lastPage = nx.hashlize(lastUrl).page;
        var slug = $('.indexbox_l .left_conent');

        return {
          id: inId,
          name: name.trim(),
          slug:'',
          first: 1,
          last: parseInt(lastPage) || 2,
          description: description.trim()
        };
      }
      return null;
    },
    update: function(inCurrentIndex, inItem) {
      var category = config.category;
      var items = category.items;
      category.startIndex = inCurrentIndex;
      inItem && category.items.push(inItem);
      this.write();
    },
    create:function(inItem) {
      fs.mkdirSync(path.join(ROOT_PATH,'./data/category-'+inItem.id));
    },
    write: function() {
      fs.writeFileSync(
        path.join(ROOT_PATH, './config/app.json'),
        JSON.stringify(config, null, 2)
      );
    }
  }
});
