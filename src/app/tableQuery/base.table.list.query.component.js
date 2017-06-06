"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var base_data_service_1 = require("angular-component-service/src/service/base.data.service");
var BaseTableListQueryComponent = (function () {
    function BaseTableListQueryComponent(baseDataService) {
        this.baseDataService = baseDataService;
        this.dataQuery = { query: {} };
        this.queryParam = { aa: 121434533 };
        this.testProp = {};
        this.outClick = new core_1.EventEmitter();
    }
    BaseTableListQueryComponent.prototype.ngOnInit = function () {
    };
    BaseTableListQueryComponent.prototype.ngOnChanges = function (changes) {
        this.initQueryElement();
    };
    /**
     * 属性变化监控
     * @param prop
     */
    BaseTableListQueryComponent.prototype.changeQueryParam = function (prop) {
        this.changeHelp(prop);
    };
    BaseTableListQueryComponent.prototype.changeHelp = function (prop) {
        var _this = this;
        if (prop === void 0) { prop = {}; }
        if (prop.type == "select") {
            var currentSwitchValue_1 = this.queryParam[prop.prop];
            if (prop.switchElements) {
                var needInitSelected_1 = [].filter.call(prop.switchElements, function (item) { if (item.whenSwitchValue == currentSwitchValue_1) {
                    return true;
                } })[0];
                console.log("needInitSelected", needInitSelected_1);
                if (needInitSelected_1) {
                    for (var key in needInitSelected_1.dropProps) {
                        delete this.queryParam[needInitSelected_1.dropProps[key]];
                    }
                    this.baseDataService.listData({ url: needInitSelected_1.dataUrl, param: this.queryParam, httpMethod: needInitSelected_1.httpMethod || "get" }).subscribe(function (data) {
                        var listData = data.json();
                        _this.dataQuery.query[needInitSelected_1.propKeyList] = listData[needInitSelected_1.propValueList];
                        _this.queryParam[needInitSelected_1.prop] = needInitSelected_1.defaultValue;
                    }, function (error) {
                        console.log(error);
                    });
                }
            }
            else if (prop.casecadeChild) {
                var casecadeChild_1 = this.findCasecadeChild(prop.casecadeChild);
                if (casecadeChild_1.extendsProp) {
                    for (var seq in casecadeChild_1.extendsProp) {
                        this.queryParam[casecadeChild_1.extendsProp[seq]] = currentSwitchValue_1;
                    }
                }
                this.baseDataService.listData({ url: casecadeChild_1.dataUrl, param: this.queryParam, httpMethod: casecadeChild_1.httpMethod || "get" }).subscribe(function (data) {
                    var listData = data.json();
                    _this.dataQuery.query[casecadeChild_1.propKeyList] = listData[casecadeChild_1.propValueList];
                    _this.queryParam[casecadeChild_1.prop] = casecadeChild_1.defaultValue;
                }, function (error) {
                    console.log(error);
                });
            }
        }
        else if (prop.type = "input") {
        }
    };
    BaseTableListQueryComponent.prototype.findCasecadeChild = function (elementKey) {
        var result = {};
        for (var j = 0; j < this.queryElements.length; j++) {
            var item = this.queryElements[j];
            if (item.prop == elementKey) {
                result = item;
                break;
            }
            if (item.switchElements) {
                for (var i = 0; i < item.switchElements.length; i++) {
                    var innerItem = item.switchElements[i];
                    if (innerItem.prop == elementKey) {
                        result = innerItem;
                    }
                }
            }
        }
        return result;
    };
    /**
     * 查询参数
     * @param data
     */
    BaseTableListQueryComponent.prototype.queryBtnClick = function (data) {
        var checkResult = true;
        if (this.queryChecks && this.queryChecks.length) {
            this.queryChecks.forEach(function (checkQueryFunc) {
                if (checkResult) {
                    if (typeof checkQueryFunc == "function") {
                        checkResult = checkQueryFunc(data);
                    }
                }
            });
        }
        if (!checkResult)
            return;
        this.outClick.emit(data);
    };
    BaseTableListQueryComponent.prototype.initQueryElement = function () {
        var _this = this;
        /*n 级 级联查询开始*/
        var queryParam = this.queryParam;
        if (this.queryElements == null || this.queryElements.length == 0)
            return;
        var requestUrlParam = [].filter.call(this.queryElements, function (item) {
            if (item.dataUrl && item.initQuery) {
                return item;
            }
        });
        var _loop_1 = function(seq) {
            var item = requestUrlParam[seq];
            if (item.casecadeParen == null || item.casecadeParen == "") {
                /*顶级元素优先查询完成一级数据初始化*/
                this_1.baseDataService.listData({ url: item.dataUrl, param: this_1.queryParam, httpMethod: item.httpMethod || "get" }).subscribe(function (data) {
                    var listData = data.json();
                    _this.dataQuery.query[item.propKeyList] = listData[item.propValueList];
                    _this.queryParam[item.prop] = item.defaultValue;
                }, function (error) {
                    console.log(error);
                });
            }
        };
        var this_1 = this;
        for (var seq in requestUrlParam) {
            _loop_1(seq);
        }
        /*n 级 级联查询结束*/
        this.queryButtons = this.queryElements.filter(function (item) { return item.type == 'button' || item.type == 'search'; });
    };
    __decorate([
        core_1.Input()
    ], BaseTableListQueryComponent.prototype, "queryElements");
    __decorate([
        core_1.Input()
    ], BaseTableListQueryComponent.prototype, "queryChecks");
    __decorate([
        core_1.Input()
    ], BaseTableListQueryComponent.prototype, "pageData");
    __decorate([
        core_1.Input()
    ], BaseTableListQueryComponent.prototype, "reInit");
    __decorate([
        core_1.Output()
    ], BaseTableListQueryComponent.prototype, "outClick");
    BaseTableListQueryComponent = __decorate([
        core_1.Component({
            selector: "base-table-list-query",
            templateUrl: 'base.table.list.query.component.html',
            providers: [base_data_service_1.BaseDataService],
            styleUrls: ["./base.table.list.query.component.css"]
        })
    ], BaseTableListQueryComponent);
    return BaseTableListQueryComponent;
}());
exports.BaseTableListQueryComponent = BaseTableListQueryComponent;
