var sel = document.getElementById('category');
sel.addEventListener("change", () => {
    FormChange();
});

function FormChange(){
    category = $("#category").val()
    console.log(category)
    $("#type_change").html("");
    if (category == 'Hotels'){
        TypeChangeLoad("forms/hotels/");
    }
    else if (category == 'Restaurant') {
        TypeChangeLoad("forms/restaurant/");
    }
}

function TypeChangeLoad(url){
    $("#type_change").load(url, function() {
        GetObjList()
    });
    $.ajax({
		type: 'POST',
		url: "forms/hotels/",
        data: {
          'csrfmiddlewaretoken': csrftoken,
          'category': category,
        },
        dataType: 'json',
        success: function (data) {
        	markers.clearLayers();
        	for (let i = 0; i < data.length; i++) {
        		marker = L.marker([data[i].latitude, data[i].longitude])
        		marker.addTo(markers)
        	}
        },
        error: function(){
            console.log('Something wrong with TypeChangeLoad function');
        }
    });
    
}
