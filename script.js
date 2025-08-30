console.log("Hola mundo")

function hipotenusa(a,b){
    return Math.sqrt(a*a+b*b);
}
console.log(hipotenusa(3,4))

document.writeln("<p> Hola, parrafo hecho en JS</p>")

const ts = Date.now();
document.writeln("<p> Hola, la hora es " + ts +  " </p>")

// Actividad 1 de JavaScript //

document.getElementById("botonEdad").addEventListener("click", function() {
  const edadInput = document.getElementById("edadInput");
  const mensajeEdad = document.getElementById("mensajeEdad");
  
  const edad = Number(edadInput.value);
  
  if (!edad || edad <= 0) {
    mensajeEdad.textContent = "Por favor, ingrese una edad válida.";
    mensajeEdad.style.color = "red";

  } else if (edad < 18) {
    mensajeEdad.textContent = "Usted es menor de edad.👶";
    mensajeEdad.style.color = "blue";

  } else if (edad >= 18 && edad <= 65) {
    mensajeEdad.textContent = "Usted es mayor de edad pero no viejo. 👨‍🎓";
    mensajeEdad.style.color = "orange";

  } else if (edad >= 65 && edad <= 85) {
    mensajeEdad.textContent = "Usted es una persona mayor. 🕴️";
    mensajeEdad.style.color = "lightblue";

  } else if (edad > 85) {
    mensajeEdad.textContent = "Usted es de la tercera edad 🤶.";
    mensajeEdad.style.color = "green";

  } else {
    mensajeEdad.textContent = "Gracias por ingresar su edad.";
    mensajeEdad.style.color = "blue";

  }
  const form = document.getElementById('usuarioForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Construir el objeto usuario según modelo
  const usuario = {
    rut: form.rut.value,
    nombre: form.nombre.value,
    apellido: form.apellido.value,
    email: form.email.value,
    telefono: parseInt(form.telefono.value),
    direccion: form.direccion.value,
    fechaNacimiento: form.fechaNacimiento.value,  // yyyy-mm-dd
    rolUsuario: form.rolUsuario.value
  };

  fetch('http://localhost:8082/api/v1/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  })
  .then(response => {
    if(response.ok){
      alert('Usuario creado exitosamente!');
      form.reset();
    } else {
      alert('Error al crear usuario');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error al conectar con el servidor');
    });
  });

});
