var ROOT_PATH = require('root-path');
var jsonInit = require('json-init');
var nx = require('next-js-core2');
var co = require("co");
var request = require("co-request");
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var Category = require('./modules/Category');
var Page = require('./modules/Page');


var App = nx.declare({
  methods: {
    page: function() {
      co(function*() {
        var instance = new Page();
        yield instance.start();
      });
    },
    cate: function() {
      co(function*() {
        var instance = new Category();
        yield instance.start();
      });
    },
    reset: function() {
      jsonInit(
        path.join(ROOT_PATH, './config/app.json'),
        require('./config/default.json')
      );
    },
    noop: nx.noop
  }
});


var app = new App();

app[process.argv[2] || 'noop']();
