/**
 * MVC 特点：
 * 1. 业务逻辑主要集中在 Controller
 * 2. View 和 Controller 强耦合
 */

var myapp = {}; // 创建这个应用对象
// Model
myapp.Model = function () {
    var val = 0;
    this.add = function (v) {
        if (val < 100) val += v;
    };
    this.sub = function (v) {
        if (val > 0) val -= v;
    };
    this.getVal = function () {
        return val;
    };
    // 观察者模式
    var self = this,
        views = [];
    this.register = function (view) {
        views.push(view);
    };
    this.notify = function () {
        for (var i = 0; i < views.length; i++) {
            views[i].render(self);
        }
    };
};
// View
myapp.View = function (controller) {
    var $num = document.querySelector('#num'),
        $incBtn = document.querySelector('#increase'),
        $decBtn = document.querySelector('#decrease');
    // 触发视图更新
    this.render = function (model) {
        $num.innerHTML = model.getVal() + 'rmb'
    };
    // 绑定用户交互，调用控制器中的事件处理
    $incBtn.addEventListener('click', controller.increase);
    $decBtn.addEventListener('click', controller.decrease);
};
// Controller
myapp.Controller = function () {
    var model = null,
        view = null;
    this.init = function () {
        // 初始化 Model 和 View
        model = new myapp.Model();
        view = new myapp.View(this);
        // Model 中注册 View
        model.register(view);
        // 第一次更新视图
        model.notify();
    };
    // 处理用户交互，将 Mode 与 View 同步
    this.increase = function () {
        model.add(1);   // 更新 Model
        model.notify(); // 更新 View (通过 Model 中实现的观察者模式同步 View)
    };
    this.decrease = function () {
        model.sub(1);
        model.notify();
    };
};