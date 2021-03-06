const d = new Date()
let timeNow = new Date();
//var n = timeNow.toLocaleDateString();
let hours = timeNow.getHours().toString().length < 2 ? "0" + timeNow.getHours() : timeNow.getHours();
let minutes = timeNow.getMinutes().toString().length < 2 ? "0" + timeNow.getMinutes() : timeNow.getMinutes();
let seconds = timeNow.getSeconds().toString().length < 2 ? "0" + timeNow.getSeconds() : timeNow.getSeconds();


const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
let mainDay = (`${da}/${mo}/${ye}`)
let mainTime = `${hours}:${minutes}`;
console.log(mainTime)


document.getElementById('FechaActual').innerHTML= mainDay 
 
  
var firebaseConfig = {
    apiKey: "AIzaSyC74QNWfrpQ_dlAxU9fkSGYL-qDgYxiHn4",
    authDomain: "tiempos-d2216.firebaseapp.com",
    databaseURL: "https://tiempos-d2216.firebaseio.com",
    projectId: "tiempos-d2216",
    storageBucket: "tiempos-d2216.appspot.com",
    messagingSenderId: "361199090866",
    appId: "1:361199090866:web:d53a63ee9b4b93c8"
  };
  firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

//agregar documentos
function guardar (){
    var tipoid = document.getElementById('tipoId').value;
    var cedula= document.getElementById('cedula').value;
    var nombre = document.getElementById('nombre').value;
    var telefono = document.getElementById('telefono').value;
    var ebais = document.getElementById('ebais').value;
    var correo = document.getElementById('correo').value;
    var direccion = document.getElementById('direccion').value;
    var recibe = document.getElementById('recibe').value;
  
    
    db.collection("CopiasTelefono").add({
        TipoID: tipoid,
        Cedula: cedula,
        Nombre: nombre,
        Telefono: telefono,
        Ebais: ebais,
        Correo: correo,
        Direccion: direccion,
        //Fecha: dateExample,
        Fecha: firebase.firestore.Timestamp.fromDate(new Date()),
        Recibe: recibe,
        
    
                
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        limpiarCampos();
        alert("Registro Almacenado Correctamente");

    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        alert(error);

    });
}

//Leer documentos.
var tabla = document.getElementById('tabla');
db.collection("CopiasTelefono").orderBy("Fecha", "desc").onSnapshot((querySnapshot) => {
//db.collection("CopiasTelefono").where("Cedula", "==", "").onSnapshot((querySnapshot) => {
    tabla.innerHTML='';
    contador = 0
     querySnapshot.forEach((doc) => {
        /* console.log(`${doc.id} => ${doc.data()}`); */
        contador++;
         
     
       var fechaRegistro = new Date( doc.data().Fecha.seconds *1000).toLocaleString();
        
       // console.log(fechaRegistro.toLocaleString());
         tabla.innerHTML += `
        <tr>
        <td>${doc.data().TipoID}</td>
        <th scope="row">${doc.data().Cedula}</th>
        <td>${doc.data().Nombre}</td>
        <td>${doc.data().Ebais}</td>
        <td>${doc.data().Telefono}</td>
        <td>${fechaRegistro}</td>
        <td><button class="btn btn-danger btn-just-icon btn-sm" onclick="eliminar('${doc.id}')"> <i class="material-icons">close</i></button></td>
        <td><button class="btn btn-success btn-just-icon btn-sm" data-toggle="modal" data-target="#exampleModal" onclick="editar('${doc.id}','${doc.data().TipoID}','${doc.data().Cedula}','${doc.data().Nombre}','${doc.data().Telefono}','${doc.data().Ebais}','${doc.data().Correo}','${doc.data().Direccion}','${doc.data().Recibe}','${doc.data().Fecha}')">  <i class="material-icons">edit</i></button></td>
        <td><button class="btn btn-warning btn-just-icon btn-sm"onclick="imprimirElemento('${doc.id}','${doc.data().Cedula}','${doc.data().Nombre}','${doc.data().Telefono}','${doc.data().Ebais}','${doc.data().Direccion}','${doc.data().Recibe}','${doc.data().Fecha}')">  <i class="material-icons">print</i></button></td>
        </tr>   
        ` //<- ojo a estas comillas especiales 
    });
});




//borrar documentos.
function eliminar(id){
    db.collection("CopiasTelefono").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
        limpiarCampos();

    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

}

