function us(){
    return this;
}
var controlFns = {
    index : function(){
        var mSelf = this;
        this.joinus();
    },
    joinus : function(arg){
        //var page = this.readData('page',this.req.__get, 0)||0;
        var php = {
            'indexlist' : 'store::/site/index',
            'filterlist' : 'store::/topic/index',
            'seo':'store::/site/public?type=4'
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data._seo=data.seo;
            data.condition = this.req.__get;
            //console.log(data.condition);

            data.status = 'test';
            data.groupPg = {};
            data.groupPg.total_num = 2000;
            //data.groupPg.page_size = 10;
            //data.groupPg.current_page = page;

            data._CSSLinks = ['h5/css/joinus'];
            data._JSLinks  = ['h5/min/joinus'];
            data.pageTitle = '作者招募';
            mSelf.render('us/joinus.html', data);
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
exports.__create = controller.__create(us , controlFns);
