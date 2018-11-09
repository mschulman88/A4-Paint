var Paint = {};
Paint.colors = ["Black", "Red", "Green", "Blue", "White"];
Paint.selectedColor;

Paint.start = function(){
    Paint.bindMenuActions();
    Paint.generateDynamicToppings();
    Paint.bindColorClick();
};

Paint.bindMenuActions = function(){
    var newBtn = document.getElementById("new");
    newBtn.addEventListener("click", Paint.new);
    var saveBtn = document.getElementById("save");
    saveBtn.addEventListener("click", Paint.save);
    var loadBtn = document.getElementById("load");
    loadBtn.addEventListener("click", Paint.load);
};

Paint.generateDynamicToppings = function(){
    var palette = document.getElementById("palette");
    for (var i = 0; i < Paint.colors.length ; i++){
        var buttonItem =  document.createElement("li"); 
        var newButton = document.createElement("button"); 
        var buttonLabel = document.createTextNode(Paint.colors[i]);
        // newButton.style.backgroundImage = "url(./images/" + Pizza.toppings[i] + ".jpg)";
        // newButton.className = "cover-bg toppings-btn";
        newButton.id = Paint.colors[i];
        buttonItem.appendChild(newButton);
        newButton.appendChild(buttonLabel);
        palette.appendChild(buttonItem);
        newButton.addEventListener("click",function(e){
            if (Paint.selectedColor !== undefined){
                document.getElementById(Paint.selectedColor).classList.remove("selected");
            }
            var clickedColor = this;
            Paint.selectedColor = clickedColor.id;
            clickedColor.classList.add("selected");
        });
    }
};

Paint.bindColorClick = function(){
    var canvas = document.getElementById("canvas");
    canvas.addEventListener("click",Paint.placeColors);
};


Paint.placeColors = function(e){
    var canvas = document.getElementById("canvas");
    if (Paint.selectedColor != undefined){
        var colorImg = document.createElement("img");
        colorImg.src = "./img/" + Paint.selectedColor + ".png";
        canvas.appendChild(colorImg);
        colorImg.style.top = e.pageY - e.target.offsetTop + "px";
        colorImg.style.left = e.pageX - e.target.offsetLeft + "px";
    }else{
        alert("Please select a color!")
    }
};

// Paint.placeColor = function(src, top, left){
//     var canvas = document.getElementById("canvas");
//     var colorImg = document.createElement("img"); 
//     colorImg.src = src;
//     colorImg.style.top = top;
//     colorImg.style.left = left;
//     canvas.appendChild(colorImg);
// }

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
