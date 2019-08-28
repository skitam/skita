var express = require("express")
var app = express()
//引入mongodb
var db = require("./db")
//使用路由中间件
var router = express.Router()
//处理post请求
var bodyParser = require("body-parser")
//处理post对json的请求
app.use(bodyParser.urlencoded({ extended: false }))
//使用路由
app.use(router)
//设置允许跨域访问
router.all("*", (req, res, next) => {
    //允许所有域名进行访问
    res.header("Access-Control-Allow-origin", "*")
    //定义请求头类型
    res.header("Access-Control-Allow-Headers", "content-type")
    //定义跨域访问的请求方式
    res.header("Access-Control-Allow-Method", "GET", "POST", "PATCH", "PUT", "OPTIONS", "DELETE")
    //判断
    next()
})
/**
 * 跨域处理
 * 1.代理   node-http-proxy
 * 2.json  get
 * 3.设置请求响应头
 * 4.cors  get  post
 */
//注册接口
router.post("/reg", (req, res) => {
    /**
     * 1.接收前端传过来的值
     * 
     */
    var regUser = {
        username: req.body.username,
        password: req.body.password,
        createAt: new Date(),
        updateAt: new Date(),
        phone: req.body.phone,
        emiail: req.body.email,
        tokenId: 1
    }
    db.add("userDate", regUser, (err, result) => {
        if (err) {
            throw err
        }
        res.send("dsfdw")
    })
})
//登录接口
router.get("/login", (req, res) => {
    /*
    1.接收前端传输过来的值
    2.根据前端的值与数据库里面的用户数据进行对比
       2.1判断是否存在用户   query
       2.2再与数据里面的数据进行对比
       2.3一致时返回成功
    3.前端进行登录成功的跳转
    */
    //接收前端传输过来的值
    var userData = {
        username: req.query.username,
        password: req.query.password
    }
    //进行数据库的检索  result []  length
    db.find("userData", userData, (err, result) => {
        if (result.length == 0) {
            res.send({ "error": "没有密码或用户名·" })
        } else if (result.length != 0 && result[0].password == req.query.password && result[0].username == req.query.username) {
            res.send({ "success": "好" })
        }
    })

})
app.listen(3000, function () {
    console.log("running...")
})

// $ajax({
//     url:"http://127.0.0.1:3000/login",
//     type:"get",
//     date:{
//         username:$("#user").val(),
//         password:$("#pass").val(),
//     }
// })