//editar documentos
function editar(id,tipoId,cedula,nombre,telefono, ebais,correo, direccion, recibe,fecha){

    modalID.innerHTML=  `   <strong>${id}</strong>`

document.getElementById('tipoId2').value= tipoId;   
document.getElementById('cedula2').value= cedula;
document.getElementById('nombre2').value= nombre;
document.getElementById('telefono2').value= telefono;
document.getElementById('ebais2').value= ebais;
document.getElementById('correo2').value= correo;
document.getElementById('direccion2').value= direccion;
document.getElementById('recibe2').value= recibe;
//document.getElementById('fecha2').value= fecha;


botonGuardarCambio.onclick = function (){
    var washingtonRef = db.collection("CopiasTelefono").doc(id);
    // Set the "capital" field of the city 'DC'
    var tipoId= document.getElementById('tipoId2').value;
    console.log(tipoId);
    var cedula= document.getElementById('cedula2').value;
    var nombre = document.getElementById('nombre2').value;
    var telefono = document.getElementById('telefono2').value;
    var ebais = document.getElementById('ebais2').value;
    var correo = document.getElementById('correo2').value
    var direccion = document.getElementById('direccion2').value;
    var recibe = document.getElementById('recibe2').value;

    return washingtonRef.update({
        
        TipoID: tipoId,
        Cedula: cedula,
        Nombre: nombre,
        Telefono: telefono,
        Ebais: ebais,
        Correo: correo,
        Direccion: direccion,
        Recibe: recibe,
    })
    .then(function() {
        alert("Document successfully updated!");
        boton.innerHTML='Guardar';
      limpiarCampos(); 


    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
    
    
    } 
}


function buscar(){
    var citiesRef = db.collection("cities");

citiesRef.doc("SF").set({
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] });
citiesRef.doc("LA").set({
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000,
    regions: ["west_coast", "socal"] });
citiesRef.doc("DC").set({
    name: "Washington, D.C.", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"] });
citiesRef.doc("TOK").set({
    name: "Tokyo", state: null, country: "Japan",
    capital: true, population: 9000000,
    regions: ["kanto", "honshu"] });
citiesRef.doc("BJ").set({
    name: "Beijing", state: null, country: "China",
    capital: true, population: 21500000,
    regions: ["jingjinji", "hebei"] });

}




function consulta(){
    centroSalud = document.getElementById('cedula').value;
    db.collection("Area Salud Limon").doc(centroSalud)
    .onSnapshot(function(doc) {
        document.getElementById('nombre').value = doc.data().Nombre;
        console.log(doc.data().Nombre)
    });
  
}

/* var centroSalud = document.getElementById ('centroSalud');
centroSalud.addEventListener("keypress", myFunction) */

var botonBuscar = document.getElementById('btnBuscar');
//botonBuscar.addEventListener("click", consulta);

function msj(){
    console.log("josuea Aqui")
}

function myFunction(event) {
    var x = event.which || event.keyCode;
    //document.getElementById("demo").innerHTML = "The Unicode value is: " + x;
  if (x==13){
      console.log('x')
    consulta();
  }
  
  }
 
     function verEbais() {
     	      	
			    var usuario = document.getElementById("username").innerHTML;
                //var selected = combo.options[combo.selectedIndex].innerHTML;
                console.log(combo);
                console.log(combo);
  			
     	// body...
     }


function imprimirElemento(id,cedula,nombre,telefono, ebais, direccion, recibe,fecha) {


    document.getElementById('cedula').value= cedula;
    document.getElementById('nombre').value= nombre;
    document.getElementById('telefono').value= telefono;
    document.getElementById('ebais').value= ebais;
    document.getElementById('direccion').value= direccion;
    document.getElementById('recibe').value= recibe;
    document.getElementById('fecha').value= fecha;



    console.log(fecha)
 

     // Convert timestamp to milliseconds
        var date = new Date(fecha);
        console.log(date)

    
       var printCedula= document.getElementById('cedula');
       var printNombre= document.getElementById('nombre');
       var printTelefono= document.getElementById('telefono');
       var printDireccion= document.getElementById('direccion');
       var printRecibe= document.getElementById('recibe');
       var printFecha = document.getElementById('fecha'); 

       var getEbais = document.getElementById('ebais');
       var printEbais = getEbais.options[getEbais.selectedIndex].innerHTML;  
    
    var ventana = window.open('', 'PRINT', 'height=400,width=600');
    ventana.document.write('<html><head><title>' + document.title + '</title>');
    ventana.document.write('</head><body >');
    //ventana.document.write(elemento);
    ventana.document.write('<p>'+ '<img src="https://www.ccss.sa.cr/img/logo.png"> <hr> <p>CAJA COSTARRICENSE DE SEGURO SOCIAL</p>' +
    '<h3>Area de Salud Limon</h3>' +
    '<p>Formulario de registro para el envio a domicilio de los medicamentos</p> '+ 
    '<p>Fecha de Impresion: '+ mainDay + " " +mainTime +'</<p>'+
    '<hr>'+
    '<h3>' + printCedula.value + '</h3> <hr>'+ 
    printNombre.value +'<hr>'+
    printTelefono.value +'<hr>'+
    printDireccion.value +'<hr>'+
    printEbais +'<hr>'+
    
    '<P>Firma Recibido</P> <br><hr>'+
    printRecibe.value +'<hr>'+    
    printFecha.value);

    ventana.document.write('</body></html>');
    limpiarCampos();
    ventana.document.close();
    ventana.focus();
    ventana.print();
    ventana.close();
    return true;

  }
  
  /* document.querySelector("#btnImprimir").addEventListener("click", function () {
    var div = document.querySelector("#imprimible");
    imprimirElemento(div);
  }); */

function limpiarCampos (){
    document.getElementById('cedula').value='';
    document.getElementById('nombre').value='';
    document.getElementById('ebais').value='';
    document.getElementById('telefono').value='';
    document.getElementById('direccion').value='';
    document.getElementById('recibe').value='';
}

 











