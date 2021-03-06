//var jst = require('jst');
var util = require("util")
	, events =  require("events");
var est = require(config.path.lib + 'est/est.js');
var callApiLib = require(config.path.base + 'remoteApi.js'); 
var session = require(config.path.base + 'session.js');
var querystring = require('querystring'); 
var siteInfo =  config.site;
var eventLib = require(config.path.base + 'evtHandle.js');
if ( siteInfo.PUBDAY) {
	siteInfo.SVERSION = siteInfo.PUBDAY + '.' + siteInfo.SVERSION
	delete siteInfo.PUBDAY
}
eventLib.prepareData(siteInfo);

var ServerHead = 'veryside living in ' + config.etc.hostID;

est.setOption({
	watchingTpl : config.etc.watchingTpl,
	fuss : config.etc.fussTpl,
    compiledFolder : config.path.compiledViews });

var jsDepCache = {};
est.assignFn('useModule' , function(jsBlock , JSstack , JSmods){
	if (JSstack){
		if (arguments.length > 3){
			var params = Array.prototype.slice.call(arguments , 3);
			JSstack.push(base.format(jsBlock , params));
		}else{
			 JSstack.push(jsBlock);
			}
		}
	if (!siteInfo.JS_Defer) return;
	var blockKey = base.md5(jsBlock);	
	if (jsDepCache.hasOwnProperty(blockKey)) {
		 var jss = jsDepCache[blockKey];
		 if (false !== jss) jss.map(getAlljss);
		return;
	}
	var jss = [];
	var d_reg = /\'/g;
	var jsl_reg = /(?:\.use *?\()([^\(\)]+)/g,
		 jsl_regs = /(?:\.use *?\()([^\(\)]+)(?:, *function)/;
	var jsl = jsBlock.match(jsl_reg);
	jsl && jsl.map(function(l){
		if (l.indexOf('function') >0) l = (l.match(jsl_regs))[1];	
		else l = l.substr(5);
		if (l) l = JSON.parse(l.replace(d_reg , '"'));
		if ('string' == typeof l ) push(jss ,l)
		else l.map(function(i){ push(jss ,i );}) 
		});

	
	if (jss.length) jss.map(getAlljss);
	jsDepCache[blockKey] = jss.length? jss : false;

	function push(arr , newItem){
		if (arr && arr.indexOf(newItem) == -1) arr.push(newItem);	
		}	
	
	function  getAlljss(jsmod){
		push(JSmods , jsmod);
		}
	//console.log(JSmods);

	});

var tplPreCache = {};
function writeRes (res , status , context, header , debugStr){		
	try{
		res.writeHead( status, header || {'Content-Type': 'text/plain','Cache-Control': 'no-cache,no-store' ,  'service' :ServerHead });
		res.write( context)
		res.end()
	}catch(err){
		console.log('write res error' ,err , new Date, debugStr || '')
		}

	}
function Controller(){
	/*
    this.__reqdata = {};
    this.eventHandle = null;
    this.eventGName = '';
    this.appPath = '';
	this.eventname = '';
	this.req = null;
	this.res = null;
    this.JSstack = [];
    this.CSSstack = [];
    this.JSLinks = [];
    this.CSSLinks = [];
	*/

}
Controller.prototype = { 
	setSDefault :
		base.loadModel('defaultControl/h5.js').bind,
		
	isTokenLive : function(ttl ,  pname , source){
		var appMod = base.loadModel('side/application.js');
		pname = pname || 'nt'
		var nt 
		if (source) nt = source[pname]
		else nt = this.req.headers[pname] || this.req.__post[pname] 
		return appMod.isTokenLive( nt || '' , 'this.req.headers.clientIp' , ttl || 10)
		},
    siteInfo : siteInfo,
	checkdIllegal : checkdIllegal,
	setRnR : setRnR,
	render : render,
	index : index,
	readData : readData ,
	loadModel : base.loadModel ,
    ajaxTo : ajaxTo,
	errorPage : function(code){
		if (!code ) code = 404;
		writeRes(this.res , code , code +'')
		},
    redirectTo : function(url , proxyArgs ,opt){
		opt = opt || {}
		var args
		if (proxyArgs){
			args = this.req.__get
			}
		if (opt.r){
			var appMod = base.loadModel('side/application.js');
			args = {"_or" : appMod.genToken(opt.r)}	
			}
		if (args){
		    args = require('querystring').stringify(args)
	        if (args) url += (url.indexOf('?')>0 ? '&' :'?') + args
			}
		writeRes(this.res , 301 , '' ,{
            'Location' : url,
			'Cache-Control' : 'no-cache,must-revalidate,no-store',
			'Pragma' : 'no-cache'
			} )
        
        },
    getApi : function(remoteUri,reqAct , method ,rawData){
        return callApiLib.__create(this.req , this.res , this.notify )(remoteUri , method || this.req.method , reqAct ,rawData); 
        },
	bridgeMuch : function(php){
		for (var k in php){
			var phpClient = this.bridge( php[k]);
			this.listenOn(phpClient , k)();
			}
		this.req.dataSource = php
		},
    bridge : function(remoteUri ,reqAct , method, rawData){
        var data =  this.req.__get;
        if ( this.req.method == 'POST'){
			var querys = querystring.stringify(this.req.__get)
            if (querys) remoteUri +=  (remoteUri.indexOf('?') > 0 ?'&' : '?') + querys 
			data = this.req.__post; 
            }
        var api = this.getApi(remoteUri , reqAct , method ,rawData);
        return function(evt,passData){
             api(evt , passData||data);
              }
        
        },
    listenTo : function(toCallMethod , groupName) {
		return false;
		/*
        var mSelf = this;
        if (!this.eventGName && groupName) {
            this.eventGName = groupName;
            }
        if (!groupName) {groupName = this.eventGName;}
        return function (){
            var args = Array.prototype.splice.call(arguments , 0);
            mSelf.eventHandle.listenOnSync( toCallMethod , groupName,  args);
            return mSelf; 
            }
        */
        },
	debugSnake :function(opt){
		if ('php' in opt  && 'fake' in opt){
			var fake = {}
				,php = opt.php
			for (var k in opt.fake){
				if (! k in php) continue
				fake[php[k]] = opt.fake[k]
				}
			php = null
			opt.fake = fake
			delete opt.php
			}
		this.req.headers.snakeproxy = JSON.stringify(opt)
		},
	transCall : function(action , p , data, withPrelistens){
		if (!withPrelistens) this.eventHandle.listenStack = []
		this._prevData = data
		this[action](p ,data , true )
		},
	listenOn : function( toCallMethod , assignTag ){
        var mSelf = this;
        return function(){
            var args = Array.prototype.splice.call(arguments , 0);
            return mSelf.eventHandle.listenOn( toCallMethod , assignTag , args);
            }
        } ,
	listenOver : function(callBack , noPrepare){
        var mSelf = this;
		function printErr(err){
			writeRes(mSelf.res , 503 ,'error raised' , null , mSelf.req.url)
			var splitor = "\n--->\n"
			base.dataErrLog(splitor + new Date() 
			+ splitor + 'url:'+ mSelf.req.url 
			+ splitor + err.stack + "\n<---\n")
			
			}
		
		function cbk(data , err){
			if (!err){ 
				if (mSelf._prevData){
					data = base.array_merge(mSelf._prevData , data)
					delete mSelf._prevData
					}
				try {
					callBack.call(mSelf , data)
				}catch(err){
					printErr(err)
					}
			}else{
				printErr(err)
				}
			}

        //return this.eventHandle.listenOver(callBack,noPrepare) ;
        return this.eventHandle.listenOver(cbk,noPrepare) ;
    }
}
function setRnR (req ,res){


     this.req = req;
     this.res = res;
     this.__reqdata = ('GET' == this.req.method ) ? this.req.__get : base.array_merge({} ,this.req.__get , this.req.__post);
     this.__session = session.getHandler (req , res);
     var client_ip = req.headers['x-forwarded-for'] || req.headers['http_client_ip'] ||  req.headers['x-real-ip'] || req.connection.remoteAddress;

	 this.req.headers.clientIp = client_ip;
	 var notify = new events.EventEmitter
	 notify.setMaxListeners(100)
	 req.connection.on('close',function(){    
		notify.emit('abort')
		})
	 this.notify = notify
}
function checkdIllegal (hostPath){
	/*debug mode*/
	if (config.etc.watchingTpl) return true
	/*anti spam*/

	if ('side.com/' != hostPath) return true
	if ('Zabbix-SIDE (SIDE monitor system)' ==  this.req.headers['user-agent'])	return true

	var refer = this.req.headers.referer
		,reqUrl = this.req.url
	if (/^\/a(j|w|jax)\//i.test(reqUrl) && (!refer || -1 == refer.indexOf('side.com') || !this.isTokenLive(30) )) {
		writeRes(this.res , 461 , '{status:-21}')
		return false
		}
	return true
 }

/*
*ajax桥
* @param string php uri
* @param function
* @param string GET|POST
*/
function ajaxTo(url, callBack , method){
	 //base.loadModel('side/application.js').getGlobalKey(this.req ,this.res)
     if (!callBack ) {
		var res = this.res
			,req = this.req
		var appMod = base.loadModel('side/application.js')
		var token = appMod.genToken('this.req.headers.clientIp')
        callBack = function(data , res_state){ 
			 var status =   false === data ?400: 200
			 if (4000 <= res_state)  status = res_state

			 if (false === data) data = ''
			 else if ( 'string' != typeof url) data = JSON.stringify(data)
			 else data += ''
			 
		
			 writeRes(res , status , data ,{'Content-Type': 'text/plain'
                                        ,'Cache-Control': 'no-cache,no-store'
                                        ,'nt': token 
                                        ,'service' :ServerHead })
			 base.accessLog(status, req , new Date - req.__request_time)
             }
         }

    if (config.api.spamhost && !req.__get.callback && 'string' == typeof url) {
    	url = {
    		'oragin' : url
    	}
    	var tempCbk = callBack;
        callBack = function(data) {
            tempCbk(data.oragin)
        }
    }

	if ( 'string' == typeof url){
		var php = this.bridge(url,undefined , method , true);
		if (req.__get.callback) {	//for jsonp
			var cbk = callBack;
			callBack = function(data) {
				data = req.__get.callback + '(' + data + ')';
				cbk(data);
			}
		}
		php(callBack);
	}else {
		this.bridgeMuch(url);
		require(config.path.base + 'webSpam.js').init(this);
		this.listenOver(callBack,true);
		}
    }

function readData (key , dataSource, defaultV){
	if (dataSource == null || base.isUnDefined(dataSource)) {
		dataSource = this.__reqdata;
	}	
	if (base.isUnDefined(defaultV) ){
		 defaultV = ''; 
	}
	var ret = dataSource[key];
	if ( base.isUnDefined(ret) ){
		 ret = defaultV; 
	}
	return ret;
	
}
function render(tplName , data , callBack){
	//var tplName = config.path.views + this.appPath + tplName;
    // var st = new Date;
	if (this.req.__get['__pd__']){
		//show snake data  
		var now = new Date()
		if ( this.req.__get['__pd__'] == '/rb/' + (now.getMonth() + now.getDate() + 1)){
			writeRes(this.res , 200 ,JSON.stringify(data) )
			base.accessLog(201, this.req , 'data debug')
			return	
			}
		}
    var self = this
	if ('function' != typeof callBack){
		var res = this.res
			,req = this.req
		callBack = function(err , html){
                if (html) {
					//html += '<script>var l={};l.req=' + req.__request_time.getTime() + ';l.h=' + (new Date).getTime()+ '</script>'
					writeRes(res , 200 , html , {'Content-Type': 'text/html;charset=utf-8' , 'Cache-Control': 'no-cache,no-store' ,'service' :ServerHead} , req.url)
                }else{
					writeRes(res , 503 ,'error raised' , null , req.url)
                    }
				base.accessLog(html?200 : 503, req , new Date - req.__request_time)
			}
		}
        var tplPre = tplPreCache[this.appPath] || (tplPreCache[this.appPath] = this.appPath.replace('/','') ); 
		if (!data) data = {};
        ['_JSLinks' , '_CSSLinks' ,'_JSstack' , '_CSSstack'].map(function(item){
				if (!data.hasOwnProperty(item)) data[item] = []; 
            });
		data['_JSmods'] = []; 
		data['_JSmodsFast'] = []; 
		data['_Request_query'] = this.req.__get;
		data['_Request_cookies'] = this.req.__cookies;
		data['_Request_raw'] = {'url': this.req.url 
							, 'dataSouce' : this.req.dataSource||{}
							,'query' : this.req.__get};
		var tplPath = config.path.views + this.appPath;
        est.renderFile(tplPath ,tplName , data , callBack , tplPre );
        //jst.renderFile(tplName, data , callBack );

}
function index(){
	this.res.end('index page');
}

exports.__create = function (mod , extFn){
	util.inherits(mod, Controller);
	if (extFn ) { 
		for (var k in extFn) 
		mod.prototype[k] = extFn[k];
		}
			
	return function(modName, appPath){
		modObj =  new mod;	

        modObj.eventname = modName;
        modObj.appPath = appPath;
        //modObj.eventHandle = eventLib.__create(modName ,siteInfo);
        modObj.eventHandle = eventLib.__create();

		return modObj;
		/*
		var modObj = base.inherit(mod , Controller);
        modObj.eventname = modName;
        modObj.appPath = appPath;
        modObj.eventHandle = require(config.path.base + 'evtlistener.js').__create(modName ,siteInfo);
        
		return mod.call(modObj );
		*/
	}
}
