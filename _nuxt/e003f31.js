(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{239:function(t,n,e){e(240),t.exports=e(241)},342:function(t,n,e){"use strict";e.r(n),e.d(n,"state",(function(){return E})),e.d(n,"mutations",(function(){return f})),e.d(n,"actions",(function(){return N}));var o=e(232),c=(e(233),e(140),e(66),e(7),e(58),e(344)),r="https://notes-server-nodejs.onrender.com/api/notes",E=function(){return{notes:[],currentNote:null}},f={SET_NOTES:function(t,data){t.notes=data},SET_CURRENT_NOTE:function(t,n){t.currentNote=n},CLEAR_CURRENT_NOTE:function(t){t.currentNote=null},UPDATE_NOTES:function(t,n){var e=t.notes.findIndex((function(t){return t.id===n.id}));t.notes.splice(e,1,n)},DELETE_NOTE:function(t,n){var e=t.notes.filter((function(t){return t.id!==n.id}));t.notes=e},ADD_NEW_NOTE:function(t,n){t.notes=[].concat(Object(o.a)(this.state.notes),[n])}},N={getNotes:function(t){var n=t.commit;return c.a.get(r).then((function(t){n("SET_NOTES",t.data)}))},setCurrentNote:function(t,n){(0,t.commit)("SET_CURRENT_NOTE",n)},updateNote:function(t,n){var e=t.commit;return function(t){return c.a.put("".concat(r,"/").concat(t.id),t,{headers:{"Content-type":"application/json"}})}(n).then((function(t){e("UPDATE_NOTES",t.data)}))},deleteNote:function(t,n){var e=t.commit;return function(t){return c.a.delete("".concat(r,"/").concat(t.id))}(n).then((function(t){e("DELETE_NOTE",t.data)}))},addNewNote:function(t,n){var e=t.commit;return function(t){return c.a.post(r,t,{headers:{"Content-type":"application/json"}})}(n).then((function(t){e("ADD_NEW_NOTE",t.data)}))},clearCurrentNote:function(t){(0,t.commit)("CLEAR_CURRENT_NOTE")}}}},[[239,7,2,8]]]);