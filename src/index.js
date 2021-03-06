const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const portHttp = process.env.PORT || 80;

const router = require("./router");
const SocketIO = require("./services/socketIO");

require("dotenv").config();
require("./services/connectDatabase");

const httpServer = require("http").createServer(app);

//app set middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use("/api", router);
app.use(express.static(__dirname));
app.get("/", (req, res) => {
	res.status(200).send("<h3 align='center'>Đừng hack web em, pleaseeeee !!!</h3>");
});

httpServer.listen(portHttp, () => {
	console.log(`👂  Listen on http://localhost:${portHttp}`);
});

new SocketIO(httpServer);
