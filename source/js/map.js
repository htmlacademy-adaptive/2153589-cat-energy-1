ymaps.ready(init);

function init () {
    let myMap = new ymaps.Map("map", {
        center:[59.968652,30.317551],
        zoom: 9,
        // controls: []
    });

    let myGeoObjects = [];
    myGeoObjects = new ymaps.Placemark([59.968652,30.317551],{
        balloonContentBody: 'HTML Academy',
    },{
        iconLayout: 'default#image',
        iconImageHref: '../img/map-pin.png',
        iconImageSize: [57, 53],
        iconImageOffset: [-35, -35]
    });

    let clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: false,
        clusterOpenBalloonOnClick: false,
    });

    clusterer.add(myGeoObjects);
    myMap.geoObjects.add(clusterer);
    myMap.behaviors.disable('scrollZoom');
}