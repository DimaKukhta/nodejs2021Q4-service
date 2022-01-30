"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.BoardsController = void 0;
var common_1 = require("@nestjs/common");
var BoardsController = /** @class */ (function () {
    function BoardsController(boardsService) {
        this.boardsService = boardsService;
    }
    BoardsController.prototype.create = function (createBoardDto) {
        return this.boardsService.create(createBoardDto);
    };
    BoardsController.prototype.findAll = function () {
        return this.boardsService.findAll();
    };
    BoardsController.prototype.findOne = function (id) {
        return this.boardsService.findOne(+id);
    };
    BoardsController.prototype.update = function (id, updateBoardDto) {
        return this.boardsService.update(+id, updateBoardDto);
    };
    BoardsController.prototype.remove = function (id) {
        return this.boardsService.remove(+id);
    };
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], BoardsController.prototype, "create");
    __decorate([
        (0, common_1.Get)()
    ], BoardsController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], BoardsController.prototype, "findOne");
    __decorate([
        (0, common_1.Patch)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], BoardsController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], BoardsController.prototype, "remove");
    BoardsController = __decorate([
        (0, common_1.Controller)('boards')
    ], BoardsController);
    return BoardsController;
}());
exports.BoardsController = BoardsController;
