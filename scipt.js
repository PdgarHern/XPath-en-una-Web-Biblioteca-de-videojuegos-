window.onload = () => {

    var xhttp = new XMLHttpRequest();
    var filter = "";

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            showResult(xhttp.responseXML);

        }
    };

    xhttp.open("GET", "videogames.xml", true);
    xhttp.send();

    path = `/videogames/videogame/name[contains(text(), '${filter}')]`

    function showResult(xml) {

        console.log("showResult");
        console.log(filter);

        var txt = "";
        
        
        if (xml.evaluate) {

            var names = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
            var result1 = names.iterateNext();

            

            while (result1) {
                pathImages = `/videogames/videogame[name = "${result1.childNodes[0].nodeValue}"]/image`
                var images = xml.evaluate(pathImages, xml, null, XPathResult.ANY_TYPE, null);
                var result2 = images.iterateNext();

                txt += "<div>" + 
                            "<img src='"+result2.childNodes[0].nodeValue+"' alt='imagen' class='img-fluid imgContent' />" + "<div class='container'>" +
                            "<p class='gamesInfo'>" + result1.childNodes[0].nodeValue + "</p>" + "</div>" +
                        "</div>"

                result1 = names.iterateNext();

            }
            
        } else if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
            xml.setProperty("SelectionLanguage", "XPath");
            nodes = xml.selectNodes(path);

            for (i = 0; i < names.length; i++) {
                txt += names[i].childNodes[0].nodeValue + "<br>";

            }

        }

        var nameSearch = document.getElementById("nameSearch");
        nameSearch.addEventListener("click", (e) => {
            console.clear();

            genreSearch.value = "null";

            var developer = document.getElementById("developerValue");
            developer.value = null;

            var name = document.getElementById("nameValue");
            filter = name.value;
            path = `/videogames/videogame/name[contains(text(), '${filter}')]`
            showResult(xml);

        });

        var genreSearch = document.getElementById("genreValue");
        console.log(genreSearch);
        genreSearch.addEventListener("change", (e) => {
            console.clear();

            var name = document.getElementById("nameValue");
            name.value = null;

            var developer = document.getElementById("developerValue");
            developer.value = null;

            genreSearch = genreSearch.value;
            console.log(genreSearch);

            if (genreSearch == 'null') {
                path = `/videogames/videogame/name`
                console.log("pass");
                showResult(xml);

            } else if (genreSearch == 'Todos') {
                path = `/videogames/videogame/name`
                console.log("all");
                showResult(xml);

            } else {
                path = `/videogames/videogame[categories/category = "${genreSearch}"]/name`
                console.log("different");
                showResult(xml);

            }

        });

        var developerSearch = document.getElementById("developerSearch");
        developerSearch.addEventListener("click", (e) => {
            console.clear();

            var name = document.getElementById("nameValue");
            name.value = null;

            genreSearch.value = "null";

            var developer = document.getElementById("developerValue");
            filter = developer.value;
            path = `/videogames/videogame[developers/developer = "${filter}"]/name`
            showResult(xml);

        });

        document.getElementById("contenido").innerHTML = txt;
        
    }

    

};
