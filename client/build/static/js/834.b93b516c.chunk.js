"use strict";(self.webpackChunkreservo_web=self.webpackChunkreservo_web||[]).push([[834],{1834:function(e,t,a){a.r(t),a.d(t,{default:function(){return N}});var n=a(2791),s=a(4165),r=a(7762),c=a(5861),i=a(9439),x=a(1243),m=a(8263),o=a(7692),l=a(184);var d=function(e){var t=(0,n.useState)(0),a=(0,i.Z)(t,2),r=a[0],d=a[1],u=localStorage.getItem("merch_id");(0,n.useEffect)((function(){h(e.year,e.month,e.day),setTimeout((function(){}),50)}),[e.year,e.month,e.day,window.location.pathname]);var h=function(){var t=(0,c.Z)((0,s.Z)().mark((function t(a,n,r){var c,i,o,l,h;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.setIsLoading(!0),t.prev=1,c=window.location.pathname.split("/"),i="%",t.t0=c[2],t.next="upcoming"===t.t0?7:"finished"===t.t0?9:11;break;case 7:return i="Ongoing%",t.abrupt("break",12);case 9:return i="Finished%",t.abrupt("break",12);case 11:return t.abrupt("break",12);case 12:o=String(a),l=String(n+1).padStart(2,"0"),h=String(r).padStart(2,"0"),x.Z.get("".concat(m.Z.API,"/reserve/retrievecountnparams"),{params:{cols:"res_date AS res_date, COUNT(*) as count",condition:"merchant_id = ".concat(u," AND status LIKE '").concat(i,"' AND res_date = '").concat(o,"-").concat(l,"-").concat(h,"' ")}}).then((function(t){d(t.data.data[0].count),e.setIsLoading(!1)})),t.next=20;break;case 18:t.prev=18,t.t1=t.catch(1);case 20:d(-1),e.setIsLoading(!1);case 22:case"end":return t.stop()}}),t,null,[[1,18]])})));return function(e,a,n){return t.apply(this,arguments)}}();return(0,l.jsx)("div",{children:(0,l.jsxs)("div",{onClick:function(){e.showReservations()},className:"border-b-slate-950 border-solid d-flex align-items-end justify-content-end",children:[(0,l.jsx)("p",{className:" text-right",children:e.day}),e.isLoading?(0,l.jsx)("p",{className:"text-center",children:"..."}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:"flex justify-center duration-200 items-center w-[3.0rem] h-[3.0rem] rounded-full xs:max-sm:w-[1.5rem] xs:max-sm:h-[1.5rem] xs:max-sm:hidden xl:max-2xl:w-[1.5rem] xl:max-2xl:h-[1.5rem]\n          ".concat(r>0?"bg-yellow-400 hover:bg-yellow-300":""),children:r>0?(0,l.jsx)(o.wTD,{className:"xs:max-sm:hidden"}):(0,l.jsx)(l.Fragment,{})}),r>0?(0,l.jsx)("div",{className:"relative duration-200 items-center w-[1.5rem] h-[1.5rem] mt-[-3.7rem] rounded-full bg-[#840705] xs:max-sm:mt-[5%] xs:max-sm:bg-yellow-400 xs:max-sm:w-[4vw] xs:max-sm:h-[2.5vh] xl:max-2xl:w-[1rem] xl:max-2xl:h-[1rem] xl:max-2xl:mt-[-2rem]",children:(0,l.jsx)("p",{className:"text-white text-center xs:max-sm:text-[2.5vw] xs:max-sm:font-semibold xs:max-sm:text-[#840705] xs:max-sm:mt-[10%] xl:max-2xl:text-[0.6em] xl:max-2xl:pt-[10%]",children:r})}):(0,l.jsx)(l.Fragment,{})]})]})})},u=a(7425),h=a(1713),f=a(8820),p=a(1545),b=a(5763);var v=function(e){var t=(0,n.useState)(!1),a=(0,i.Z)(t,2),r=a[0],o=a[1],d=(0,n.useState)([]),v=(0,i.Z)(d,2),g=v[0],w=v[1],j=localStorage.getItem("merch_id"),y=window.location.pathname.split("/"),N="%";switch(y[2]){case"upcoming":N="Ongoing%";break;case"finished":N="Finished%"}var S=function(){var e=(0,c.Z)((0,s.Z)().mark((function e(t,a,n){var r,c,i;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{r=String(t),c=String(a).padStart(2,"0"),i=String(n).padStart(2,"0"),x.Z.get("".concat(m.Z.API,"/reserve/retrievenparams"),{params:{query:"merchant_id = ".concat(j," AND res_date = '").concat(r,"-").concat(c,"-").concat(i,"' AND status LIKE '").concat(N,"' ORDER BY res_time ASC")}}).then((function(e){w(e.data.data)}))}catch(s){}case 1:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),Z=(0,n.useState)(window.innerWidth<=640),F=(0,i.Z)(Z,2),k=F[0],D=F[1];return(0,n.useEffect)((function(){o(!0),e.year&&e.month&&e.day&&S(e.year,e.month,e.day),o(!1)}),[e.year,e.month,e.day]),(0,n.useEffect)((function(){}),[g]),(0,n.useEffect)((function(){var e=function(){D(window.innerWidth<=640)};return window.addEventListener("resize",e),e(),function(){window.removeEventListener("resize",e)}}),[]),(0,l.jsx)(l.Fragment,{children:(0,l.jsx)("div",{className:"bg-[rgba(0,0,0,0.6)] w-[100vw] h-[100vh] z-10 absolute top-0 left-0 duration-100 animate-fade-in overflow-hidden xs:max-sm:z-[1001] xs:max-sm:h-[110vh]",children:(0,l.jsx)("div",{className:"animate-slide-up font-poppins fixed top-[8%] left-[18%] right-0 bg-white z-50 bg-[rgba(0, 0, 0, 0.5)] w-[70%] p-4 overflow-x-hidden overflow-y-auto h-[80%] drop-shadow rounded-3xl xs:max-sm:w-[90%] xs:max-sm:left-[5%]",children:r?(0,l.jsx)("div",{className:"flex justify-center mt-[25%]",children:(0,l.jsx)(h.Z,{})}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:"flex w-full h-[5vh]",children:[(0,l.jsxs)("div",{className:"flex items-center w-[96%] mt-[0.5%]",children:[(0,l.jsx)(u.lBz,{className:"text-[2.8em] ml-[1%] mr-[1%] xs:max-sm:text-[2em] xl:max-2xl:text-[2em]"}),(0,l.jsxs)("div",{children:[(0,l.jsx)("h1",{className:"font-bold text-[1.5em] xs:max-sm:text-[1.2em] xl:max-2xl:text-[1.2em]",children:"Reservations List"}),(0,l.jsxs)("p",{className:"mt-[-1%] text-[1.2em] xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.9em]",children:["Count: ",g.length]})]})]}),(0,l.jsx)("div",{className:"mt-[0.5%]",children:(0,l.jsx)(f.LHV,{className:"text-[2.5em] hover:cursor-pointer xs:max-sm:text-[1.8em] xl:max-2xl:text-[1.8em]",onClick:function(){e.close()}})})]}),(0,l.jsx)("hr",{className:"h-[2px] w-full my-[1.2%] bg-gray-200 border-0"}),(0,l.jsxs)("h1",{className:"font-bold uppercase text-[1.5em] ml-[2%] bg-[#840705] inline-block text-white px-[1%] rounded-lg mb-[0.5%] xs:max-sm:text-[1.0em] xs:max-sm:mt-[4%] xl:max-2xl:text-[1.0em]",children:["As of: ",["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][e.day%7]," - ",["NULL","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e.month],"/",e.day,"/",e.year]}),(0,l.jsxs)("div",{className:"flex mx-[2%] py-[2%] text-[1.2em] xs:max-sm:text-[1em] xs:max-sm:mt-[3%]  xl:max-2xl:text-[1em]",children:[(0,l.jsxs)("table",{className:"w-[100%] table-fixed",children:[(0,l.jsxs)("thead",{className:"",children:[(0,l.jsx)("th",{className:"font-bold uppercase text-[1.0em] m1-[4%] px-[1%] mt-[2%] rounded-lg mb-[0.5%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]",children:k?"Reserve ID":"Reservation ID"}),(0,l.jsx)("th",{className:"font-bold uppercase text-[1.0em] ml-[4%] px-[1%] mt-[2%]  rounded-lg mb-[0.5%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]",children:"Client ID"}),(0,l.jsx)("th",{className:"font-bold uppercase text-[1.0em] ml-[4%] mt-[2%] rounded-lg mb-[0.5%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]",children:"Time"}),(0,l.jsx)("th",{className:"font-bold uppercase text-[1.0em] ml-[4%] mt-[2%] rounded-lg mb-[0.5%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]",children:"Status"}),(0,l.jsx)("th",{className:"font-bold uppercase text-[1.0em] ml-[4%] mt-[2%] rounded-lg mb-[0.5%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]",children:"Actions"})]}),(0,l.jsx)("tbody",{className:" scroll-auto",children:r?(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(h.Z,{})}):(0,l.jsx)(l.Fragment,{children:g.length>0?(0,l.jsx)(l.Fragment,{children:g.map((function(t,a){return(0,l.jsxs)("tr",{className:"mt-4 py-4 border-t-2 border-b-2 border-black border-solid",children:[(0,l.jsx)("td",{className:"text-center text-[0.8em]",children:t.reservation_id}),(0,l.jsx)("td",{className:"text-center text-[0.8em]",children:t.account_id}),(0,l.jsx)("td",{className:"text-center  text-[0.8em]",children:t.res_time}),(0,l.jsx)("td",{className:"text-center text-[0.8em] font-bold xs:max-sm:text-[0.6em]\n                          ".concat("Finished"===t.status?"text-green-800":" text-blue-800"),children:(0,l.jsx)("button",{className:"".concat("Finished"===t.status?"bg-green-200":" bg-blue-200"," w-[50%] rounded-xl xs:max-sm:w-[80%]"),children:t.status})}),(0,l.jsxs)("td",{className:"flex flex-col items-center justify-center space-y-2 text-[0.8em] py-4",children:[(0,l.jsx)("div",{className:"w-full flex justify-center items-center",children:(0,l.jsxs)("button",{className:"flex justify-center items-center w-[80%] bg-[#ffbb38] py-[3%] px-[15%] rounded-3xl xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.9em] xl:max-2xl:mb-[3%]\r hover:bg-[#ffe7ba] transition-colors delay-450 duration-[3000] ease-in-out",onClick:function(){sessionStorage.setItem("res_id",t.reservation_id),e.openView(!0)},children:[(0,l.jsx)(p.nhM,{className:"mr-[0.3rem] xs:max-sm:hidden"}),"View"]})}),(0,l.jsx)("div",{className:"w-full flex justify-center items-center text-[1em] xs:max-sm:font-medium",children:(0,l.jsxs)("button",{className:"flex justify-center items-center w-[80%] bg-[#ff8e4f] py-[3%] px-[18%] rounded-3xl xs:max-sm:text-[0.9em] xl:max-2xl:text-[0.9em] xl:max-2xl:mb-[7%] xl:max-2xl:px-[19%]\r hover:bg-[#ffbe9b] transition-colors delay-450 duration-[3000] ease-in-out",onClick:function(){sessionStorage.setItem("res_id",t.reservation_id),e.openEdit(!0)},children:[(0,l.jsx)(b.LBv,{className:"ml-[-0.5rem] mr-[0.4rem] xs:max-sm:hidden"}),"Edit"]})})]})]},a)}))}):(0,l.jsx)("tr",{children:(0,l.jsx)("td",{className:"text-center",colSpan:5,children:"Nothing to show for now."})})})})]}),(0,l.jsx)("p",{})]})]})})})})},g=a(5864),w=a(684),j=a(6053);var y=function(){var e=(0,n.useState)(!1),t=(0,i.Z)(e,2),a=t[0],o=t[1],u=(0,n.useState)(1),h=(0,i.Z)(u,2),f=(h[0],h[1]),p=(0,n.useState)(!1),b=(0,i.Z)(p,2),y=b[0],N=b[1],S=(0,n.useState)(!1),Z=(0,i.Z)(S,2),F=Z[0],k=Z[1],D=(0,n.useState)({day:1,month:1,year:2e3,count:0}),_=(0,i.Z)(D,2),E=_[0],A=_[1],I=(0,n.useState)((new Date).getFullYear()),L=(0,i.Z)(I,2),C=L[0],M=L[1],O=(0,n.useState)((new Date).getMonth()),T=(0,i.Z)(O,2),z=T[0],R=T[1],U=localStorage.getItem("merch_id"),W=(0,n.useState)(),J=(0,i.Z)(W,2),Y=(J[0],J[1]),K=(0,n.useState)(""),P=(0,i.Z)(K,2),V=(P[0],P[1]),B=(0,n.useState)(""),H=(0,i.Z)(B,2),q=(H[0],H[1]),G=(0,n.useState)({}),Q=(0,i.Z)(G,2),X=(Q[0],Q[1]),$=new Date,ee=(0,n.useState)(window.innerWidth<=640),te=(0,i.Z)(ee,2),ae=te[0],ne=te[1],se=function(e,t){return new Date(e,t,1).getDay()},re=(0,n.useState)(!1),ce=(0,i.Z)(re,2),ie=ce[0],xe=ce[1],me=function(){xe(!1===ie)},oe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],le=(0,n.useState)(function(e,t){return new Date(e,t+1,0).getDate()}(C,z)),de=(0,i.Z)(le,2),ue=(de[0],de[1],(0,n.useState)(new Date(C,z,1).getDay())),he=(0,i.Z)(ue,2),fe=(he[0],he[1],(0,n.useState)([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31])),pe=(0,i.Z)(fe,2),be=pe[0],ve=pe[1],ge=function(){var e=(0,c.Z)((0,s.Z)().mark((function e(){var t,a,n,c,i,o,l,d,u,h,f;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.prev=0,t=String(C),a=String(z+1).padStart(2,"0"),n=window.location.pathname.split("/"),c="%",e.t0=n[2],e.next="upcoming"===e.t0?8:"finished"===e.t0?10:12;break;case 8:return c="Ongoing%",e.abrupt("break",13);case 10:return c="Finished%",e.abrupt("break",13);case 12:return e.abrupt("break",13);case 13:return e.next=15,x.Z.get("".concat(m.Z.API,"/reserve/retrievecountnparams"),{params:{cols:"res_date as res_date, COUNT(*) as count",condition:"merchant_id = ".concat(U," AND res_date LIKE '").concat(t,"-").concat(a,"-%' AND status LIKE '").concat(c,"' GROUP BY res_date")}});case 15:i=e.sent,o={},l=(0,r.Z)(i.data.data);try{for(l.s();!(d=l.n()).done;)u=d.value,i.data.data.length>0&&(h=u.res_date,f=u.count,o[h]=f)}catch(s){l.e(s)}finally{l.f()}X(o),Y(o.tempData),e.next=27;break;case 23:e.prev=23,e.t1=e.catch(0),q("Server Error"),V(e.t1.body);case 27:case"end":return e.stop()}}),e,null,[[0,23]])})));return function(){return e.apply(this,arguments)}}(),we=function(e){"next"===e?11===z?(M(C+1),R(0)):R(z+1):0===z?(M(C-1),R(11)):R(z-1)};(0,n.useEffect)((function(){o(!0),ge().then((function(){o(!1)})).catch((function(e){o(!1)}));var e=new Date;Ne(e.getFullYear()===C&&e.getMonth()===z&&1===e.getDate())}),[C,z]);var je=(0,n.useState)(!1),ye=(0,i.Z)(je,2),Ne=(ye[0],ye[1]);(0,n.useEffect)((function(){$.getFullYear()===C&&$.getMonth()===z&&1===$.getDate()?Ne(!0):Ne(!1)}),[1]),(0,n.useEffect)((function(){o(!0),ge().then((function(){o(!1)})).catch((function(e){o(!1)}))}),[C,z,window.location.pathname]);var Se=function(e){return e===$.getDate()&&C===$.getFullYear()&&z===$.getMonth()},Ze=function(){var e=(0,c.Z)((0,s.Z)().mark((function e(t,a,n){var r,c,i,l,d,u,h;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=-1,o(!0),e.prev=2,c=window.location.pathname.split("/"),i="%",e.t0=c[2],e.next="upcoming"===e.t0?8:"finished"===e.t0?10:12;break;case 8:return i="Ongoing%",e.abrupt("break",13);case 10:return i="Finished%",e.abrupt("break",13);case 12:return e.abrupt("break",13);case 13:l=String(t),d=String(a+1).padStart(2,"0"),u=String(n).padStart(2,"0"),x.Z.get("".concat(m.Z.API,"/reserve/retrievecountnparams"),{params:{cols:"res_date AS res_date, COUNT(*) as count",condition:"merchant_id = ".concat(U," AND status LIKE '").concat(i,"' AND res_date = '").concat(l,"-").concat(d,"-").concat(u,"' ")}}).then((function(e){r=e.data.data[0].count})),e.next=23;break;case 19:e.prev=19,e.t1=e.catch(2),q("Server Error"),V(e.t1.message);case 23:h={year:t,month:a+1,day:n,count:Number(r)},A(h),o(!1);case 26:case"end":return e.stop()}}),e,null,[[2,19]])})));return function(t,a,n){return e.apply(this,arguments)}}();return(0,n.useEffect)((function(){var e=function(){ne(window.innerWidth<=640)};return window.addEventListener("resize",e),e(),function(){window.removeEventListener("resize",e)}}),[]),(0,n.useEffect)((function(){for(var e=function(e,t){if(t<1||t>12)return 31;var a=new Date(e,t,1);return a.setDate(a.getDate()-1),a.getDate()}(C,z+1),t=[],a=1;a<=e;a++)t.push(a);ve(t)}),[[z,C]]),(0,l.jsx)("div",{className:"p-[3%]  ",children:(0,l.jsx)("div",{className:"flex flex-col font-poppins w-[100%] h-[100%] p-[1%] bg-[#840705] rounded-3xl",children:(0,l.jsxs)("div",{children:[(0,l.jsxs)("div",{className:"flex justify-center my-[1%] mb-[2%]",children:[(0,l.jsx)("div",{}),(0,l.jsx)("div",{}),(0,l.jsx)("div",{className:"flex justify-center items-center mr-[3%]",children:(0,l.jsx)("button",{onClick:function(e){e.preventDefault(),we("back")},className:"w-[2vw] h-[2vw] border-solid border-black border-2 flex justify-center bg-[white] items-center rounded-full duration-100 hover:border-[rgba(0,0,0,0.5)]  xs:max-sm:w-[4vw] xs:max-sm:h-[3vh] ",children:(0,l.jsx)(j.Ugn,{color:"light",className:"xs:max-sm:text-[0.8em]"})})}),(0,l.jsxs)("div",{className:"flex justify-center items-center text-[1.5rem] font-bold text-white mr-[3%] xs:max-sm:text-[1.2rem] xl:max-2xl:text-[1.1em]",children:[(0,l.jsx)("span",{children:["January","Febuary","March","April","May","June","July","August","September","October","November","December"][z]}),(0,l.jsx)("p",{children:" - "}),(0,l.jsx)("span",{children:String(C)})]}),(0,l.jsx)("div",{className:"flex justify-center items-center",children:(0,l.jsx)("button",{onClick:function(e){e.preventDefault(),we("next")},className:"w-[2vw] h-[2vw] border-solid bg-[white] border-black border-2 flex justify-center items-center rounded-full duration-100 hover:border-[rgba(0,0,0,0.5)]  xs:max-sm:w-[4vw] xs:max-sm:h-[3vh]",children:(0,l.jsx)(j.ULj,{className:"xs:max-sm:text-[0.8em]"})})}),(0,l.jsx)("div",{}),(0,l.jsx)("div",{})]}),(0,l.jsxs)("div",{className:"grid grid-cols-7 gap-4 mx-5 place-items-center xs:max-sm:mx-3 xs:max-sm:my-3 xs:max-sm:gap-2",children:[ae?["S","M","T","W","TH","F","S"].map((function(e,t){return(0,l.jsx)("div",{className:" w-[7vw] text-center font-poppins rounded-lg bg-[#FFFFFF] border-solid border-black border-2 xs:max-sm:text-[2.5vw] xs:max-sm:w-[100%] xs:max-sm:h-[3vh] xl:max-2xl:text-[0.8em]",children:e},t)})):Array.from({length:7}).map((function(e,t){var a=(t+1)%7;return(0,l.jsx)("div",{className:" w-[7vw] text-center font-poppins rounded-lg bg-[#FFFFFF] border-solid border-black border-2 xl:max-2xl:text-[0.8em]",children:oe[a]},t)})),Array.from({length:se(C,z)}).map((function(e,t){return(0,l.jsx)("div",{},t)})),Array.from({length:se(C,z)}).map((function(e,t){return(0,l.jsx)("div",{},t)})),be.map((function(e){return(0,l.jsx)("div",{className:"h-[5vw] w-[5vw] flex justify-center cursor-pointer p-2 rounded-xl border-black border-2 border-solid xs:max-sm:w-[100%] xs:max-sm:h-[100%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.9em]\n                                ".concat(!0===Se(e)?" bg-[#f9dcc5]":"bg-[#FFFFFF]"," hover:bg-slate-300 duration-300"),onClick:function(){return function(e){f(e)}(e)},children:(0,l.jsx)("div",{onClick:function(){return Ze(C,z,e)},children:(0,l.jsx)(d,{showReservations:me,year:C,day:e,month:z,today:Se(e),setIsLoading:o,isLoading:a})})},e)})),ie?(0,l.jsx)(v,{year:E.year,month:E.month,day:E.day,count:E.count,close:me,openView:N,openEdit:k}):(0,l.jsx)(l.Fragment,{}),(y||F)&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:"fixed top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.5)] opacity-0.5 z-100"}),y&&(0,l.jsx)(g.Z,{setOpenModalView:N}),F&&(0,l.jsx)(w.Z,{setOpenModalEdit:k})]})]})]})})})},N=function(){return(0,l.jsx)("div",{className:"animate-fade-in",children:(0,l.jsx)(y,{})})}}}]);
//# sourceMappingURL=834.b93b516c.chunk.js.map