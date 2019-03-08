const http = require('http');
var cheerio = require('cheerio');
var fs = require("fs")
let cateIds = [
  2723, 2683,
  3894,
  2392,
  2460,
  2641,
  3891,
  2559,
  3413,
  2780,
  3899
] //大分类数组
function getPageData(url) { //获取页面元素
  return new Promise((reslove, reject) => {
    http.get(
      url,
      function (req, res) {
        let html = '';
        req.on('data', function (data) {
          html += data;
        });
        req.on('end', function () {
          reslove(html)
        });
      });
  })

}

function createProductInfo(data) {
  var $ = cheerio.load(data)
  let info = []
  $('.list_pic .item').each((index, ele) => {
    let obj = {
      name: $(ele).find('.goods-pic img').attr('title'),
      salePrice: $(ele).find('.sale-price').text().replace('¥', ''),
      marketPrice: $(ele).find('.market-price').text().replace('¥', ''),
      imgUrl: $(ele).find('.goods-pic img').attr('src'),
    }
    info.push(obj)
  });
  return info
}

function createFs(fileName, data, options) {
  fs.writeFile(fileName, JSON.stringify(data), options, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log(`${fileName}数据写入成功...`);
  })
}

function getCateMaxPage(pageData) { //获取分类页最大页码数
  var $ = cheerio.load(pageData)
  let url = $('.tc .pagination li').last().find('a').attr('href')
  url = url.match(/\d{0,4}.html/g)
  let maxAge = url[0].replace('.html', '')
  console.log('当前分类最大页码:' + maxAge)
  return Promise.resolve(maxAge)
}

function getCateUrls(url, cateId) { //获取分类的链接地址
   getPageData(url).then(pageData => {
    getCateMaxPage(pageData).then(maxAge => {
      let cateUrls = []
      for (let i = 0; i <= maxAge; i++) {
        getCateDetails(`http://www.emall001.com/shop/cate-${cateId}-0-0-0-0-0-0-0-0-${maxAge}.html`)
          .then(urls => {
            console.log(`第${cateId}分类，第${i}页链接采集完成`)
              setProductUrl(urls)
          })
      }
    })
  })
}
let gloalProductUrls=[]
 function setProductUrl(urls){
     gloalProductUrls.concat(urls)
     console.log('数据写入成功')
 }

function getCateDetails(url) {
  return new Promise(reslove => {
    getPageData(url).then(pageData => {
      let productUrls = []
      var $ = cheerio.load(pageData)
      $('.list_pic .item').each((index, ele) => {
        productUrls.push($(ele).find('.goods-pic a').attr('href'))
      })
      console.log(`当前分类页商品数量:` + productUrls.length)
      reslove(productUrls)
    })
  })
}


function init() {
  cateIds.forEach(cateId => {
    getCateUrls(`http://www.emall001.com/shop/cate-${cateId}-0-0-0-0-0-0-0-0-0.html`, cateId)
  });
  console.log(gloalProductUrls)
}
init()