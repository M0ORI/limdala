function onSignIn(googleUser) {
  // Obtén la información del perfil del usuario.
  var profile = googleUser.getBasicProfile();

  var userName = profile.getName();
  console.log(userName);
 
  var loginElement = document.querySelector('nav ul li a[href=""]'); 


  loginElement.textContent = userName;

  loginElement.href = 'userProfile.html';
}
window.handleSignInClick = function () {

  window.location.href = 'pague2.html';
};

function checkAuth() {
  if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
    // El usuario está actualmente conectado
    console.log('El usuario está actualmente conectado.');
    handleSignInClick(); // Redirigir al usuario a la página deseada
  } else {
    // El usuario no está actualmente conectado
    console.log('El usuario no está actualmente conectado.');
    alert('Por favor inicia sesión antes de continuar.');
  }
}
function updateUserName(userName) {
  document.getElementById('userNameLink').innerText = userName;
}