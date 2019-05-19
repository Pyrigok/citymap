/**
*Get all names from the specified category
**/
function GetObjList() {
    category = $("#category").val()
	$.ajax({
		type: 'POST',
		url: 'forms/hotels/',
        data: {
          'csrfmiddlewaretoken': csrftoken,
          'category': category,
        },
        dataType: 'json',
        success: function (data) {
            console.log(data)
            var obj_list = []
            for (let i = 0; i < data.length; i++) {

                if (data[i]["foodplace__name"] !== undefined){
                    obj_list.push(data[i]["foodplace__name"])
                }
                else {
                    obj_list.push(data[i]["hotel__name"])
                }
            }
            autocomplete(document.getElementById("id_keywords"), obj_list);
        },
        error: function(){
            console.log('Something wrong with GetObjList function');
        }
    }); 
}

GetObjList()