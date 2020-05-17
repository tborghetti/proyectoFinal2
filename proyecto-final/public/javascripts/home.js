window.onload = function () {

    /*Columna populares - inicio*/
      fetch("https://api.themoviedb.org/3/tv/popular?api_key=a6f60714320c532cb6f1c6ddeef46bac&language=en-US&page=1")
      .then(function(response) {
        return response.json();
      })
      .then(function(respuesta){
        // console.log( respuesta.results[1].poster_path );
        var series = respuesta.results;
        for (var i = 0; i < series.length; i++) {
          document.querySelector("div.populares").innerHTML += "<div><a href='/veoVeo/infoxserie?id=" + series[i].id + "'><img src='http://image.tmdb.org/t/p/w200" + series[i].poster_path + "'></a></div>"
          document.querySelector("ul#carruselPopulares").innerHTML += "<li><a href='/veoVeo/infoxserie?id=" + series[i].id + "'><img src='http://image.tmdb.org/t/p/w200" + series[i].poster_path + "'></a></li>"
        }
    
        setTimeout(function() {
          $('.populares').slick({
            vertical: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: true
          });
        }, 200)
      }
    )
    /*Columna populares - fin*/
    
    /*Columna al-aire - inicio*/
    fetch("https://api.themoviedb.org/3/tv/airing_today?api_key=a6f60714320c532cb6f1c6ddeef46bac&language=en-US&page=1")
    .then(function(response) {
      return response.json();
    })
    .then(function(respuesta){
      // console.log( respuesta.results[1].poster_path );
      var series = respuesta.results;
      for (var i = 0; i < series.length; i++) {
        document.querySelector("div.al-aire").innerHTML += "<div><a href='/veoVeo/infoxserie?id=" + series[i].id + "'><img src='http://image.tmdb.org/t/p/w200" + series[i].poster_path + "'></a></div>"
          document.querySelector("ul#carruselAire").innerHTML += "<li><a href='/veoVeo/infoxserie?id=" + series[i].id + "'><img src='http://image.tmdb.org/t/p/w200" + series[i].poster_path + "'></a></li>"
      }
    
      setTimeout(function() {
        $('.al-aire').slick({
          vertical: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true
        });
      }, 200)
    }
    )
    /*Columna al-aire - fin*/
    
    /*Columna mayor-puntajr - inicio*/
      fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=a6f60714320c532cb6f1c6ddeef46bac&language=en-US&page=1")
      .then(function(response) {
        return response.json();
      })
      .then(function(respuesta){
        // console.log( respuesta.results[1].poster_path );
        var series = respuesta.results;
        for (var i = 0; i < series.length; i++) {
          document.querySelector("div.mayor-puntaje").innerHTML += "<div><a href='/veoVeo/infoxserie?id=" + series[i].id + "'><img src='http://image.tmdb.org/t/p/w200" + series[i].poster_path + "'></a></div>"
          document.querySelector("ul#carruselPuntaje").innerHTML += "<li><a href='/veoVeo/infoxserie?id=" + series[i].id + "'><img src='http://image.tmdb.org/t/p/w200" + series[i].poster_path + "'></a></li>"
        }
        /**donde dice src lo busco aparte y para poster es siempr el mismo*/
        /*si quiero poner el titulo de la peli abajo de la imagen, lo que tengo que hacer es una vez que cierro lo de img abro uno nuevo para un p y en ves de poner poster path pongo title porque respuesta.result lo tiene todo junto en series*/
        setTimeout(function() {
          $('.mayor-puntaje').slick({
            vertical: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: true
          });
        }, 200)
      }
    )
    /*Columna mayor-puntajr - fin*/
    
    
    //modificar el click en la lupa para q aparezca lo oculto
    var lupita = document.querySelector("#lupita");
    var inputBuscador = document.querySelector(".buscadorsecundario");
    
    lupita.onclick = function() {
      inputBuscador.classList.toggle('inputHidden');
      setTimeout(function() {inputBuscador.focus();}, 301)
    
    }
    //hasta aca.
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
    
    }
    