var Paint = {};

Paint.start = function(){
    Paint.bindMenuActions();
};

Paint.bindMenuActions = function(){
    var newBtn = document.getElementById("new");
    newBtn.addEventListener("click", Paint.new);
    var saveBtn = document.getElementById("save");
    saveBtn.addEventListener("click", Paint.save);
    var loadBtn = document.getElementById("load");
    loadBtn.addEventListener("click", Paint.load);
};

Paint.new = function(){
    alert("new");
};

Paint.save = function(){
    alert("save");
};

Paint.load = function(){
    alert("load");
};

Paint.start();
