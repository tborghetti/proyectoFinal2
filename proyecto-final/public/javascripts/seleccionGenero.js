window.addEventListener("load", function (){

    var idGenero = new URLSearchParams(location.search)
    var genero = idGenero.get("idGenero");
    // PROBANDO var nombre = new URLSearchParams(location.search)
    // var nombre = nombre.get("nombre")
    // console.log(nombre);
  
    var nombreGenero = "";
  
    fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=a6f60714320c532cb6f1c6ddeef46bac&language=en-US")
    .then(function(response) {
      return response.json();
    })
    .then(function(respuesta){
      var series = respuesta.genres;
      for (var i = 0; i < series.length; i++) {
        if(series[i].id == genero){
          nombreGenero = series[i].name
        }
      }
    })
  
     fetch("https://api.themoviedb.org/3/discover/tv?api_key=a6f60714320c532cb6f1c6ddeef46bac&sort_by=popularity.desc&page=1&with_genres=" + genero)
    .then(function(response) {
      return response.json();
    })
    .then(function(respuesta) {
      document.querySelector("h2.title").innerText = nombreGenero
      var series = respuesta.results;
      for (var i = 0; i < series.length; i++) {
        if(series[i].poster_path != null) {
          document.querySelector("div#busqueda").innerHTML += "<div class='pelis'><a href='/veoVeo/infoxserie?id=" + series[i].id + "'><img src='http://image.tmdb.org/t/p/w300" + series[i].poster_path + "'></a></div>"
        } else {
          document.querySelector("div#busqueda").innerHTML += "<div class='pelis'id='errores'><img src='/images/newError.jpeg'></div>";
        }
  
      }
    })
    // aca arranco desde aqui
    var lupita = document.querySelector("#lupita");
    var inputBuscador = document.querySelector(".buscadorsecundario");
  
    lupita.onclick = function() {
    inputBuscador.classList.toggle('inputHidden');
    setTimeout(function() {inputBuscador.focus();}, 301)
    }
  
    //busqueda sea valida y con mas de 3 caracteres y desaparezca dps de 3s
    document.querySelector("form#busqueda").onsubmit = function (event) {
  
      if(document.querySelector("input.buscadorsecundario").value.length < 3) {
    event.preventDefault();
      document.querySelector('.error').innerHTML += `<div class="uk-alert-danger notificacion" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p>Al menos 3 letras.</p>
    </div>`
    setTimeout(function(){
      document.querySelector('.notificacion').style.display = 'none'
    }, 3000)
      }
      }
  
  })
  