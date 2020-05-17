window.addEventListener("load", function () {

    // URLSearchParams etc etc // el parametro a buscar se llama "idGenero"
    // &with_genres=" + laVariable
    fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=a6f60714320c532cb6f1c6ddeef46bac&language=en-US")
    .then(function(response) {
      return response.json();
    })
    .then(function(respuesta){
      // console.log( respuesta.results[1].poster_path );
      var series = respuesta.genres;
      for (var i = 0; i < series.length; i++) {
        document.querySelector("ul.lista-generos").innerHTML += "<li><a href=/veoVeo/genero?idGenero=" + series[i].id + ">" + series[i].name + "</a></li>"
        document.querySelector(".menuOculto ul.lista-generos").innerHTML += "<li><a href=/veoVeo/genero?idGenero=" + series[i].id + ">" + series[i].name + "</a></li>"
      }
    })
    //busqueda sea valida y con mas de 3 caracteres y desaparezca dps de 3s
    document.querySelector("form#busqueda").onsubmit = function () {
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
  