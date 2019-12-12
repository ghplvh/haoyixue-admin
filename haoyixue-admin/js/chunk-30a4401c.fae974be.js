(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-30a4401c"],{"20f3":function(t,e,a){"use strict";var r=a("88f1"),i=a.n(r);i.a},"45eb":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{margin:"-24px -24px 0px"}},[a("page-header",{attrs:{breadcrumb:t.breadcrumb,title:t.title,logo:t.logo,avatar:t.avatar}},[t._t("action",null,{slot:"action"}),t._t("headerContent",null,{slot:"content"}),!this.$slots.headerContent&&t.desc?a("div",{attrs:{slot:"content"},slot:"content"},[a("p",{staticStyle:{"font-size":"14px","line-height":"1.5",color:"rgba(0,0,0,.65)"}},[t._v(" "+t._s(t.desc)+" ")]),a("div",{staticClass:"link"},[t._l(t.linkList,(function(e,r){return[a("a",{key:r,attrs:{href:e.href}},[a("a-icon",{attrs:{type:e.icon}}),t._v(t._s(e.title))],1)]}))],2)]):t._e(),t._t("extra",null,{slot:"extra"})],2),a("div",{ref:"page",class:["page-content",t.layout]},[t._t("default")],2)],1)},i=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-header"},[a("div",{class:["page-header-wide",t.layout]},[a("div",{staticClass:"breadcrumb"},[a("a-breadcrumb",t._l(t.breadcrumb,(function(e,r){return a("a-breadcrumb-item",{key:e.path},[a("span",0===r?[a("a",{attrs:{href:"#"}},[t._v(t._s(e.name))])]:[t._v(t._s(e.name))])])})),1)],1),a("div",{staticClass:"detail"},[t.avatar?a("div",{staticClass:"avatar"},[a("a-avatar",{attrs:{src:t.avatar}})],1):t._e(),a("div",{staticClass:"main"},[a("div",{staticClass:"row"},[t.logo?a("img",{staticClass:"logo",attrs:{src:t.logo}}):t._e(),t.title?a("h1",{staticClass:"title"},[t._v(t._s(t.title))]):t._e(),a("div",{staticClass:"action"},[t._t("action")],2)]),a("div",{staticClass:"row"},[this.$slots.content?a("div",{staticClass:"content"},[t._t("content")],2):t._e(),this.$slots.extra?a("div",{staticClass:"extra"},[t._t("extra")],2):t._e()])])])])])},s=[],o={name:"PageHeader",props:{title:{type:String,required:!1},breadcrumb:{type:Array,required:!1},logo:{type:String,required:!1},avatar:{type:String,required:!1}},computed:{layout:function(){return this.$store.state.setting.layout}}},l=o,c=(a("f010"),a("2877")),d=Object(c["a"])(l,n,s,!1,null,"ecb806fe",null),u=d.exports,h={name:"PageLayout",components:{PageHeader:u},props:{desc:{type:String,default:""},logo:{type:String},title:{type:String,default:""},avatar:{type:String},linkList:{type:Array},extraImage:{type:String}},data:function(){return{breadcrumb:[]}},computed:{layout:function(){return this.$store.state.setting.layout}},mounted:function(){this.getBreadcrumb()},updated:function(){this.getBreadcrumb()},methods:{getBreadcrumb:function(){this.breadcrumb=this.$route.matched}}},m=h,g=(a("d2e6"),Object(c["a"])(m,r,i,!1,null,"90fa1ce6",null));e["a"]=g.exports},8328:function(t,e,a){},"84e0":function(t,e,a){"use strict";var r=a("8328"),i=a.n(r);i.a},"88f1":function(t,e,a){},9673:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("page-layout",{attrs:{desc:t.setting.desc,title:t.setting.title,linkList:t.setting.linkList,id:"bill-record"}},[a("div",{staticClass:"extraImg",attrs:{slot:"extra"},slot:"extra"},[a("img",{attrs:{src:t.setting.extraImage}})]),a("transition",{attrs:{name:"page-toggle"}},[a("keep-alive",[a("a-card",{staticClass:"content"},[a("a-form",{attrs:{form:t.searchForm.form,id:"search-form",layout:"inline"},on:{submit:t.onSearch}},[a("a-row",{attrs:{type:"flex",align:"middle"}},[a("a-col",[t.searchForm.schoolList.length>0?a("a-form-item",{attrs:{label:"学校"}},[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["schoolCode",{initialValue:t.searchForm.schoolCode,rules:[{required:!0,message:"请选择学校"}]}],expression:"[\n                            'schoolCode',\n                            {\n                              initialValue: searchForm.schoolCode,\n                              rules: [{ required: true, message: '请选择学校' }]\n                            }\n                          ]"}],attrs:{placeholder:"请选择学校",showArrow:""},on:{change:t.onSchoolChange}},t._l(t.searchForm.schoolList,(function(e,r){return a("a-select-option",{key:r,staticStyle:{width:"100px"},attrs:{title:e.schoolName,value:e.schoolCode}},[t._v(" "+t._s(e.schoolName)+" ")])})),1)],1):t._e()],1),a("a-col",[t.searchForm.billList.length>0?a("a-form-item",{attrs:{label:"项目"}},[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["billId",{initialValue:"全部",rules:[{required:!0,message:"请选择项目"}]}],expression:"[\n                            'billId',\n                            {\n                              initialValue: '全部',\n                              rules: [{ required: true, message: '请选择项目' }]\n                            }\n                          ]"}],attrs:{placeholder:"请选择项目",showArrow:""}},t._l(t.searchForm.billList,(function(e,r){return a("a-select-option",{key:r,staticStyle:{width:"100px"},attrs:{title:e.billName,value:e.id}},[t._v(" "+t._s(e.billName)+" ")])})),1)],1):t._e()],1),a("a-col",[t.searchForm.departmentList.length>0?a("a-form-item",{attrs:{label:"部门"}},[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["depart_name",{initialValue:"全部",rules:[{required:!0,message:"请选择部门"}]}],expression:"[\n                            'depart_name',\n                            {\n                              initialValue: '全部',\n                              rules: [{ required: true, message: '请选择部门' }]\n                            }\n                          ]"}],attrs:{placeholder:"请选择部门",showArrow:""}},t._l(t.searchForm.departmentList,(function(e,r){return a("a-select-option",{key:r,staticStyle:{width:"100px"},attrs:{title:e.depart_name,value:e.depart_name}},[t._v(" "+t._s(e.depart_name)+" ")])})),1)],1):t._e()],1),a("a-col",{staticStyle:{"flex-grow":"1"}},[a("a-form-item",[a("a-button",{attrs:{type:"primary","html-type":"submit",loading:t.searchForm.isLoading,disabled:t.searchForm.isLoading}},[t._v(" 查询 ")])],1)],1)],1)],1),a("a-table",{staticClass:"table",attrs:{id:"tabkle",columns:t.table.columns,dataSource:t.table.billList,rowKey:"id",bordered:"",pagination:t.table.pagination,loading:t.table.isLoading},on:{change:t.onPageChange},scopedSlots:t._u([t._l(["id","billId","orgNo","orgName","depart","studentName","contact","orderNo","payment","createTime"],(function(e){return{key:e,fn:function(r,i){return[a("div",{key:e},["payment"===e?[1===i.payment?[t._v(" 已付款 ")]:[t._v(" 未付款 ")]]:[t._v(t._s(r))]],2)]}}}))],null,!0)})],1)],1)],1)],1)},i=[],n=(a("99af"),a("4de4"),a("d3b7"),a("284c")),s=(a("96cf"),a("45eb")),o={name:"QueryList",components:{PageLayout:s["a"]},data:function(){return{setting:{title:"",desc:"",linkList:[],extraImage:""},searchForm:{form:this.$form.createForm(this,{name:"form"}),schoolList:[],schoolCode:"",billList:[],departmentList:[],isLoading:!1},table:{billList:[],cacheList:[],isLoading:!1,pagination:{total:0,current:1,pageSize:10},columns:[{title:"ID",dataIndex:"id",scopedSlots:{customRender:"id"},align:"center",width:80},{title:"项目ID",dataIndex:"billId",scopedSlots:{customRender:"billId"},align:"center",width:80},{title:"学校编号",dataIndex:"orgNo",scopedSlots:{customRender:"orgNo"},width:100},{title:"学校名称",dataIndex:"orgName",scopedSlots:{customRender:"orgName"},width:100},{title:"部门",dataIndex:"depart",scopedSlots:{customRender:"depart"},align:"center",width:80},{title:"被缴费人",dataIndex:"studentName",scopedSlots:{customRender:"studentName"},align:"center",width:100},{title:"联系电话",dataIndex:"contact",scopedSlots:{customRender:"contact"},align:"center",width:100},{title:"订单号",dataIndex:"orderNo",scopedSlots:{customRender:"orderNo"},align:"center",width:80},{title:"付款状态",dataIndex:"payment",scopedSlots:{customRender:"payment"},align:"center",width:100},{title:"缴费时间",dataIndex:"createTime",scopedSlots:{customRender:"createTime"},align:"center",width:180}]}}},methods:{onSearch:function(t){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return t&&t.preventDefault(),this.searchForm.isLoading=!0,this.table.pagination.current=1,e.next=5,regeneratorRuntime.awrap(this.getBillsBy());case 5:this.searchForm.isLoading=!1;case 6:case"end":return e.stop()}}),null,this)},onSchoolChange:function(t,e){this.searchForm.schoolCode=t,this.getBillConfigBy(),this.getSchoolDeparts()},onPageChange:function(t){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:this.table.pagination.current=t.current,this.getBillsBy();case 2:case"end":return e.stop()}}),null,this)},findSchoolList:function(){var t,e=this;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return t=this.$createElement,a.next=3,regeneratorRuntime.awrap(this.$api.findSchoolList().then((function(a){if(1===a.code&&a.data){var r;e.searchForm.schoolCode=(null===a||void 0===a?void 0:null===(r=a.data[0])||void 0===r?void 0:r.schoolCode)||"",e.searchForm.schoolList=a.data}else{e.searchForm.schoolList=[],e.searchForm.schoolCode="";var i=a.msg||a.message||"无反馈信息";e.$error({title:"错误",content:t("div",[t("p",["获取学校列表出错"]),t("p",["错误提示: ",i])])})}})));case 3:case"end":return a.stop()}}),null,this)},getBillConfigBy:function(){var t,e=this;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return t=this.$createElement,a.next=3,regeneratorRuntime.awrap(this.$api.getBillConfigBy({orgNo:this.searchForm.schoolCode,status:null}).then((function(a){if(1===a.code&&a.data){var r=[{billName:"全部",id:"全部"}];r=[].concat(Object(n["a"])(r),Object(n["a"])(a.data)),e.searchForm.billList=r}else{var i=a.msg||a.message||"无反馈信息";e.$error({title:"错误",content:t("div",[t("p",["获取缴费信息失败"]),t("p",["错误提示: ",i])])})}})));case 3:this.searchForm.form.setFieldsValue({billId:"全部"});case 4:case"end":return a.stop()}}),null,this)},getSchoolDeparts:function(){var t,e=this;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return t=this.$createElement,a.next=3,regeneratorRuntime.awrap(this.$api.getSchoolDeparts({schoolCode:this.searchForm.schoolCode}).then((function(a){if(1===a.code&&a.data){var r=[{depart_name:"全部"}];r=[].concat(Object(n["a"])(r),Object(n["a"])(a.data)),e.searchForm.departmentList=r}else{var i=a.msg||a.message||"无反馈信息";e.$error({title:"错误",content:t("div",[t("p",["获取部门失败"]),t("p",["错误提示: ",i])])})}})));case 3:this.searchForm.form.setFieldsValue({depart_name:"全部"});case 4:case"end":return a.stop()}}),null,this)},getBillsBy:function(){var t,e,a,r,i,n=this;return regeneratorRuntime.async((function(s){while(1)switch(s.prev=s.next){case 0:if(t=this.$createElement,this.table.isLoading=!0,this.table.billList=[],e={pageNum:this.table.pagination.current,pageSize:this.table.pagination.pageSize,orgNo:this.searchForm.schoolCode},this.searchForm.form.validateFields((function(t,r){a=t,e.billId="全部"===r.billId?null:r.billId,e.depart="全部"===r.depart_name?null:r.depart_name})),a){s.next=15;break}if(r=this.table.cacheList.filter((function(t){return t.pageNum===e.pageNum&&t.orgNo===e.orgNo&&t.billId===e.billId&&t.depart===e.depart})),!(r.length>0)){s.next=12;break}this.table.billList=r[0].list,this.table.pagination.total=r[0].total,s.next=15;break;case 12:return i={pageNum:e.pageNum,orgNo:e.orgNo,billId:e.billId,depart:e.depart},s.next=15,regeneratorRuntime.awrap(this.$api.getBillsBy(e).then((function(e){if(1===e.code&&e.data){var a,r;n.table.billList=(null===e||void 0===e?void 0:null===(a=e.data)||void 0===a?void 0:a.pageData)||[],n.table.pagination.total=(null===e||void 0===e?void 0:null===(r=e.data)||void 0===r?void 0:r.dataTotal)||10,i.list=e.data.pageData,i.total=e.data.dataTotal,n.table.cacheList.push(i)}else{var s=e.msg||e.message||"无反馈信息";n.$error({title:"错误",content:t("div",[t("p",["获取缴费列表失败"]),t("p",["错误提示: ",s])])})}})));case 15:this.table.isLoading=!1;case 16:case"end":return s.stop()}}),null,this)},initData:function(){return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,regeneratorRuntime.awrap(this.findSchoolList());case 2:return t.next=4,regeneratorRuntime.awrap(this.getBillConfigBy());case 4:return t.next=6,regeneratorRuntime.awrap(this.getSchoolDeparts());case 6:this.getBillsBy();case 7:case"end":return t.stop()}}),null,this)}},mounted:function(){this.initData()}},l=o,c=(a("20f3"),a("84e0"),a("2877")),d=Object(c["a"])(l,r,i,!1,null,"67efe718",null);e["default"]=d.exports},d2e6:function(t,e,a){"use strict";var r=a("e675"),i=a.n(r);i.a},e181:function(t,e,a){},e675:function(t,e,a){},f010:function(t,e,a){"use strict";var r=a("e181"),i=a.n(r);i.a}}]);
//# sourceMappingURL=chunk-30a4401c.fae974be.js.map