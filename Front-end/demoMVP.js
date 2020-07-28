/**
 * 
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
};
// View
myapp.View = function () {
    var $num = document.querySelector('#num'),
        $incBtn = document.querySelector('#increase'),
        $decBtn = document.querySelector('#decrease');
    // 触发视图更新
    this.render = function (model) {
        $num.innerHTML = model.getVal() + 'rmb'
    };
    // 绑定用户交互，调用控制器中的事件处理
    this.init = function () {
        var presenter = new myapp.Presenter(this);
        $incBtn.addEventListener('click', presenter.increase);
        $decBtn.addEventListener('click', presenter.decrease);
    }
};
// Presenter(中间人)
myapp.Presenter = function (view) {
    var model = new myapp.Model();

    view.render(model);

    // 处理用户交互，将 Mode 与 View 同步
    this.increase = function () {
        model.add(1);       // 直接同步 Mode
        view.render(model); // 直接同步 View
    };

    this.decrease = function () {
        model.sub(1);
        view.render(model);
    };
};