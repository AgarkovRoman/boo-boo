(this["webpackJsonpboo-boo"]=this["webpackJsonpboo-boo"]||[]).push([[0],{12:function(e,t,a){e.exports={mainWrapper:"mainStylesForPages_mainWrapper__3mJd3",header:"mainStylesForPages_header__2hgyn",main:"mainStylesForPages_main__2vKU-",formBox:"mainStylesForPages_formBox__jBbCe",title:"mainStylesForPages_title__10FUb",form:"mainStylesForPages_form__3dZ9o",button:"mainStylesForPages_button__1-rJd",footerParagraph:"mainStylesForPages_footerParagraph__35Iet",footerLink:"mainStylesForPages_footerLink__22M9p"}},17:function(e,t,a){e.exports={addTask:"AddTask_addTask__247g5",main:"AddTask_main__2suij",shallow:"AddTask_shallow__34SD6",plus:"AddTask_plus__29Hky",text:"AddTask_text__1pUs7",overlay:"AddTask_overlay__UCtHf",header:"AddTask_header__236mU",title:"AddTask_title__2fiTG",cancelX:"AddTask_cancelX__3IxMi",content:"AddTask_content__FA1wB",buttonCancel:"AddTask_buttonCancel__1OOQX",project:"AddTask_project__2R26n",date:"AddTask_date__3t2Yo",taskDateOverlay:"AddTask_taskDateOverlay__ipeCL",taskProjectOverlay:"AddTask_taskProjectOverlay__1hYjV"}},22:function(e,t,a){e.exports={homePageBody:"HomePage_homePageBody__1p_Dc",header:"HomePage_header__1uVwF",logo:"HomePage_logo__2WEGO",navList:"HomePage_navList__2XlV5",navListUl:"HomePage_navListUl__3uRyH",navListElement:"HomePage_navListElement__17SYm",navListElement__mainColored:"HomePage_navListElement__mainColored__3vGix",headerTitle:"HomePage_headerTitle__XTBKu",getStartedContainer:"HomePage_getStartedContainer__3opGX",getStarted:"HomePage_getStarted__1Hh2k",manImage:"HomePage_manImage__H5jcM"}},23:function(e,t,a){e.exports={sidebar:"Sidebar_sidebar__36giv",middle:"Sidebar_middle__gFftU",iconChevron:"Sidebar_iconChevron__3Ntzn",hiddenProject:"Sidebar_hiddenProject__3YLn0",generic:"Sidebar_generic__2XBE3",taskCounterContainer:"Sidebar_taskCounterContainer__1hy2o",active:"Sidebar_active__1PTZk",projects:"Sidebar_projects__RHQnX"}},30:function(e,t,a){e.exports={header:"Header_header__1xxN3",headerBtn:"Header_headerBtn__19mAz",navigation:"Header_navigation__15sPt",burger:"Header_burger__2VTYI",settings:"Header_settings__2Ks38",settingsItem:"Header_settingsItem__3fYSe"}},32:function(e,t,a){e.exports={taskDate:"TaskDate_taskDate__KR9yh",list:"TaskDate_list__1zvCm",listItem:"TaskDate_listItem__14yXg",listItemElement:"TaskDate_listItemElement__1OsMY"}},33:function(e,t,a){e.exports={project:"IndividualProject_project__VtYXr",active:"IndividualProject_active__24bEM",projectAction:"IndividualProject_projectAction__HEjJA",projectItem:"IndividualProject_projectItem__33dls",dot:"IndividualProject_dot__f2Vyn",delete:"IndividualProject_delete__3_0BF",deleteModal:"IndividualProject_deleteModal__1IO0J"}},34:function(e,t,a){e.exports={addProject:"AddProject_addProject__2SXrN",wrapper:"AddProject_wrapper__18Cve",plus:"AddProject_plus__oaKh0",text:"AddProject_text__2A1gh",input:"AddProject_input__3TzLa",name:"AddProject_name__3T6fm",buttons:"AddProject_buttons__gWQVT"}},41:function(e,t,a){e.exports={projectOverlay:"ProjectOverlay_projectOverlay__25B1U",overlayList:"ProjectOverlay_overlayList__1YEIh",listItem:"ProjectOverlay_listItem__qSwBX"}},42:function(e,t,a){e.exports={taskBody:"Task_taskBody__2pH5n",name:"Task_name__O7Lfi",kebab:"Task_kebab__wTaYh",modal:"Task_modal__y0O5W"}},47:function(e,t,a){e.exports={modal:"SmallModalWindow_modal__32f6t",title:"SmallModalWindow_title__2cOc8",buttons:"SmallModalWindow_buttons__2uVZn"}},48:function(e,t,a){e.exports={checkboxHolder:"Checkbox_checkboxHolder__WwdEp",checkbox:"Checkbox_checkbox__SJQ2s",checkboxChecked:"Checkbox_checkboxChecked__10OfZ"}},54:function(e,t,a){e.exports={mainBtn:"Button_mainBtn__IYNtc",primary:"Button_primary__CVuDV",transparent:"Button_transparent__3nKLn"}},59:function(e,t,a){e.exports={wrapper:"SignIn_wrapper__1xQ3y"}},61:function(e,t,a){e.exports={content:"Content_content__3Yreh"}},62:function(e,t,a){e.exports={counter:"TaskCounter_counter__hGZux"}},63:function(e,t,a){e.exports={wrapper:"SignUp_wrapper__2k8W1"}},69:function(e,t,a){},85:function(e,t,a){},86:function(e,t,a){"use strict";a.r(t);var n=a(3),c=a.n(n),r=a(44),s=a.n(r),o=(a(69),a(70),a(7)),i=a(8),d=a(24),l=a(14),u=a(46),j=a(59),b=a.n(j),O=a(12),m=a.n(O),h="/boo-boo",f="/app",p="/signup",x="/signin",_=a(6),k=a.n(_),v=a(11),y=a(5),g=a(60),N=(a(87),a(79),g.a.initializeApp({apiKey:"AIzaSyChqBDn0E3oHkpSERR9Wl3rCY2VG0HrdeE",authDomain:"superapp-3aa57.firebaseapp.com",databaseURL:"https://superapp-3aa57.firebaseio.com",projectId:"superapp-3aa57",storageBucket:"superapp-3aa57.appspot.com",messagingSenderId:"568179776426",appId:"1:568179776426:web:ae83f3b6b66636a7ade9d3",measurementId:"G-W79CJ8Y5MX"})),I=function(e){return N.auth().onAuthStateChanged(e)},w=function(e,t){return N.auth().signInWithEmailAndPassword(e,t)},S=function(){return N.auth().signOut()},C=function(e){return N.firestore().collection("users").add(Object(y.a)({},e))},T=function(e,t,a){return N.auth().createUserWithEmailAndPassword(e,t)},P=function(e){return N.firestore().collection("projects").where("userId","==",e).orderBy("projectId").get()},E=function(e){return N.firestore().collection("projects").add(Object(y.a)({},e))},D=function(e){return N.firestore().collection("projects").doc(e).delete()},A=function(e){return N.firestore().collection("tasks").where("userId","==",e).get()},Y=function(e){return N.firestore().collection("tasks").doc(e).update({archived:!0})},B=function(e){return N.firestore().collection("tasks").add(Object(y.a)({},e))},M=function(e){return N.firestore().collection("tasks").doc(e).delete()},L="SET_AUTH_USER_DATA",H="SIGN_OUT_USER",K={userId:"",userEmail:"",userName:""},U=function(e){var t=e.userId,a=e.userEmail,n=e.userName;return{type:L,payload:{userId:t,userEmail:a,userName:n}}},F=function(e){var t=e.userId,a=e.userEmail,n=e.userName;return{type:H,payload:{userId:t,userEmail:a,userName:n}}},X=function(){return function(){var e=Object(v.a)(k.a.mark((function e(t){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I((function(e){if(e){var a=e.uid,n=e.email,c=e.displayName;return t(U({userId:a,userEmail:n,userName:c})),e}return null}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},W=a.p+"static/media/logo.f91ee324.svg",R=a(22),J=a.n(R),V=a(2),Q=function(){return Object(V.jsx)(d.b,{to:h,children:Object(V.jsx)("img",{className:J.a.logo,src:W,alt:"Boo-Boo logo",height:"28",width:"120"})})},q=function(){return Object(n.useEffect)((function(){document.title="BOO\u2014BOO: Home"})),Object(V.jsx)("div",{className:m.a.mainWrapper,children:Object(V.jsxs)("div",{className:J.a.homePageBody,children:[Object(V.jsxs)("header",{className:J.a.header,children:[Object(V.jsx)(Q,{}),Object(V.jsx)("nav",{className:J.a.navList,children:Object(V.jsxs)("ul",{className:J.a.navListUl,children:[Object(V.jsx)("li",{className:J.a.navListElement,children:Object(V.jsx)(d.b,{to:x,children:"Sign In"})}),Object(V.jsx)("li",{className:"".concat(J.a.navListElement," ").concat(J.a.navListElement__mainColored),children:Object(V.jsx)(d.b,{to:p,children:"Sign Up"})})]})})]}),Object(V.jsxs)("div",{children:[Object(V.jsx)("h1",{className:J.a.headerTitle,children:"Keep an eye\n on your tasks."}),Object(V.jsx)("div",{className:J.a.getStartedContainer,children:Object(V.jsx)(d.b,{className:J.a.getStarted,to:x,children:"Get started"})})]}),Object(V.jsx)("div",{className:J.a.manImage})]})})},G=function(){return Object(V.jsx)("header",{className:m.a.header,children:Object(V.jsx)(Q,{})})},z=function(){var e=Object(u.a)(),t=e.register,a=e.handleSubmit,c=e.errors,r=Object(n.useState)(""),s=Object(i.a)(r,2),l=s[0],j=(s[1],Object(o.b)()),O=Object(n.useCallback)((function(e){return j((t=e.Email,a=e.Password,function(){var e=Object(v.a)(k.a.mark((function e(n){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(t,a).then((function(){n(X())})).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));var t,a}),[j]);return console.log("SignIn errors: ",c),Object(n.useEffect)((function(){document.title="BOO\u2014BOO: SignIn"})),Object(V.jsx)("div",{className:m.a.mainWrapper,children:Object(V.jsxs)("div",{className:b.a.wrapper,children:[Object(V.jsx)(G,{}),Object(V.jsx)("div",{className:m.a.main,children:Object(V.jsxs)("div",{className:m.a.formBox,children:[Object(V.jsx)("h3",{className:m.a.title,children:"Sign In"}),l,Object(V.jsxs)("form",{className:m.a.form,onSubmit:a(O),children:[Object(V.jsxs)("label",{className:m.a.label,children:["Email",Object(V.jsx)("input",{type:"text",placeholder:"Email",name:"Email",ref:t({required:!0,pattern:/^\S+@\S+$/i})})]}),Object(V.jsxs)("label",{className:m.a.label,children:["Password",Object(V.jsx)("input",{type:"password",placeholder:"Password",name:"Password",ref:t({required:!0,minLength:6})})]}),Object(V.jsx)("button",{className:m.a.button,"data-testid":"sign-in",type:"submit",children:"Sign In"})]}),Object(V.jsxs)("p",{className:m.a.footerParagraph,children:["Don't have an account yet?",Object(V.jsx)(d.b,{className:m.a.footerLink,to:p,children:"Sign up now"})]})]})})]})})},Z=a(61),$=a.n(Z),ee=a(25),te=a(45),ae=a(23),ne=a.n(ae),ce=a(88),re=a(33),se=a.n(re),oe="INBOX",ie="TODAY",de="NEXT_7",le=a(13),ue="SET_ACTIVE_PROJECT",je="SET_ALL_PROJECTS",be="ADD_PROJECT",Oe="DELETE_PROJECT",me={activeProject:oe,allProjects:[]},he=function(e){return{type:ue,payload:e}},fe=function(e){return{type:be,payload:e}},pe=function(e){return{type:Oe,payload:e}},xe=function(e){return function(){var t=Object(v.a)(k.a.mark((function t(a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,P(e).then((function(e){var t=e.docs.map((function(e){var t=e.data();return{userId:t.userId,projectId:e.id,name:t.name,docId:e.id}}));a({type:je,payload:t})}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},_e=function(e){return e.projects.activeProject},ke=function(e){return e.projects.allProjects},ve=a(47),ye=a.n(ve),ge=a(54),Ne=a.n(ge),Ie=function(e){var t=e.onClick,a=e.label,n=e.dataTestId,c=e.color;return Object(V.jsx)("button",{className:"".concat(Ne.a.mainBtn," ").concat(Ne.a[c]),type:"button",onClick:function(){return t()},"data-testid":n,children:a})},we=function(e){var t=e.description,a=e.deleteTask,n=e.onClose;return Object(V.jsxs)("div",{className:ye.a.modal,children:[Object(V.jsx)("p",{className:ye.a.title,children:t}),Object(V.jsxs)("div",{className:ye.a.buttons,children:[Object(V.jsx)(Ie,{onClick:function(){a()},label:"Delete",color:"primary"}),Object(V.jsx)(Ie,{onClick:function(){return n()},label:"Cancel",color:"transparent"})]})]})},Se=function(e){var t=e.project,a=Object(n.useState)(!1),c=Object(i.a)(a,2),r=c[0],s=c[1],d=Object(n.useRef)(null),l=Object(o.c)((function(e){return _e(e)})),u=Object(o.b)(),j=Object(n.useCallback)((function(e){return u(he(e))}),[u]),b=Object(n.useCallback)((function(e,t){return u(function(e,t){return function(){var a=Object(v.a)(k.a.mark((function a(n){return k.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n(pe(e)),a.next=3,D(e).then((function(){n(xe(t))}));case 3:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()}(e,t))}),[u]),O=function(){s(!r)};return function(e,t,a){var c=Object(n.useCallback)((function(t){e.current&&!e.current.contains(t.target)&&a()}),[a,e]);Object(n.useEffect)((function(){return t?document.addEventListener("mousedown",c):document.removeEventListener("mousedown",c),function(){document.removeEventListener("mousedown",c)}}),[t,c])}(d,r,O),Object(V.jsx)(V.Fragment,{children:Object(V.jsx)("li",{className:"".concat(se.a.project," ").concat(l===t.projectId?se.a.active:""),"data-testid":"project-action-parent",children:Object(V.jsxs)("div",{className:se.a.projectAction,children:[Object(V.jsxs)("div",{className:se.a.projectItem,"data-testid":"project-action","aria-label":"Select ".concat(t.name," as the task project"),role:"button","data-doc-id":t.docId,tabIndex:0,onClick:function(){j(t.projectId)},onKeyDown:function(e){"Enter"===e.key&&j(t.projectId)},children:[Object(V.jsx)("span",{className:se.a.dot,children:"\u2022"}),Object(V.jsx)("span",{children:t.name})]}),Object(V.jsxs)("div",{className:se.a.delete,"data-testid":"delete-project",onClick:function(){return O()},onKeyDown:function(e){"Enter"===e.key&&O()},tabIndex:0,role:"button","aria-label":"Confirm deletion of project",children:[Object(V.jsx)(te.e,{}),r&&Object(V.jsx)("div",{className:se.a.deleteModal,ref:d,children:Object(V.jsx)(we,{description:"Are you sure you want to delete this project?",deleteTask:function(){b(t.docId,t.userId),j(oe)},onClose:function(){return s(!1)}})})]})]})},t.projectId)})},Ce=function(){var e=Object(o.c)((function(e){return ke(e)}));return Object(V.jsx)(V.Fragment,{children:e&&e.map((function(e){return Object(V.jsx)(Se,{project:e},Object(ce.a)())}))})},Te=a(34),Pe=a.n(Te),Ee=function(e){var t=e.shouldShow,a=void 0!==t&&t,c=e.userId,r=Object(n.useState)(a),s=Object(i.a)(r,2),d=s[0],l=s[1],u=Object(n.useState)({name:"",userId:c,projectId:""}),j=Object(i.a)(u,2),b=j[0],O=j[1],m=Object(o.b)(),h=Object(ce.a)(),f=Object(n.useCallback)((function(e){return m(function(e){return function(){var t=Object(v.a)(k.a.mark((function t(a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a(fe(e)),t.next=3,E(Object(y.a)({},e)).then((function(){a(xe(e.userId))}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(e))}),[m]);return Object(V.jsxs)("div",{className:Pe.a.wrapper,"data-testid":"add-project",children:[!d&&Object(V.jsxs)("div",{className:Pe.a.addProject,"aria-label":"Add Project","data-testid":"add-project-action",onClick:function(){return l(!0)},onKeyDown:function(e){"Enter"===e.key&&l(!0)},role:"button",tabIndex:0,children:[Object(V.jsx)("span",{className:Pe.a.plus,children:Object(V.jsx)(te.a,{})}),Object(V.jsx)("span",{className:Pe.a.text,children:"Add Project"})]}),d&&Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)("div",{className:Pe.a.input,"data-testid":"add-project-inner",children:Object(V.jsx)("input",{value:b.name,onChange:function(e){return O(Object(y.a)(Object(y.a)({},b),{},{name:e.target.value}))},className:Pe.a.name,"data-testid":"project-name",type:"text",placeholder:"Name your project"})}),Object(V.jsxs)("div",{className:Pe.a.buttons,children:[Object(V.jsx)(Ie,{color:"primary",label:"Add Project",onClick:function(){return e=Object(y.a)(Object(y.a)({},b),{},{projectId:h}),f(e),O(Object(y.a)(Object(y.a)({},b),{},{name:""})),void l(!1);var e},dataTestId:"add-project-submit"}),Object(V.jsx)(Ie,{color:"transparent",label:"Cancel",onClick:function(){return l(!1)},dataTestId:"hide-project-overlay"})]})]})]})},De=a(62),Ae=a.n(De),Ye=function(e){var t=e.count;return Object(V.jsx)(V.Fragment,{children:t>0&&Object(V.jsx)("span",{className:Ae.a.counter,children:t})})},Be=a(31),Me=function(e){return e.tasks.allTasks},Le=Object(Be.a)(Me,(function(e){return e.filter((function(e){return!e.archived}))})),He=Object(Be.a)(Le,(function(e){return e.filter((function(e){return e.projectId===oe})).length})),Ke=Object(Be.a)(Le,(function(e){return e.filter((function(e){return e.projectId===ie})).length})),Ue=Object(Be.a)(Le,(function(e){return e.filter((function(e){return e.projectId===de})).length})),Fe={allTasks:[]},Xe="SET_TASKS",We="ADD_TASK",Re="ARCHIVED_TASK",Je="DELETE_TASK",Ve=function(e,t){return e.map((function(e){return e.id!==t?Object(y.a)({},e):Object(y.a)(Object(y.a)({},e),{},{archived:!0})}))},Qe=function(e){return{type:We,payload:e}},qe=function(e){return{type:Re,payload:e}},Ge=function(e){return{type:Je,payload:e}},ze=function(e){return function(){var t=Object(v.a)(k.a.mark((function t(a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,A(e).then((function(e){var t=e.docs.map((function(e){var t=e.data();return{task:t.task,createDate:t.createDate,date:t.date,archived:t.archived,userId:t.userId,projectId:t.projectId,id:e.id,docId:e.id}})).sort((function(e,t){return e.createDate-t.createDate}));a({type:Xe,payload:t})}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},Ze=function(e){var t=e.userId,a=Object(n.useState)(!0),c=Object(i.a)(a,2),r=c[0],s=c[1],d=Object(o.b)(),l=Object(n.useCallback)((function(){return d(xe(t))}),[d,t]),u=Object(n.useCallback)((function(){return d(ze(t))}),[d,t]),j=Object(n.useCallback)((function(e){return d(he(e))}),[d]),b=Object(n.useMemo)((function(){return He}),[]),O=Object(n.useMemo)((function(){return Ke}),[]),m=Object(n.useMemo)((function(){return Ue}),[]),h=Object(o.c)((function(e){return b(e)})),f=Object(o.c)((function(e){return O(e)})),p=Object(o.c)((function(e){return m(e)})),x=Object(o.c)((function(e){return _e(e)}));return Object(n.useEffect)((function(){l(),u()}),[d,l,u]),Object(V.jsxs)("div",{className:ne.a.sidebar,"data-testid":"sidebar",children:[Object(V.jsxs)("ul",{className:ne.a.generic,children:[Object(V.jsx)("li",{"data-testid":"inbox",className:x===oe?ne.a.active:"",children:Object(V.jsxs)("div",{"aria-label":"Show inbox tasks","data-testid":"inbox-action",onClick:function(){j(oe)},onKeyDown:function(e){"Enter"===e.key&&j(oe)},role:"button",tabIndex:0,children:[Object(V.jsx)("span",{children:Object(V.jsx)(ee.a,{})}),Object(V.jsx)("span",{children:"Inbox"}),Object(V.jsx)("span",{className:ne.a.taskCounterContainer,children:Object(V.jsx)(Ye,{count:h})})]})}),Object(V.jsx)("li",{"data-testid":"today",className:x===ie?ne.a.active:"",children:Object(V.jsx)("div",{"aria-label":"Show today`s tasks","data-testid":"today-action",onClick:function(){j(ie)},onKeyDown:function(e){"Enter"===e.key&&j(ie)},role:"button",tabIndex:0,children:Object(V.jsxs)("span",{children:[Object(V.jsx)("span",{children:Object(V.jsx)(ee.b,{})}),Object(V.jsx)("span",{children:"Today"}),Object(V.jsx)("span",{className:ne.a.taskCounterContainer,children:Object(V.jsx)(Ye,{count:f})})]})})}),Object(V.jsx)("li",{"data-testid":"next_7",className:x===de?ne.a.active:"",children:Object(V.jsxs)("div",{"aria-label":"Show tasks for the next 7 days","data-testid":"next_7-action",onClick:function(){j(de)},onKeyDown:function(e){"Enter"===e.key&&j(de)},role:"button",tabIndex:0,children:[Object(V.jsx)("span",{children:Object(V.jsx)(ee.c,{})}),Object(V.jsx)("span",{children:"Next 7 days"}),Object(V.jsx)("span",{className:ne.a.taskCounterContainer,children:Object(V.jsx)(Ye,{count:p})})]})})]}),Object(V.jsxs)("div",{className:ne.a.middle,onClick:function(){return s(!r)},onKeyDown:function(e){"Enter"===e.key&&s(!r)},"aria-label":"".concat(r?"Hide":"Show"," projects"),role:"button",tabIndex:0,children:[Object(V.jsx)("span",{className:ne.a.iconChevron,children:Object(V.jsx)(te.c,{className:r?"":ne.a.hiddenProject})}),Object(V.jsx)("h2",{children:"Projects"})]}),Object(V.jsx)("ul",{className:ne.a.projects,children:r&&Object(V.jsx)(Ce,{})}),r&&Object(V.jsx)(Ee,{userId:t})]})},$e=(a(85),[{key:"INBOX",name:"Inbox"},{key:"TODAY",name:"Today"},{key:"NEXT_7",name:"Next 7 Days"}]),et=function(e){return $e.find((function(t){return t.key===e}))},tt=a(29),at=a.n(tt),nt=a(17),ct=a.n(nt),rt=a(41),st=a.n(rt),ot=function(e){var t=e.setProject,a=e.showProjectOverlay,n=e.setShowProjectOverlay,c=Object(o.c)((function(e){return ke(e)}));return Object(V.jsx)(V.Fragment,{children:c&&a&&Object(V.jsx)("div",{className:st.a.projectOverlay,"data-testid":"project-overlay",children:Object(V.jsx)("ul",{className:st.a.overlayList,children:c.map((function(e){return Object(V.jsx)("li",{className:st.a.listItem,children:Object(V.jsx)("div",{className:st.a.listElement,"data-testid":"project-overlay-action",onClick:function(){t(e.projectId),n(!1)},onKeyDown:function(a){"Enter"===a.key&&(t(e.projectId),n(!1))},role:"button",tabIndex:0,"aria-label":"Select the task project",children:e.name})},e.projectId)}))})})})},it=a(32),dt=a.n(it),lt=function(e){var t=e.setShowTaskDate,a=e.setTaskDate,n=e.showTaskDate;return Object(V.jsx)(V.Fragment,{children:n&&Object(V.jsx)("div",{className:dt.a.taskDate,"data-testid":"task-date-overlay",children:Object(V.jsxs)("ul",{className:dt.a.list,children:[Object(V.jsx)("li",{className:dt.a.listItem,children:Object(V.jsxs)("div",{className:dt.a.listItemElement,"aria-label":"Select today as the task date",onClick:function(){t(!1),a(at()().format("DD/MM/YYYY"))},onKeyDown:function(e){"Enter"===e.key&&(t(!1),a(at()().format("DD/MM/YYYY")))},role:"button","data-testid":"task-date-today",tabIndex:0,children:[Object(V.jsx)("span",{children:Object(V.jsx)(ee.g,{})}),Object(V.jsx)("span",{children:"Today"})]})}),Object(V.jsx)("li",{className:dt.a.listItem,children:Object(V.jsxs)("div",{className:dt.a.listItemElement,"aria-label":"Select tomorrow as the task date",onClick:function(){t(!1),a(at()().add(1,"day").format("DD/MM/YYYY"))},onKeyDown:function(e){"Enter"===e.key&&(t(!1),a(at()().add(1,"day").format("DD/MM/YYYY")))},role:"button",tabIndex:0,"data-testid":"task-date-tomorrow",children:[Object(V.jsx)("span",{children:Object(V.jsx)(ee.h,{})}),Object(V.jsx)("span",{children:"Tomorrow"})]})}),Object(V.jsx)("li",{className:dt.a.listItem,children:Object(V.jsxs)("div",{className:dt.a.listItemElement,"aria-label":"Select next week as the task date",onClick:function(){t(!1),a(at()().add(7,"day").format("DD/MM/YYYY"))},onKeyDown:function(e){"Enter"===e.key&&(t(!1),a(at()().add(7,"day").format("DD/MM/YYYY")))},role:"button",tabIndex:0,"data-testid":"task-date-next-week",children:[Object(V.jsx)("span",{children:Object(V.jsx)(ee.e,{})}),Object(V.jsx)("span",{children:"Next week"})]})})]})})})},ut=function(e){var t=e.showAddTaskMain,a=void 0===t||t,c=e.showShouldMain,r=void 0!==c&&c,s=e.showQuickAddTask,d=void 0!==s&&s,l=e.setShowQuickAddTask,u=Object(n.useState)(""),j=Object(i.a)(u,2),b=j[0],O=j[1],m=Object(n.useState)(""),h=Object(i.a)(m,2),f=h[0],p=h[1],x=Object(n.useState)(""),_=Object(i.a)(x,2),y=_[0],g=_[1],N=Object(n.useState)(r),I=Object(i.a)(N,2),w=I[0],S=I[1],C=Object(n.useState)(!1),T=Object(i.a)(C,2),P=T[0],E=T[1],D=Object(n.useState)(!1),A=Object(i.a)(D,2),Y=A[0],M=A[1],L=Object(o.b)(),H=Object(o.c)((function(e){return _e(e)})),K=Object(o.c)((function(e){return function(e){return e.auth.userId}(e)})),U=Object(n.useCallback)((function(e){return L(function(e){return function(){var t=Object(v.a)(k.a.mark((function t(a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a(Qe(e)),t.next=3,B(e).then((function(){a(ze(e.userId))}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(e))}),[L]),F=function(){var e=y||H,t="";return"TODAY"===e?t=at()().format("DD/MM/YYYY"):"NEXT_7"===e&&(t=at()().add(7,"day").format("DD/MM/YYYY")),b&&e&&U({archived:!1,projectId:e,createDate:Date.now(),task:b,date:t||f,userId:K})};return Object(V.jsxs)("div",{className:d?ct.a.overlay:ct.a.addTask,"data-testid":"add-task-comp",children:[a&&!w&&Object(V.jsxs)("div",{className:ct.a.shallow,"data-testid":"show-main-action",onClick:function(){return S(!w)},onKeyDown:function(e){"Enter"===e.key&&S(!w)},tabIndex:0,"aria-label":"Add task",role:"button",children:[Object(V.jsx)("span",{className:ct.a.plus,children:Object(V.jsx)(te.a,{})}),Object(V.jsx)("span",{className:ct.a.text,children:"Add Task"})]}),(w||d)&&Object(V.jsxs)("div",{className:ct.a.main,"data-testid":"add-task-main",children:[void 0!==d&&void 0!==l&&Object(V.jsx)(V.Fragment,{children:Object(V.jsxs)("div",{"data-testid":"quick-add-task",children:[Object(V.jsx)("h2",{className:ct.a.title,children:"Quick Add Task"}),Object(V.jsx)("span",{className:ct.a.cancelX,"data-testid":"add-task-quick-cancel","aria-label":"Cancel adding task",onClick:function(){O(""),S(!1),E(!1),l(!1)},onKeyDown:function(e){"Enter"===e.key&&(O(""),S(!1),E(!1),l(!1))},tabIndex:0,role:"button",children:Object(V.jsx)(ee.f,{})})]})}),Object(V.jsx)("div",{className:ct.a.taskProjectOverlay,children:Object(V.jsx)(ot,{setProject:g,showProjectOverlay:P,setShowProjectOverlay:E})}),Object(V.jsx)("div",{className:ct.a.taskDateOverlay,children:Object(V.jsx)(lt,{setTaskDate:p,showTaskDate:Y,setShowTaskDate:M})}),Object(V.jsx)("input",{className:ct.a.content,"aria-label":"Enter your task","data-testid":"add-task-content",type:"text",value:b,onChange:function(e){return O(e.target.value)}}),Object(V.jsx)(Ie,{onClick:function(){return O(""),g(""),S(!1),E(!1),d&&l?F()&&l(!1):F()},label:"Add Task",color:"primary",dataTestId:"add-task"}),!d&&Object(V.jsx)("span",{className:ct.a.buttonCancel,children:Object(V.jsx)(Ie,{onClick:function(){O(""),S(!1),E(!1)},label:"Cancel",color:"transparent",dataTestId:"add-task-main-cancel"})}),Object(V.jsx)("span",{className:ct.a.project,"data-testid":"show-project-overlay",onClick:function(){return E(!P)},onKeyDown:function(e){"Enter"===e.key&&E(!P)},tabIndex:0,role:"button",children:Object(V.jsx)(ee.d,{})}),Object(V.jsx)("span",{className:ct.a.date,"data-testid":"show-task-date-overlay",onClick:function(){return M(!Y)},onKeyDown:function(e){"Enter"===e.key&&M(!Y)},tabIndex:0,role:"button",children:Object(V.jsx)(ee.c,{})})]})]})},jt=a(42),bt=a.n(jt),Ot=a(48),mt=a.n(Ot),ht=function(e){var t=e.id,a=e.taskDesc,c=Object(n.useState)(!1),r=Object(i.a)(c,2),s=r[0],d=r[1],l=Object(n.useState)(!1),u=Object(i.a)(l,2),j=u[0],b=u[1],O=Object(o.b)(),m=Object(n.useCallback)((function(e){return O(function(e){return function(){var t=Object(v.a)(k.a.mark((function t(a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Y(e);case 2:a(qe(e));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(e))}),[O]),h=function(e){b(!0),setTimeout((function(){return m(e)}),300)};return Object(V.jsx)("div",{className:mt.a.checkboxHolder,"data-testid":"checkbox-action",onClick:function(){return h(t)},onKeyDown:function(e){"Enter"===e.key&&h(t)},"aria-label":"Mark ".concat(a," as done?"),role:"button",tabIndex:0,children:Object(V.jsx)("span",{className:"".concat(mt.a.checkbox," ").concat(j&&mt.a.checkboxChecked),onMouseEnter:function(){return d(!0)},onMouseOver:function(){return d(!0)},onFocus:function(){return d(!0)},onMouseLeave:function(){return d(!1)},children:(s||j)&&Object(V.jsx)(te.b,{})})})},ft=function(e){var t=e.name,a=e.id,c=Object(n.useState)(!1),r=Object(i.a)(c,2),s=r[0],d=r[1],l=Object(o.b)(),u=Object(n.useCallback)((function(e){return l(function(e){return function(){var t=Object(v.a)(k.a.mark((function t(a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,M(e);case 2:a(Ge(e));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(e))}),[l]);return Object(V.jsx)(V.Fragment,{children:Object(V.jsxs)("li",{"data-testid":"task",children:[Object(V.jsxs)("div",{className:bt.a.taskBody,children:[Object(V.jsx)(ht,{id:a,taskDesc:t}),Object(V.jsx)("span",{className:bt.a.name,children:t})]}),Object(V.jsxs)("div",{className:bt.a.kebab,role:"button",tabIndex:0,"aria-label":"".concat(s?"Close":"Open",' delete task "').concat(t,'" modal?'),onClick:function(){return d(!s)},onKeyDown:function(e){"Enter"===e.key&&d(!s)},children:[Object(V.jsx)(te.e,{}),s&&Object(V.jsx)("div",{className:bt.a.modal,children:Object(V.jsx)(we,{description:"Are you sure you want to delete this task?",deleteTask:function(){return u(a)},onClose:function(){return d(!1)}})})]})]})})},pt=function(){var e,t=Object(o.c)((function(e){return _e(e)})),a=Object(o.c)((function(e){return ke(e)})),c=Object(o.c)((function(e){return Me(e)})),r=function(){var e="";return a&&a.length>0&&t&&!et(t)&&(e=function(e,t){var a=e.find((function(e){return e.projectId===t}));return void 0!==a?a.name:""}(a,t)),et(t)&&t&&(e=function(e,t){var a=e.find((function(e){return e.key===t}));return void 0!==a?a.name:""}($e,t)),e}(),s=(e=t,c.filter((function(t){return t.projectId===e&&!t.archived})));return Object(n.useEffect)((function(){document.title="BOO\u2014BOO: ".concat(r," tasks")}),[r]),Object(V.jsxs)("div",{className:"tasks","data-testid":"tasks",children:[Object(V.jsx)("h2",{"data-testid":"project-name",children:r}),s.length>0&&Object(V.jsx)("ul",{className:"tasks__list",children:s.map((function(e){return Object(V.jsx)(ft,{name:e.task,id:e.id},Object(ce.a)())}))}),Object(V.jsx)(ut,{}),0===s.length&&Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)("div",{className:"tasks__done"}),Object(V.jsx)("div",{className:"tasks__done-text","data-testid":"task-not-found",children:"All tasks are done! Nice work!"})]})]})},xt=function(e){var t=e.userId;return Object(V.jsxs)("section",{className:$.a.content,"data-testid":"content",children:[Object(V.jsx)(Ze,{userId:t}),Object(V.jsx)(pt,{})]})},_t=a(30),kt=a.n(_t),vt=function(e){e.darkMode,e.setDarkMode;var t=Object(n.useState)(!1),a=Object(i.a)(t,2),c=a[0],r=a[1],s=Object(n.useState)(!1),d=Object(i.a)(s,2),l=d[0],u=d[1],j=Object(o.b)(),b=Object(n.useCallback)((function(){return j(function(){var e=Object(v.a)(k.a.mark((function e(t){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S().then((function(){t(F({userId:"",userEmail:"",userName:""}))})).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[j]);return Object(V.jsxs)("header",{className:kt.a.header,"data-testid":"header",children:[Object(V.jsxs)("nav",{className:kt.a.navigation,children:[Object(V.jsx)("div",{className:kt.a.burger,"aria-label":"Close/Open sidebar",children:Object(V.jsx)("button",{className:kt.a.headerBtn,"data-testid":"Close/Open sidebar",type:"button",children:Object(V.jsx)(te.d,{})})}),Object(V.jsx)("div",{className:kt.a.settings,children:Object(V.jsxs)("ul",{children:[Object(V.jsx)("li",{"aria-label":"Quick add task",className:kt.a.settingsItem,children:Object(V.jsx)("button",{type:"button","data-testid":"quick-add-task-action",className:kt.a.headerBtn,onClick:function(){u(!0),r(!0)},children:Object(V.jsx)(te.a,{})})}),Object(V.jsx)("li",{"aria-label":"Sign out",className:kt.a.settingsItem,children:Object(V.jsx)("button",{type:"button",className:kt.a.headerBtn,"data-testid":"sign-out",onClick:b,children:Object(V.jsx)(te.f,{})})})]})})]}),Object(V.jsx)(ut,{showAddTaskMain:!1,showShouldMain:c,showQuickAddTask:l,setShowQuickAddTask:u})]})},yt=a(63),gt=a.n(yt),Nt=function(){var e=Object(u.a)(),t=e.register,a=e.handleSubmit,c=e.errors,r=Object(n.useState)(""),s=Object(i.a)(r,2),l=s[0],j=(s[1],Object(o.b)()),b=Object(n.useCallback)((function(e){return j((t=e.Email,a=e.Password,n=e.Name,function(){var e=Object(v.a)(k.a.mark((function e(c){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T(t,a,n).then((function(e){var a,c;return C({email:t,name:n,userId:null===(a=e.user)||void 0===a?void 0:a.uid}),null===(c=e.user)||void 0===c?void 0:c.updateProfile({displayName:n})})).then((function(){c(X())}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));var t,a,n}),[j]);return console.log("SignUp errors: ",c),Object(n.useEffect)((function(){document.title="BOO\u2014BOO: SignUp"})),Object(V.jsx)("div",{className:m.a.mainWrapper,children:Object(V.jsxs)("div",{className:gt.a.wrapper,children:[Object(V.jsx)(G,{}),Object(V.jsx)("div",{className:m.a.main,children:Object(V.jsxs)("div",{className:m.a.formBox,children:[Object(V.jsx)("h3",{className:m.a.title,children:"Sign Up"}),l,Object(V.jsxs)("form",{className:m.a.form,onSubmit:a(b),children:[Object(V.jsxs)("label",{children:["Name",Object(V.jsx)("input",{type:"text",placeholder:"Name",name:"Name",ref:t({required:!0})})]}),Object(V.jsxs)("label",{children:["Email",Object(V.jsx)("input",{type:"text",placeholder:"Email",name:"Email",ref:t({required:!0,pattern:/^\S+@\S+$/i})})]}),Object(V.jsxs)("label",{children:["Password",Object(V.jsx)("input",{type:"password",placeholder:"Password",name:"Password",ref:t({required:!0,minLength:6})})]}),Object(V.jsx)("button",{className:m.a.button,"data-testid":"sign-up",type:"submit",children:"Sign Up"})]}),Object(V.jsxs)("p",{className:m.a.footerParagraph,children:["Already have an account?",Object(V.jsx)(d.b,{className:m.a.footerLink,to:x,children:"Sign in now"})]})]})})]})})},It=a(55);function wt(e){var t=e.user,a=e.loggedInPath,n=e.children,c=Object(It.a)(e,["user","loggedInPath","children"]);return Object(V.jsx)(l.b,Object(y.a)(Object(y.a)({},c),{},{render:function(){return t?t?Object(V.jsx)(l.a,{to:{pathname:a}}):null:n}}))}function St(e){var t=e.user,a=e.children,n=Object(It.a)(e,["user","children"]);return Object(V.jsx)(l.b,Object(y.a)(Object(y.a)({},n),{},{render:function(e){var n=e.location;return t?a:t?null:Object(V.jsx)(l.a,{to:{pathname:x,state:{from:n}}})}}))}var Ct=function(){var e=Object(n.useState)(JSON.parse(localStorage.getItem("authUser"))),t=Object(i.a)(e,2),a=t[0],c=t[1],r=Object(o.b)(),s=function(e){e?(localStorage.setItem("authUser",JSON.stringify(e)),c(e)):(localStorage.removeItem("authUser"),c(null))};return Object(n.useEffect)((function(){var e=I(s);return r(X()),function(){return e()}}),[r]),{user:a}},Tt=function(){var e=Object(n.useState)(!1),t=Object(i.a)(e,2),a=t[0],c=t[1],r=Ct().user;return Object(V.jsx)(d.a,{children:Object(V.jsx)("main",{className:a?"darkmode":"","data-testid":"application",children:Object(V.jsxs)(l.d,{children:[Object(V.jsx)(wt,{user:r,loggedInPath:f,path:x,exact:!0,children:Object(V.jsx)(z,{})}),Object(V.jsx)(wt,{user:r,loggedInPath:f,path:p,exact:!0,children:Object(V.jsx)(Nt,{})}),Object(V.jsxs)(St,{user:r,path:f,exact:!0,children:[Object(V.jsx)(vt,{darkMode:a,setDarkMode:c}),Object(V.jsx)(xt,{userId:r&&r.uid&&r.uid})]}),Object(V.jsx)(wt,{user:r,loggedInPath:f,path:h,exact:!0,children:Object(V.jsx)(q,{})})]})})})},Pt=a(64),Et={auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case L:case H:return Object(y.a)(Object(y.a)({},e),t.payload);default:return e}},projects:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:me,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case ue:return Object(y.a)(Object(y.a)({},e),{},{activeProject:n});case je:return Object(y.a)(Object(y.a)({},e),{},{allProjects:n});case be:return Object(y.a)(Object(y.a)({},e),{},{allProjects:[].concat(Object(le.a)(e.allProjects),[n])});case Oe:return Object(y.a)(Object(y.a)({},e),{},{allProjects:e.allProjects.filter((function(e){return e.docId!==n}))});default:return e}},tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Fe,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case Xe:return Object(y.a)(Object(y.a)({},e),{},{allTasks:n});case We:return Object(y.a)(Object(y.a)({},e),{},{allTasks:[].concat(Object(le.a)(e.allTasks),[n])});case Re:return Object(y.a)(Object(y.a)({},e),{},{allTasks:Ve(e.allTasks,n)});case Je:return Object(y.a)(Object(y.a)({},e),{},{allTasks:e.allTasks.filter((function(e){return e.docId!==n}))});default:return e}}},Dt=Object(Pt.a)({reducer:Et}),At=function(){return Object(V.jsx)(o.a,{store:Dt,children:Object(V.jsx)(Tt,{})})},Yt=Object(n.createContext)(null);s.a.render(Object(V.jsx)(Yt.Provider,{value:{firebase:N},children:Object(V.jsx)(c.a.StrictMode,{children:Object(V.jsx)(At,{})})}),document.getElementById("root"))}},[[86,1,2]]]);
//# sourceMappingURL=main.2e61cb26.chunk.js.map