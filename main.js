const appbaseRef = new Appbase({
	url: "https://scalr.api.appbase.io",
	app: "testing-books",
	credentials: "tbcZmO8zJ:b894fa35-968a-43a9-a211-331954625da5"
})

const typeIndex = "books"

function upload(){
    let title = document.getElementById('inputTitle').value
    let autor = document.getElementById('inputAuthor').value
    let portada = document.getElementById('file1')
    let contraPortada = document.getElementById('file2')

    let promesaPortada = new Promise((resolve, reject) => {
        let file = portada.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            resolve(reader.result)
        }
        reader.readAsDataURL(file);
    });

    let promesaCP = new Promise((resolve, reject) => {
        let file = contraPortada.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            resolve(reader.result)
        }
        reader.readAsDataURL(file);
    });
    
    Promise.all([promesaPortada, promesaCP])
    .then((values) => {
        console.log('Los valores son ', values)
        let jsonObject = {
            "user": "Dulce",
            "books": {
                "title": title,
                "autor": autor,
                "portada": values[0],
                "contraportada": values[1]
            }
        }
        add(jsonObject)
    })
    .catch((error) => {
        console.log('ocurrió un error', error);
    });
    

}

function add(jsonObject){
    appbaseRef.index({
        type: typeIndex,
        id: "DUHC",
        body: jsonObject
    }).on('data', function(response) {
        console.log(`data: ${JSON.stringify(response)})`);
    }).on('error', function(error) {
        console.log(`error: ${error}`);
    })
}

function search(){
    appbaseRef.get({
        type: typeIndex,
        id: "DUHC"
    }).on('data', function(response) {
        //console.log(`data: ${JSON.stringify(response)}`)
        console.log(Object.keys(response))
        document.getElementById("portada").src=response._source.books.portada

    }).on('error', function(error) {
        console.log(`error: ${error}`)
    })
}