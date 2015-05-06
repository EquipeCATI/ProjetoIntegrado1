var preload = new createjs.LoadQueue(true);
var line;
var civilizations = [];

function loadAssets(){
    var imgManifest = [];
    preload.on("error", handleError);
    preload.on("progress", handleProgress);
    
    $.each(civilizations, function() {
        var img = {src: this.name + "/menu.png", id: "menu" + this.name};
        imgManifest.push(img);
        
        img = {src: this.name + "/menuBackground.png", id: "menuBackground" + this.name};
        imgManifest.push(img);
    });
    
	preload.loadManifest(imgManifest, true, "../assets/Civilizações/");
}

function handleComplete(){
    $("#progress").fadeOut();
    $("#mainDiv").fadeIn();
    $("#mainDiv *").fadeIn();
    updateMarkers();
}

function handleError(){
    console.log("deu merda");
}

function handleProgress(event){
    line.animate(event.progress, function(){
        if(event.progress == 1)
        handleComplete();
    });
    
}


$(document).ready(function() {
    
    $.ajax({
        type: "GET",
        url: "../assets/civilizations.xml",
        dataType: "xml",
        success: parseXML
    });
    
    $("#mainDiv").fadeOut(0);
    $("#mainDiv *").fadeOut(0);
    
    line = new ProgressBar.Line('#progress', {
        color: '#FCB03C'
    });
    
    
});


function parseXML(xml){
    
    $(xml).find("Civilization").each(function()
    {        
        var civilization = new Civilization($(this));
        civilizations.push(civilization);
    });
    
    loadAssets();
                                     
    $.each(civilizations, function() {
        $("#mapDiv").append("<img src='../assets/MapMarker.png' alt='Cidade " + this.name + "' id='" + this.name + "' class='MapMarker'/>");
        $("#"+this.name).css("top", this.mapMarker.topSpace);
        $("#"+this.name).css("left", this.mapMarker.leftSpace);
    });
    
    updateMarkers();
}