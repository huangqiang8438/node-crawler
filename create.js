var fs = require("fs")
const http = require("http");
const path = require("path");
const productData = require('./test.json')
var axios = require('axios')
var FormData = require('form-data');
let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkemQiLCJjcmVhdGVkIjoxNTQ1Mjc3MzgzNDcwLCJ1c2VyU291cmNlIjoic3RvcmUiLCJleHAiOjE1NDUyNzkxODN9.8keF4cPjzouc_Pnh9YxZk2MY-hF2zAww2dAmIHSd3XO8v3aqPIahP8NVeffhNFIzlDHwIbcWVVrxl6jk4IWdkA'
let mockData = {
  "product": {
    "storeId": "",
    "storeCategoryId": null,
    "categoryId": 192,
    "name": "美妆个护",
    "virtualCardTplId": null,
    "itemNumber": "",
    "brandId": "",
    "summary": "",
    "summaryColor": "#ff0000",
    "templeteId": 93,
    "weight": "0.1",
    "volume": "0.1",
    "sellGoodsSale": true,
    "isInvoice": true,
    "status": 3
  },
  "productTypeId": 142,
  "storeCategoryIds": [null],
  "imageResources": [{
    "remark": "",
    "imgResourceId": 4101,
    "url": "blob:http://localhost:8081/5a9633c3-6e4e-4de9-8e65-af171680691a"
  }],
  "videoResources": [],
  "txt": {
    "pcTxt": "<p><br/></p><div id=\"J-detail-pop-tpl-top-new\" clstag=\"shangpin|keycount|product|pop-glbs\" style=\"margin: 0px; padding: 0px; overflow: hidden; color: rgb(102, 102, 102); font-family: tahoma, arial, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, u5b8bu4f53, sans-serif; font-size: 12px; white-space: normal; background-color: rgb(255, 255, 255);\"><p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px;\"><img src=\"https://img10.360buyimg.com/imgzone/jfs/t1/24763/24/1456/1075451/5c12247fE4e5bc6bb/e54a301da56e27ee.jpg\" width=\"790\" height=\"2140\" usemap=\"#v1\" style=\"margin: 0px; padding: 0px; border: 0px; vertical-align: middle;\"/><map name=\"v1\" id=\"v1\"><area shape=\"rect\" coords=\"404,1519,771,2106\" href=\"https://item.jd.com/22621449665.html#\" target=\"_blank\"/><area shape=\"rect\" coords=\"18,1519,384,2110\" href=\"https://item.jd.com/22621449665.html#\" target=\"_blank\"/><area shape=\"rect\" coords=\"409,901,758,1481\" href=\"https://item.jd.com/35928745690.html\" target=\"_blank\"/><area shape=\"rect\" coords=\"21,894,379,1493\" href=\"https://item.jd.com/22621449665.html#\" target=\"_blank\"/></map></p></div><div class=\"detail-content clearfix\" data-name=\"z-have-detail-nav\" style=\"margin: 10px 0px; padding: 0px; position: relative; background: rgb(247, 247, 247); color: rgb(102, 102, 102); font-family: tahoma, arial, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, u5b8bu4f53, sans-serif; font-size: 12px; white-space: normal;\"><div class=\"detail-content-wrap\" style=\"margin: 0px; padding: 0px; width: 990px; float: left; background-color: rgb(255, 255, 255);\"><div id=\"tencent-video\" style=\"margin: 0px; padding: 0px;\"><div tabindex=\"-1\" poster=\"http://jdvodimg.jcloudcache.com/vodtransgzp1251412368/7447398155588010383/1524276765_2270945055.100_0.jpg\" class=\"video-js vjs-default-skin vjs-paused detail-video-player-dimensions vjs-controls-enabled vjs-workinghover vjs-v5 vjs-user-inactive\" id=\"detail-video-player\" role=\"region\" aria-label=\"video player\" style=\"margin: 0px auto; padding: 0px; width: 750px; height: 422px; color: rgb(255, 255, 255); background-color: rgb(0, 0, 0); vertical-align: top; box-sizing: border-box; position: relative; line-height: 1; font-family: Arial, Helvetica, sans-serif; user-select: none; font-size: 14px; overflow: hidden;\"><video id=\"detail-video-player_html5_api\" class=\"vjs-tech\" poster=\"http://jdvodimg.jcloudcache.com/vodtransgzp1251412368/7447398155588010383/1524276765_2270945055.100_0.jpg\" tabindex=\"-1\" preload=\"auto\" src=\"https://jdvodoss.jcloudcache.com/vodtransgzp1251412368/7447398155588010383/v.f30.mp4?dockingId=654731b9-dc2c-496c-94b5-8c7c5235a3b7&storageSource=3\" style=\"box-sizing: inherit; font-size: inherit; color: inherit; line-height: inherit; width: 750px; height: 422px; position: absolute; top: 0px; left: 0px;\"></video><div style=\"margin: 0px; padding: 0px; box-sizing: inherit; font-size: inherit; color: inherit; line-height: inherit;\"></div><div class=\"vjs-poster\" tabindex=\"-1\" aria-disabled=\"false\" style=\"margin: 0px; padding: 0px; box-sizing: inherit; display: inline-block; vertical-align: middle; background-repeat: no-repeat; background-position: 50% 50%; background-size: contain; cursor: pointer; position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; height: 422px; font-size: inherit; color: inherit; line-height: inherit; background-image: url(&quot;http://jdvodimg.jcloudcache.com/vodtransgzp1251412368/7447398155588010383/1524276765_2270945055.100_0.jpg&quot;);\"></div><div class=\"vjs-text-track-display\" aria-live=\"off\" aria-atomic=\"true\" style=\"margin: 0px; padding: 0px; box-sizing: inherit; position: absolute; bottom: 3em; left: 0px; right: 0px; top: 0px; pointer-events: none; font-size: inherit; color: inherit; line-height: inherit;\"></div><button class=\"vjs-big-play-button\" type=\"button\" aria-live=\"polite\" title=\"播放视频\" aria-disabled=\"false\" style=\"cursor: pointer; box-sizing: inherit; font-size: 2.5em; color: rgb(255, 255, 255); background: 0px center rgba(0, 0, 0, 0.5); border-width: 0px; border-style: initial; border-color: initial; display: block; overflow: visible; transition: border-color 0.4s ease 0s, outline 0.4s ease 0s, background-color 0.4s ease 0s; -webkit-appearance: none; font-family: VideoJS; position: absolute; padding: 0px; opacity: 1; border-radius: 20%; top: 211px; left: 375px; margin-left: -1em; width: 2em; line-height: 1.4em !important; height: 1.4em !important; margin-top: -0.7em !important;\"><span class=\"vjs-control-text\" style=\"margin: -1px; padding: 0px; box-sizing: inherit; font-size: inherit; color: inherit; line-height: inherit; border: 0px; clip: rect(0px, 0px, 0px, 0px); height: 1px; overflow: hidden; position: absolute; width: 1px;\">播放视频</span></button></div></div><div class=\"detail-content-item\" style=\"margin: 0px; padding: 0px; width: 990px;\"><div id=\"activity_header\" clstag=\"shangpin|keycount|product|activityheader\" style=\"margin: 0px; padding: 0px;\"></div><div id=\"J-detail-content\" style=\"margin: 0px; padding: 0px;\"><img alt=\"\" class=\"\" src=\"https://img30.360buyimg.com/popWaterMark/jfs/t1/7260/9/8567/307737/5c0e313eE7692786b/63d728e39a4d068a.jpg\" style=\"margin: 0px; padding: 0px; border: 0px; vertical-align: middle;\"/><br/><img alt=\"\" class=\"\" src=\"https://img13.360buyimg.com/popWaterMark/jfs/t1/29629/14/956/400581/5c0e313eE6e59ef78/f2375fb8e06ae4cd.jpg\" style=\"margin: 0px; padding: 0px; border: 0px; vertical-align: middle;\"/><br/><img alt=\"\" class=\"\" src=\"https://img11.360buyimg.com/popWaterMark/jfs/t1/26808/16/936/279979/5c0e313eE5316c2cd/3f5fc49bf0dbe29b.jpg\" style=\"margin: 0px; padding: 0px; border: 0px; vertical-align: middle;\"/><br/><img alt=\"\" class=\"\" src=\"https://img20.360buyimg.com/popWaterMark/jfs/t1/14438/32/947/264719/5c0e313eE2cfc0fd0/a2cb8057907dd50a.jpg\" style=\"margin: 0px; padding: 0px; border: 0px; vertical-align: middle;\"/><br/><img alt=\"\" class=\"\" src=\"https://img20.360buyimg.com/popWaterMark/jfs/t1/11827/21/1818/286284/5c0e313eE107822e0/32ae1c612a1fa743.jpg\" style=\"margin: 0px; padding: 0px; border: 0px; vertical-align: middle;\"/><br/><img alt=\"\" class=\"\" src=\"https://img11.360buyimg.com/popWaterMark/jfs/t1/16327/29/945/238190/5c0e313eE549c2e9a/a4ef02648021b2b2.png\" style=\"margin: 0px; padding: 0px; border: 0px; vertical-align: middle;\"/><br/><img alt=\"\" class=\"\" src=\"https://img14.360buyimg.com/popWaterMark/jfs/t1/22327/35/957/121032/5c0e313fEf5816216/819d88b731e837dd.jpg\" style=\"margin: 0px; padding: 0px; border: 0px; vertical-align: middle;\"/></div></div></div></div><p><br/></p>",
    "mobileTxt": "",
    "topTplId": null,
    "bottomTplId": null
  },
  "ext": {
    "maxDeductible": "10",
    "unit": "件",
    "keyword": "不刺激,物流快，分量足",
    "evaluation": "不刺激,物流快，分量足",
    "storeServiceId": "",
    "storeServiceIds": [],
    "evaluationView": "不刺激,物流快，分量足"
  },
  "coreModel": {
    "salePrice": "100",
    "marketPrice": "50",
    "costPrice": "60",
    "inventory": "20",
    "warningValue": 10,
    "hasSku": false
  },
  "skuTypeAttrs": [],
  "skus": [],
  "proTypeAttrs": []
}

