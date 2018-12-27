const http = require('http');
var cheerio = require('cheerio');
var fs = require("fs")
let jsonData = []
let count=1
const  maxPage=2
function getData(url) {
  console.log(`正在抓取第${count}页`)
  http.get(
    url,
    function (req, res) {
      let html = '';
      req.on('data', function (data) {
        html += data;
      });
      req.on('end', function () {
        jsonData=jsonData.concat(createProductInfo(html))
        count++
        let url= `http://www.emall001.com/shop/cate-3525-0-0-0-0-0-0-0-0-${count}.html`
        if(count<=maxPage){
          getData(url)
        }else{
          console.log('正在写入....')
          createFs(jsonData)
        }
      });
    });  
}
function createProductInfo(data) {
  var $ = cheerio.load(data)
  let info=[]
  $('.list_pic .item').each((index, ele) => {
    let obj = {
      name: $(ele).find('.goods-pic img').attr('title'),
      salePrice: $(ele).find('.sale-price').text().replace('¥',''),
      marketPrice:$(ele).find('.market-price').text().replace('¥',''),
      imgUrl:$(ele).find('.goods-pic img').attr('src'),
    }
    info.push(obj)
  });
  return info
}
getData('http://www.emall001.com/shop/cate-3525-0-0-0-0-0-0-0-0-1.html')

function createFs(data){
  fs.writeFile('玩具.json', JSON.stringify(data), function (err) {
    if (err) {
        return console.error(err);
    }
    console.log("数据写入成功！");
})
}
