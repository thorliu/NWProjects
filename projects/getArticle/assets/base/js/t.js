////////////////////////////////////////////////////////////////	TClass

var TClass = {
    extend: function (subClass, superClass) {
        var F = function () { };
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;

        subClass.superclass = superClass.prototype;
        if (superClass.prototype.constructor == Object.prototype.constructor) {
            superClass.prototype.constructor = superClass;
        }
    }
    /**
     * 调用父类的构造函数
     * @param subClass 子类函数名
     * @param subInstance 子类对象引用
     */
    , callSuper: function (subClass, subInstance) {
        var argsArr = [];

        for (var i = 2, len = arguments.length; i < len; i++) {
            argsArr.push(arguments[i]);
        }

        subClass.superclass.constructor.apply(subInstance, argsArr);
    }
    /**
     * 子类中调用父类的函数
     * @param subClass 子类函数名
     * @param subInstance 子类对象引用
     * @param methodName 父类方法名
     */
    , runSuperMethod: function (subClass, subInstance, methodName) {
        return subClass.superclass[methodName].call(subInstance);
    }

};

////////////////////////////////////////////////////////////////	TObject

var TObject = function () {
    // alert("new TObject");
    this.init();
};
TObject.prototype.init = function () {
    // alert("TObject.init()");
};

////////////////////////////////////////////////////////////////	TNode

var TNode = function () {
    // TClass.callSuper(TNode, this);
    // alert("new TNode");
};
TClass.extend(TNode, TObject);
TNode.prototype.init = function () {
    // TClass.runSuperMethod(TNode, this, "init");
    // alert("TNode.init()");
};

////////////////////////////////////////////////////////////////	

var T = {
};

