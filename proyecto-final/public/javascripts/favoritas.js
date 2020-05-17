window.onload = function() {
    //Paso 1: Leo Storage
  
    var recuperoStorage = localStorage.getItem("seriesFavoritas");
  
    // Si todavía no tenía gifs favoritos
    if (recuperoStorage == null) {
      // Creo una lista vacia
      seriesFavoritas = [];
  
    } else {
      // Descomprimo el TEXTO que tenia en storage en el array que necesito trabajar
      seriesFavoritas = JSON.parse(recuperoStorage);
    }
  
    for (var i = 0; i < seriesFavoritas.length; i++) {
      // BUSCAR ESE GIF Y MOSTRARLO
  
      fetch("https://api.themoviedb.org/3/tv/"+ seriesFavoritas[i] +"?api_key=a6f60714320c532cb6f1c6ddeef46bac")
        .then(function(response) {
          return response.json();
        })
        .then(function(serie) {
          document.querySelector(".padrefav ul").innerHTML += "<li><h3><a href=/veoVeo/infoxserie?id=" + serie.id + ">" + serie.name + "</a></h3><img src=http://image.tmdb.org/t/p/w200" + serie.poster_path + "></li>";
        })
    }
    var lupita = document.querySelector("#lupita");
    var inputBuscador = document.querySelector(".buscadorsecundario");
  
    lupita.onclick = function() {
      inputBuscador.classList.toggle('inputHidden');
      setTimeout(function() {inputBuscador.focus();}, 301)
  
    }
  }
  