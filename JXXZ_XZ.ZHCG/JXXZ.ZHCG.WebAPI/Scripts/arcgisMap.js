var arcgisMapApp;
var arcgisMapData;
var arcgisMapLoaded;
var arcgisMapDrawn;
var arcgisMapCleard;

function ArcGISMapApp_Loaded() {
    arcgisMapApp = document.getElementById("arcgisMapApp").content.ArcGISMapApp;
    arcgisMapData = document.getElementById("arcgisMapData");

    if (arcgisMapData == null) {
        arcgisMapData = document.createElement("input");
        arcgisMapData.id = "arcgisMapData";
        arcgisMapData.type = "hidden";
    }

    arcgisMapApp.Drawn = function (data) {
        arcgisMapData.value = data

        if (arcgisMapDrawn != null)
            arcgisMapDrawn(data);
    }

    arcgisMapApp.Cleared = function () {
        arcgisMapData.value = null;

        if (arcgisMapCleard != null)
            arcgisMapCleard();
    }

    if (arcgisMapLoaded != null)
        arcgisMapLoaded();
}

function getMapData() {
    return arcgisMapData.value;
}

function addMapPoint(s) {
    arcgisMapApp.AddPoint(s);
}

function addMapPolyline(s) {
    arcgisMapApp.AddPolyline(s);
}

function addMapPolygon(s) {
    arcgisMapApp.AddPolygon(s);
}