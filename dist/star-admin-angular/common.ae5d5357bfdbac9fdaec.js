(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"8hSh":function(t,n,e){"use strict";e.d(n,"a",function(){return c});var o=e("CcnG"),r=e("t/Na"),c=function(){function t(t){this.http=t}return t.prototype.getStockByCode=function(t){return this.http.get("/api/stocks/"+t)},t.prototype.getAll=function(){return this.http.get("/api/stocks")},t.prototype.create=function(t){return this.http.post("/api/stocks/create",{estateId:t})},t.ngInjectableDef=o.V({factory:function(){return new t(o.Z(r.c))},token:t,providedIn:"root"}),t}()}}]);