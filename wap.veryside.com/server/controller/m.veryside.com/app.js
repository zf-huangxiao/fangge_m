function app(){
    return this;
}
var controlFns = {
    index : function(){
        var mSelf = this;
        this.content();
    },
    content : function(arg){
        //var page = this.readData('page',this.req.__get, 0)||0;
        var php = {
            'indexlist' : 'store::/site/index',
            'filterlist' : 'store::/topic/index',
            'seo':'store::/site/public?type=1',
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){


            //seo信息
            data._seo = data.seo;

            data.condition = this.req.__get;
            //console.log(data.condition);

            // data.status = 'welcome';

            data._CSSLinks = ['h5/css/app'];
            data._JSLinks  = ['h5/min/app'];
            data.pageTitle = '下载';
            mSelf.render('app/app.html', data);
        });
    },
    index_apis: function(params){
        // var php = {
        //     'indexloadlist' : 'store::/site/list'
        //
        // };
        // this.ajaxTo(php[params]);
    }
};
exports.__create = controller.__create(app , controlFns);
