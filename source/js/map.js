function initMap() {
    const myLatLng = { lat: 59.96834114873084, lng: 30.317505457201793 };
    const  tooltipTitle = 'HTML Academy\n' + 'наб. Pеки Карповки, 5П \n' + 'Санкт-Петербург\n' + 'Россия \n' + '197022';
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: myLatLng,
        disableDefaultUI: false
    });
    const image = '../img/map-pin.png';
    const marker=new google.maps.Marker({
        position: myLatLng,
        map,
        icon: image,
        title: tooltipTitle,
        store_id: 1
    });
    const info = new google.maps.InfoWindow({
        content: '<div><h4>HTML Academy</h4><p>наб. Pеки Карповки, 5П<br> Санкт-Петербург<br> Россия<br> 197022</p><p><a href="https://htmlacademy.ru/contacts">Свяжитесь с нами</a></p></div>'
    });

    marker.addListener("click", function() {
        info.open(map, this);
})
}