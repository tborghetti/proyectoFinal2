window.addEventListener("load", function () {

    // document.querySelector(".form-buscador button").addEventListener("click", function () {
  // tiene que estar solo linkeado resultadoavanzado.html
  
    fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=a6f60714320c532cb6f1c6ddeef46bac&language=en-US")
    .then(function(response) {
      return response.json();
    })
    .then(function(respuesta){
      // console.log( respuesta.results[1].poster_path );
      var series = respuesta.genres;
      for (var i = 0; i < series.length; i++) {
        document.querySelector("select.opcionesGenero").innerHTML += "<option value=" + series[i].id + ">" + series[i].name + "</option>"
        document.querySelector("select.excluir").innerHTML += "<option value=" + series[i].id + ">" + series[i].name + "</option>"
      }
    })
  
  })
  