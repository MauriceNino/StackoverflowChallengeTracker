"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var User = /** @class */ (function () {
    function User(_userName) {
        this.userName = "";
        this.stackoverflowUserObject = null;
        this.stackoverflowAnswers = null;
        this.userName = _userName;
    }
    return User;
}());
var UserManager = /** @class */ (function () {
    function UserManager() {
    }
    UserManager.loadFullUserObj = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b, _c, _d, _e, exception_1;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _f.trys.push([0, 5, , 6]);
                                    _a = user;
                                    return [4 /*yield*/, UserManager.getStackoverflowUser(user)];
                                case 1:
                                    _a.stackoverflowUserObject = _f.sent();
                                    _b = user;
                                    _d = (_c = UserManager).getAnswersAfterDate;
                                    return [4 /*yield*/, UserManager.getAnswersOfUser(user.stackoverflowUserObject)];
                                case 2: return [4 /*yield*/, _d.apply(_c, [_f.sent(), UserManager.challangeStartDate])];
                                case 3:
                                    _b.stackoverflowAnswers = _f.sent();
                                    _e = user;
                                    return [4 /*yield*/, UserManager.calculatePointsOfUser(user)];
                                case 4:
                                    _e.calculatedPoints = _f.sent();
                                    resolve(user);
                                    return [3 /*break*/, 6];
                                case 5:
                                    exception_1 = _f.sent();
                                    reject(exception_1);
                                    return [3 /*break*/, 6];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    UserManager.calculatePointsOfUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var points;
                        return __generator(this, function (_a) {
                            points = 0;
                            user.stackoverflowAnswers.forEach(function (answer) {
                                points += answer.is_accepted ? 15 : 0;
                                points += answer.score * 10;
                            });
                            resolve(points);
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    UserManager.getStatsAfterDate = function (stackoverflowStats, compareDate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, stackoverflowStats.filter(function (stat) {
                        var tempDate = new Date(stat.on_date * 1000);
                        return tempDate >= compareDate;
                    })];
            });
        });
    };
    UserManager.getStatsOfUser = function (stackoverflowUserObject) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (stackoverflowUserObject == undefined)
                            reject();
                        $.ajax("https://api.stackexchange.com/2.2/users/" + stackoverflowUserObject.user_id + "/reputation?site=stackoverflow", {
                            dataType: 'json',
                            error: function (msg) {
                                reject(msg);
                            },
                            success: function (data) {
                                resolve(data.items);
                                UserManager.sleepBecauseStackoverflowLimits(data.backoff);
                            },
                            type: 'GET'
                        });
                    })];
            });
        });
    };
    UserManager.getAnswersAfterDate = function (stackoverflowAnswers, compareDate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, stackoverflowAnswers.filter(function (answer) {
                        var tempDate = new Date(answer.creation_date * 1000);
                        return tempDate >= compareDate;
                    })];
            });
        });
    };
    UserManager.getAnswersOfUser = function (stackoverflowUserObject) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (stackoverflowUserObject == undefined)
                            reject();
                        $.ajax("https://api.stackexchange.com/2.2/users/" + stackoverflowUserObject.user_id + "/answers?order=desc&sort=creation&site=stackoverflow", {
                            dataType: 'json',
                            error: function (msg) {
                                reject(msg);
                            },
                            success: function (data) {
                                resolve(data.items);
                                UserManager.sleepBecauseStackoverflowLimits(data.backoff);
                            },
                            type: 'GET'
                        });
                    })];
            });
        });
    };
    UserManager.getStackoverflowUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        $.ajax("https://api.stackexchange.com/2.2/users?inname=" + user.userName + "&site=stackoverflow", {
                            dataType: 'json',
                            error: function (msg) {
                                reject(msg);
                            },
                            success: function (data) {
                                resolve(data.items[0]); // Unwrap user
                                UserManager.sleepBecauseStackoverflowLimits(data.backoff);
                            },
                            type: 'GET'
                        });
                    })];
            });
        });
    };
    UserManager.sleepBecauseStackoverflowLimits = function (milliseconds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, milliseconds); })];
            });
        });
    };
    UserManager.challangeStartDate = new Date('2019-03-30T00:00:00');
    return UserManager;
}());
