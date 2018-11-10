var Paint = {};
Paint.colors = ["Black", "Red", "Green", "Blue", "White"];
Paint.selectedColor = "Black";

Paint.start = function(){
    Paint.bindMenuActions();
    Paint.generateDynamicColors();
    Paint.bindColorClick();
    Paint.bindCanvasSize();
};

Paint.bindMenuActions = function(){
    var newBtn = document.getElementById("new");
    newBtn.addEventListener("click", Paint.new);
    var clearBtn = document.getElementById("clear");
    clearBtn.addEventListener("click", Paint.clear);
    var saveBtn = document.getElementById("save");
    saveBtn.addEventListener("click", Paint.save);
    var loadBtn = document.getElementById("load");
    loadBtn.addEventListener("click", Paint.load);
};

Paint.bindCanvasSize = function(){
    var size = document.getElementById("small");
    size.addEventListener("click",Paint.canvasSmall);
    var size = document.getElementById("medium");
    size.addEventListener("click",Paint.canvasMedium);
    var size = document.getElementById("large");
    size.addEventListener("click",Paint.canvasLarge);
};

// Paint.showModal = function(title, message){
//     var modalWrapper = document.getElementById("modal-wrapper");
//     modalWrapper.style.display = "block";
// };

Paint.canvasSmall = function(){
    var canvas = document.getElementById("canvas");
    canvas.setAttribute("class", "small-canvas");
}

Paint.canvasMedium = function(){
    var canvas = document.getElementById("canvas");
    canvas.setAttribute("class", "medium-canvas");
}

Paint.canvasLarge = function(){
    var canvas = document.getElementById("canvas");
    canvas.setAttribute("class", "large-canvas");
}

Paint.generateDynamicColors = function(){
    var palette = document.getElementById("palette");
    for (var i = 0; i < Paint.colors.length ; i++){
        var buttonItem =  document.createElement("li"); 
        var newButton = document.createElement("button"); 
        var buttonLabel = document.createTextNode(Paint.colors[i]);
        newButton.id = Paint.colors[i];
        newButton.className = "buttonColors";
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

Paint.new = function(){
    var canvasName = prompt("What is the name of your masterpiece?");
    var canvasTitle = document.getElementById("canvas-title");
    canvasTitle.innerHTML = canvasName;
    Paint.clear();
    Paint.show();
};

// Paint.showModal = function(){
//     var modalWrapper = document.getElementById("modal-wrapper");
//     var modalOK = document.getElementById("modal-ok");
//     modalWrapper.style.display = "block";
//     var canvasName = document.getElementById("canvas-name").value;
//     var canvasTitle = document.getElementById("canvas-title");
//     canvasTitle.innerHTML = canvasName;
//     modalOK.addEventListener("click", function(){
//         modalWrapper.style.display = "none"
//     });
//     Paint.show();

Paint.show = function (){
    var canvas = document.getElementById("canvas");
    canvas.style.display = "block";
}

Paint.clear = function(){
    var canvas = document.getElementById("canvas");
    var allColors = canvas.getElementsByTagName('img');
    while (allColors.length > 0){
        canvas.removeChild(allColors[0]);
    }
};

Paint.save = function(){
    var canvas = document.getElementById("canvas");
    var canvasLeft = canvas.getBoundingClientRect().left;
    var canvasTop =  canvas.getBoundingClientRect().top;
    var canvasObj = {};
    canvasObj["name"] = document.getElementById("canvas-title").innerHTML;
    canvasObj["strokes"] = [];
    var allStrokes = canvas.getElementsByTagName('img');
    for (var i = 0; i < allStrokes.length ; i++) {
        var currentStroke = allStrokes[i];
        var strokeObj = {};
        strokeObj["img"] = currentStroke.src;
        strokeObj["top"] = currentStroke.getBoundingClientRect().top - canvasTop;
        strokeObj["left"] = currentStroke.getBoundingClientRect().left - canvasLeft;
        canvasObj["strokes"].push(strokeObj);
    }
    localStorage.setItem('painting', JSON.stringify(canvasObj));
    alert("Painting Saved");
};

Paint.load = function(){
    var loadedPainting = localStorage.getItem('painting');
    var canvasObj = JSON.parse(loadedPainting);
    Paint.clear();
    var canvasTitle = document.getElementById("canvas-title");
    canvasTitle.innerHTML = canvasObj["name"];
    var allStrokes = canvasObj["strokes"];
    for (var i = 0; i < allStrokes.length ; i++) {
        var currentStroke = allStrokes[i];
        Paint.placeColors(currentStroke["img"], 
                            currentStroke["top"] + "px", 
                            currentStroke["left"] + "px");
    }
    Paint.show();
    alert("Painting Loaded");
};

Paint.start();
