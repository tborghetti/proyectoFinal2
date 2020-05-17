window.addEventListener("load", function () {

    // Variables cuando envio//
      document.querySelector(".form-avanzado").onsubmit = function (event) {
    
        var eGenero = document.querySelector(".opcionesGenero");
        var generoElegido = eGenero.options[eGenero.selectedIndex].value;
    
        var excluir = document.querySelector(".excluir");
        var generoExcluido = excluir.options[excluir.selectedIndex].value;
    
        var ordenar = document.querySelector(".orden");
        var orden = ordenar.options[ordenar.selectedIndex].value;
    
        var year = document.querySelector(".year").value;
    
    
        console.log(generoElegido);
    
    //si todos los generos son vacios, alerta!//
        if (generoElegido == "" && generoExcluido == "" && orden == "" && year == "" ) {
          event.preventDefault();
          alert('Seleccione al menos un campo')
        }
    //si genero elegido y genero excluido estan completos, alerta!//
        if (generoElegido != "" && generoExcluido != "") {
          event.preventDefault();
          alert("Seleccione o genero o excluir")
        }
    
      }
    })
    