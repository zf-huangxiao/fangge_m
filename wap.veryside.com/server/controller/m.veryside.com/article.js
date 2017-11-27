function article(){
    return this;
}
var controlFns = {
    index : function(args){
        var mSelf = this;

        if(args && !isNaN(parseInt(args.split('.')[0]))){

            this.articlecontent(args);

        }else if(args.indexOf('picture_') != -1){

            this.photoview(args);

        }else if(args.indexOf('good_') != -1){

            this.photoviewgoods(args);

        }
        // else{
        //
        //     this.content();
        // }

    },
    content : function(arg){
        //var page = this.readData('page',this.req.__get, 0)||0;
        var php = {
            'indexlist' : 'store::/news/channel?id=2',
            'filterlist' : 'store::/topic/index'
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){


            //seo信息
            data._seo = data.indexlist.seo;

            data.condition = this.req.__get;
            //console.log(data.condition);

            data.status = 'jiepai';

            data._CSSLinks = ['h5/css/jiepai'];
            data._JSLinks  = ['h5/min/jiepai'];
            data.pageTitle = '街拍';
            mSelf.render('jiepai/index.html', data);
        });
    },
    articlecontent:function(args){
        var moji = this.readData('moji',this.req.__get, 0)||0;
        var hasParams = this.readData('from',this.req.__get, 0)||0;
        var php = {
            'filterlist' : 'store::/topic/index',
            'article' : 'store::/news/info?id='+args.split('.')[0]+'&moji='+moji,
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data._seo = data.article.seo;

            data.condition = this.req.__get;

            data._articleRoute = 'article';
            data._hasParams = hasParams;

            data.status = 'test';

            data._CSSLinks = ['h5/css/article'];
            data._JSLinks  = ['h5/min/article'];
            data.pageTitle = '文章内容';
            if(moji == 1) {
                mSelf.render('article/articleWeather.html', data)
            } else {
                mSelf.render('article/article.html', data)
            }
        });
    },

    photoview:function(args){

        var php = {
            'photolist' : 'store::/news/tu?id='+args.split('_')[1].split('.')[0]
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data._seo = data.photolist.seo;
            data._news = data.photolist.news;

            data.condition = this.req.__get;
            //console.log(data.condition);

            data.status = 'photoview';

            data._CSSLinks = ['h5/css/photoview'];
            data._JSLinks  = ['h5/min/photoview'];
            data.pageTitle = '图片预览';
            mSelf.render('photoview/picture.html', data);
        });
    },

    photoviewgoods:function(args){

        var php = {
            'photolist' : 'store::/news/good?id='+args.split('_')[1].split('.')[0]
        };
        var mSelf = this;
        this.setSDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

            data._seo = data.photolist.seo;
            data._news = data.photolist.news;

            data.condition = this.req.__get;

            data.status = 'photoviewgoods';

            data._CSSLinks = ['h5/css/photoview'];
            data._JSLinks  = ['h5/min/photoview'];
            data.pageTitle = '图片预览';
            mSelf.render('photoview/good.html', data);
        });
    },

    index_apis: function(params){
        var php = {
            'indexloadlist' : 'store::/news/channel?id=2',
            'itemlist_article' : 'store::/news/tu',
            'itemlist_good' : 'store::/news/good',
            'comment': 'store::/user/comment',
            'deletecomment': 'store::/user/del',
            'loadmorecomment':'store::/news/ajaxcomment',

        };
        this.ajaxTo(php[params]);
    }
};
exports.__create = controller.__create(article , controlFns);
