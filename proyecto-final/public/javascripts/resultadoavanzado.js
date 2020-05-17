window.addEventListener("load", function() {
    var query = new URLSearchParams(location.search)
  
  
    var genero = query.get('genero')
    if(genero != null){
      genero = '&with_genres=' + genero
    }else{
      genero = ""
    }
  
    var excluir = query.get('excluir')
    if(excluir != null){
      excluir = '&without_genres=' + excluir
    }else{
      excluir = ""
    }
    var orden = query.get('orden')
  
    if(orden!= null){
      orden = '&sort_by=' + orden
    }else{
      orden = ""
    }
  
    var year = query.get('year')
    if(year != null){
      year = '&first_air_date_year=' + year
    }else{
      year = ""
    }
  
    fetch("https://api.themoviedb.org/3/discover/tv?api_key=a6f60714320c532cb6f1c6ddeef46bac" + genero + excluir + orden + year)
    .then(function(response) {
      return response.json();
    })
    .then(function(respuesta){
      console.log(respuesta);
      var series = respuesta.results;
      document.querySelector("h2.title").innerText = "Resultado de la busqueda avanzada";
      for (var i = 0; i < series.length; i++) {
        if(series[i].poster_path != null) {
          document.querySelector("div#busqueda").innerHTML += "<div class='pelis'><a href='/veoVeo/infoxserie?id=" + series[i].id + "'><img src='http://image.tmdb.org/t/p/w300" + series[i].poster_path + "'></a></div>";
        }
      }
    })
  })
  