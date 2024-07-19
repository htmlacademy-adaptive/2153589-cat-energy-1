function initMap() {
    const mapBlock=document.querySelector(".contacts__map");
    mapBlock.classList.remove("contacts__map--nojs");
    const myLatLng = { lat: 59.93874872101732, lng: 30.32304739767776 };
    const  tooltipTitle = 'HTML Academy\n' + 'ул. Большая Конюшенная, д. 19/8 \n' + 'Санкт-Петербург\n' + 'Россия \n' + '197022';
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
        content: '<div><h4>HTML Academy</h4><p>ул. Большая Конюшенная, д. 19/8 <br> Санкт-Петербург<br> Россия<br> 197022</p><p><a href="https://htmlacademy.ru/contacts">Свяжитесь с нами</a></p></div>'
    });

    marker.addListener("click", function() {
        info.open(map, this);
})
}
