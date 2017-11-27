function us(){
    return this;
}
var controlFns = {
    index : function(){
        var mSelf = this;
        this.feedback();
    },
    feedback : function(arg){
        //var page = this.readData('page',this.req.__get, 0)||0;
        var php = {
            'indexlist' : 'store::/site/index',
            'filterlist' : 'store::/topic/index',
            'seo':'store::/site/public?type=5'
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

            data._CSSLinks = ['h5/css/feedback'];
            data._JSLinks  = ['h5/min/feedback'];
            data.pageTitle = '反馈';
            mSelf.render('us/feedback.html', data);
        });
    },
    index_apis: function(params){
        var php = {
            'indexloadlist' : 'store::/site/advise',
        };
        this.ajaxTo(php[params]);
    }
};
exports.__create = controller.__create(us , controlFns);