function getHttpReqCallback(imgSrc, dirName, data) {
  var fileName = path.basename(imgSrc);
  var callback = function (res) {
    var contentLength = parseInt(res.headers['content-length']);
    var fileBuff = [];
    res.on('data', function (chunk) {
      var buffer = new Buffer(chunk);
      fileBuff.push(buffer);
    });
    res.on('end', function () {
      if (isNaN(contentLength)) {
        console.log(imgSrc + " content length error");
        return;
      }
      var totalBuff = Buffer.concat(fileBuff);
      if (totalBuff.length < contentLength) {
        console.log(imgSrc + " download error, try again");
        startDownloadTask(imgSrc, dirName, data);
        return;
      }
      fs.appendFileSync(dirName + "/" + fileName, totalBuff, function (err) {}); //下载完成开始上传
      console.log(fileName + '下载成功...')
      uploadImg(fileName, data)
    });
  };

  return callback;
}

function downLoadImage(imgSrc, data) { //下载图片
  var req = http.request(imgSrc, getHttpReqCallback(imgSrc, './images', data));
  req.on('error', function (e) {
    startDownloadTask(imgSrc, './images', data);
  });
  req.end();
}

function uploadImg(filePath, data) { //上传图片
  console.log('正在上传' + filePath)
  var form = new FormData();
  form.append('uploadFile', fs.createReadStream(`./images/${filePath}`), filePath); //'file'是服务器接受的key
  var headers = form.getHeaders(); //这个不能少
  headers['JSPGOU-Auth-Token'] = token
  var request = http.request({
    method: 'post',
    host: '192.168.0.240',
    port: '8080',
    path: '/admin/store/upload/o_upload',
    headers: headers
  }, function (res) {
    var str = '';
    res.on('data', function (buffer) {
      str += buffer; //用字符串拼接
    });
    res.on('end', () => {
      var result = JSON.parse(str);
      if (result.token !== '') {
        token = result.token
      }
      if (result.code === 200) {
        console.log(filePath + '图片上传成功')
        let params = {
          imgId: result.data.resourceId,
          name: data.name,
          salePrice: data.salePrice,
          marketPrice: data.marketPrice
        }
        addProduct(params)

      } else {
        console.log(filePath + '图片上传失败')
      }
    });
  });
  form.pipe(request);
}

function addProduct(data) {
  mockData.product.name = data.name
  mockData.imageResources[0].imgResourceId = data.imgId
  mockData.coreModel.salePrice = data.salePrice
  mockData.coreModel.marketPrice = data.marketPrice
  axios({
    method: 'post',
    url: 'http://192.168.0.240:8080/admin/store/product/save',
    data: mockData,
    headers: {
      'JSPGOU-Auth-Token': token
    }
  }).then(res => {
    if (res.data.token !== '') {
      token = res.data.token
    }
    if (res.data.code === 200) {
      console.log('-----' + data.name + '添加成功')
    } else {
      console.warn('-----' + data.name + '添加失败')
    }
  });
}
let len = productData.length
let count = -1
let timer = null

function initProduct() {
  console.log('开始添加数据')
  timer = setInterval(() => {
    count++;
    if (count < len) {
      downLoadImage(productData[count].imgUrl, productData[count])
    } else {
      clearInterval(timer)
      console.log('数据添加完成')
    }
  }, 1000);
}

initProduct()
