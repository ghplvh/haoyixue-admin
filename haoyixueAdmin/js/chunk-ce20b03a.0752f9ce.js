(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ce20b03a"],{1276:function(t,e,a){"use strict";var n=a("d784"),i=a("44e7"),r=a("825a"),s=a("1d80"),o=a("4840"),l=a("8aa5"),c=a("50c4"),u=a("14c3"),d=a("9263"),p=a("d039"),m=[].push,f=Math.min,g=4294967295,v=!p((function(){return!RegExp(g,"y")}));n("split",2,(function(t,e,a){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,a){var n=String(s(this)),r=void 0===a?g:a>>>0;if(0===r)return[];if(void 0===t)return[n];if(!i(t))return e.call(n,t,r);var o,l,c,u=[],p=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),f=0,v=new RegExp(t.source,p+"g");while(o=d.call(v,n)){if(l=v.lastIndex,l>f&&(u.push(n.slice(f,o.index)),o.length>1&&o.index<n.length&&m.apply(u,o.slice(1)),c=o[0].length,f=l,u.length>=r))break;v.lastIndex===o.index&&v.lastIndex++}return f===n.length?!c&&v.test("")||u.push(""):u.push(n.slice(f)),u.length>r?u.slice(0,r):u}:"0".split(void 0,0).length?function(t,a){return void 0===t&&0===a?[]:e.call(this,t,a)}:e,[function(e,a){var i=s(this),r=void 0==e?void 0:e[t];return void 0!==r?r.call(e,i,a):n.call(String(i),e,a)},function(t,i){var s=a(n,t,this,i,n!==e);if(s.done)return s.value;var d=r(t),p=String(this),m=o(d,RegExp),h=d.unicode,b=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(v?"y":"g"),w=new m(v?d:"^(?:"+d.source+")",b),y=void 0===i?g:i>>>0;if(0===y)return[];if(0===p.length)return null===u(w,p)?[p]:[];var _=0,x=0,k=[];while(x<p.length){w.lastIndex=v?x:0;var C,F=u(w,v?p:p.slice(x));if(null===F||(C=f(c(w.lastIndex+(v?0:x)),p.length))===_)x=l(p,x,h);else{if(k.push(p.slice(_,x)),k.length===y)return k;for(var S=1;S<=F.length-1;S++)if(k.push(F[S]),k.length===y)return k;x=_=C}}return k.push(p.slice(_)),k}]}),!v)},1318:function(t,e,a){},"37df":function(t,e,a){},"45eb":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{margin:"-24px -24px 0px"}},[a("page-header",{attrs:{breadcrumb:t.breadcrumb,title:t.title,logo:t.logo,avatar:t.avatar}},[t._t("action",null,{slot:"action"}),t._t("headerContent",null,{slot:"content"}),!this.$slots.headerContent&&t.desc?a("div",{attrs:{slot:"content"},slot:"content"},[a("p",{staticStyle:{"font-size":"14px","line-height":"1.5",color:"rgba(0,0,0,.65)"}},[t._v(" "+t._s(t.desc)+" ")]),a("div",{staticClass:"link"},[t._l(t.linkList,(function(e,n){return[a("a",{key:n,attrs:{href:e.href}},[a("a-icon",{attrs:{type:e.icon}}),t._v(t._s(e.title))],1)]}))],2)]):t._e(),t._t("extra",null,{slot:"extra"})],2),a("div",{ref:"page",class:["page-content",t.layout]},[t._t("default")],2)],1)},i=[],r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-header"},[a("div",{class:["page-header-wide",t.layout]},[a("div",{staticClass:"breadcrumb"},[a("a-breadcrumb",t._l(t.breadcrumb,(function(e,n){return a("a-breadcrumb-item",{key:e.path},[a("span",0===n?[a("a",{attrs:{href:"#"}},[t._v(t._s(e.name))])]:[t._v(t._s(e.name))])])})),1)],1),a("div",{staticClass:"detail"},[t.avatar?a("div",{staticClass:"avatar"},[a("a-avatar",{attrs:{src:t.avatar}})],1):t._e(),a("div",{staticClass:"main"},[a("div",{staticClass:"row"},[t.logo?a("img",{staticClass:"logo",attrs:{src:t.logo}}):t._e(),t.title?a("h1",{staticClass:"title"},[t._v(t._s(t.title))]):t._e(),a("div",{staticClass:"action"},[t._t("action")],2)]),a("div",{staticClass:"row"},[this.$slots.content?a("div",{staticClass:"content"},[t._t("content")],2):t._e(),this.$slots.extra?a("div",{staticClass:"extra"},[t._t("extra")],2):t._e()])])])])])},s=[],o={name:"PageHeader",props:{title:{type:String,required:!1},breadcrumb:{type:Array,required:!1},logo:{type:String,required:!1},avatar:{type:String,required:!1}},computed:{layout:function(){return this.$store.state.setting.layout}}},l=o,c=(a("f010"),a("2877")),u=Object(c["a"])(l,r,s,!1,null,"ecb806fe",null),d=u.exports,p={name:"PageLayout",components:{PageHeader:d},props:{desc:{type:String,default:""},logo:{type:String},title:{type:String,default:""},avatar:{type:String},linkList:{type:Array},extraImage:{type:String}},data:function(){return{breadcrumb:[]}},computed:{layout:function(){return this.$store.state.setting.layout}},mounted:function(){this.getBreadcrumb()},updated:function(){this.getBreadcrumb()},methods:{getBreadcrumb:function(){this.breadcrumb=this.$route.matched}}},m=p,f=(a("d2e6"),Object(c["a"])(m,n,i,!1,null,"90fa1ce6",null));e["a"]=f.exports},"4f4b":function(t,e,a){"use strict";var n=a("37df"),i=a.n(n);i.a},6659:function(t,e,a){},8587:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("page-layout",{attrs:{id:"news"}},[a("div",{staticClass:"extraImg",attrs:{slot:"extra"},slot:"extra"},[a("img",{attrs:{src:t.setting.extraImage}})]),a("transition",{attrs:{name:"page-toggle"}},[a("keep-alive",[a("a-card",{staticClass:"content"},[a("a-button",{attrs:{type:"primary"},on:{click:t.onAdd}},[t._v(" 新增Banner ")]),a("a-table",{staticClass:"table",attrs:{columns:t.table.columns,dataSource:t.table.bannerList,rowKey:"id",bordered:"",loading:t.table.isLoading},scopedSlots:t._u([{key:"operation",fn:function(e,n){return[a("div",{staticClass:"editable-row-operations"},[a("span",[a("a",{staticStyle:{color:"#f5222d"},on:{click:function(){return t.onDelete(n.id)}}},[t._v("删除")])])])]}},{key:"pic_url",fn:function(e,n){return[a("img",{staticClass:"table-pics",attrs:{src:n.pic_url&&n.pic_url.split(";")[0]||"",alt:"图裂了"},on:{click:function(e){return t.onTablePreview(n.pic_url)}}})]}}])})],1)],1)],1),a("a-modal",{staticClass:"add-modal",attrs:{visible:t.addForm.isVisible,title:"新增Banner",okText:"确定",cancelText:"取消",okButtonProps:{props:{loading:t.addForm.isLoading}}},on:{cancel:t.cancelAdd,ok:t.saveAdd}},[a("a-form",{attrs:{layout:"vertical",form:t.addForm.form}},[a("a-form-item",{attrs:{label:"跳转链接"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["jump_url",{rules:[{required:!0,message:"请填写跳转链接"}]}],expression:"[\n                  'jump_url',\n                  {\n                    rules: [\n                      {\n                        required: true,\n                        message: '请填写跳转链接'\n                      }\n                    ]\n                  }\n                ]"}],attrs:{autoFocus:""}})],1),a("a-form-item",{attrs:{label:"跳转动作"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["jump_action",{rules:[{required:!0,message:"请填写跳转动作"}]}],expression:"[\n                  'jump_action',\n                  {\n                    rules: [\n                      {\n                        required: true,\n                        message: '请填写跳转动作'\n                      }\n                    ]\n                  }\n                ]"}],attrs:{autoFocus:""}})],1),a("a-form-item",{attrs:{label:"Banner图片"}},[a("div",[a("a-upload",{attrs:{action:t.addForm.action,listType:"picture-card",data:t.addForm.data,fileList:t.addForm.fileList,beforeUpload:t.beforeUpload,remove:t.onFileRemove},on:{preview:t.onUploadPreview}},[a("div",{attrs:{id:"dev"}},[a("a-icon",{attrs:{type:"plus"}}),a("div",{staticClass:"ant-upload-text"},[t._v("上传")])],1)])],1)])],1)],1),a("a-modal",{attrs:{visible:t.addForm.isPreviewVisible,footer:null,width:1080},on:{cancel:t.onPreviewCancel}},[a("img",{attrs:{alt:"图裂了",src:t.addForm.previewImage}})]),a("a-modal",{attrs:{visible:t.table.isPreviewVisible,footer:null,width:1080},on:{cancel:function(e){t.table.isPreviewVisible=!1}}},[a("a-carousel",{attrs:{arrows:"",dotsClass:"slick-dots slick-thumb"},scopedSlots:t._u([{key:"customPaging",fn:function(e){return a("a",{},[a("img",{attrs:{src:t.table.previewImage[e.i]}})])}}])},t._l(t.table.previewImage,(function(t,e){return a("div",{key:e},[a("img",{attrs:{src:t}})])})),0)],1)],1)},i=[],r=(a("99af"),a("4de4"),a("b0c0"),a("d3b7"),a("ac1f"),a("1276"),a("284c")),s=(a("96cf"),a("45eb")),o={name:"QueryList",components:{PageLayout:s["a"]},data:function(){return{setting:{extraImage:""},addForm:{form:this.$form.createForm(this,{name:"addForm"}),action:"https://upload.qiniup.com",data:{token:""},fileList:[],isVisible:!1,isLoading:!1,isPreviewVisible:!1,previewImage:""},table:{bannerList:[],isLoading:!1,previewImage:[],isPreviewVisible:!1,columns:[{title:"ID",dataIndex:"id",scopedSlots:{customRender:"id"},align:"center"},{title:"跳转链接",dataIndex:"jump_url",scopedSlots:{customRender:"jump_url"}},{title:"跳转动作",dataIndex:"jump_action",scopedSlots:{customRender:"jump_action"}},{title:"banner图片",align:"center",dataIndex:"pic_url",scopedSlots:{customRender:"pic_url"}},{title:"TYPE",dataIndex:"type",scopedSlots:{customRender:"type"},align:"center"},{title:"操作",dataIndex:"operation",scopedSlots:{customRender:"operation"},align:"center"}]}}},methods:{onDelete:function(t){this.$info({title:"此功能还未启用",onOk:function(){}})},onAdd:function(){this.addForm.isVisible=!0},saveAdd:function(){this.$info({title:"此功能还未启用",onOk:function(){}})},cancelAdd:function(){this.addForm.isVisible=!1},onUpload:function(t){this.imgUpload(t)},onFileRemove:function(t){var e=this.addForm.fileList.filter((function(e){return e.uid!==t.uid}));this.addForm.fileList=e},beforeUpload:function(t){return this.onUpload(t),!1},onUploadPreview:function(t){this.addForm.previewImage=t.url||t.thumbUrl,this.addForm.isPreviewVisible=!0},onPreviewCancel:function(){this.addForm.isPreviewVisible=!1},onTablePreview:function(t){var e=t.split(";");this.table.previewImage=e,this.table.isPreviewVisible=!0},imgUpload:function(t){var e,a=this;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return e=new FormData,e.append("token",this.addForm.data.token),e.append("file",t),n.next=5,regeneratorRuntime.awrap(this.$api.imgUpload(e).then((function(e){966!==e.code&&(t.url="http://user.duchengedu.com/".concat(e.key,"?attname=").concat(t.name),t.status="done",a.addForm.fileList=[].concat(Object(r["a"])(a.addForm.fileList),[t]))})));case 5:case"end":return n.stop()}}),null,this)},getUploadToken:function(){var t=this;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:this.$api.getUploadToken().then((function(e){var a;1===e.code&&e.data&&(t.addForm.data.token=(null===e||void 0===e?void 0:null===(a=e.data)||void 0===a?void 0:a.token)||"")}));case 1:case"end":return e.stop()}}),null,this)},getHomeBanner:function(){var t=this;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return this.table.isLoading=!0,this.table.bannerList=[],e.next=4,regeneratorRuntime.awrap(this.$api.getHomeBanner({}).then((function(e){1===e.code&&e.data&&(t.table.bannerList=e.data)})));case 4:this.table.isLoading=!1;case 5:case"end":return e.stop()}}),null,this)},initData:function(){return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,regeneratorRuntime.awrap(this.getUploadToken());case 2:this.getHomeBanner();case 3:case"end":return t.stop()}}),null,this)}},created:function(){return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:return this.$npStart(),t.next=3,regeneratorRuntime.awrap(this.initData());case 3:this.$npDone();case 4:case"end":return t.stop()}}),null,this)}},l=o,c=(a("8782"),a("4f4b"),a("ec44"),a("2877")),u=Object(c["a"])(l,n,i,!1,null,"88899e56",null);e["default"]=u.exports},8782:function(t,e,a){"use strict";var n=a("1318"),i=a.n(n);i.a},d2e6:function(t,e,a){"use strict";var n=a("e675"),i=a.n(n);i.a},e181:function(t,e,a){},e675:function(t,e,a){},ec44:function(t,e,a){"use strict";var n=a("6659"),i=a.n(n);i.a},f010:function(t,e,a){"use strict";var n=a("e181"),i=a.n(n);i.a}}]);
//# sourceMappingURL=chunk-ce20b03a.0752f9ce.js.map