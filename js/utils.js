// Defindo referências para elementos da página, qualquer elemento que quiser uma ação em JS no seu APP.
var authForm = document.getElementById('authForm')
var authFormTitle = document.getElementById('authFormTitle')
var register = document.getElementById('register')
var access = document.getElementById('access')
var loading = document.getElementById('loading')
var auth = document.getElementById('auth')
var userContent = document.getElementById('userContent')
var userEmail = document.getElementById('userEmail')
var emailVerified = document.getElementById('emailVerified')
var sendEmailVerificationDiv = document.getElementById('sendEmailVerificationDiv')
var passwordReset = document.getElementById('passwordReset')
var userName = document.getElementById('userName')
var userImg = document.getElementById('userImg')

// Alterar o formulário de autenticação para o cadastro de novas contas
function toggleToRegister() {
  authForm.submitAuthForm.innerHTML = 'Criar conta'
  authFormTitle.innerHTML = 'Faça seu cadastro'
  hideItem(register) //hide atalho para casdastrar contar
  showItem(access) //show atalho para casdastrar contar
  hideItem(passwordReset) //hide na tela de registor
}

// Alterar o formulário de autenticação para o acesso de contas já existentes
function toggleToAccess() {
  authForm.submitAuthForm.innerHTML = 'Acessar'
  authFormTitle.innerHTML = 'Acesse sua conta para continuar!'
  hideItem(access) 
  showItem(register)
  showItem(passwordReset) //show na tela de login.
  hideItem(loading)
}

// Simpplifica a exibição de elementos da página
function showItem(element) {
  element.style.display = 'block'
}

function hideItem(element) {
  element.style.display = 'none'
}

//Função destinada a apresenta a tela de usuário autenticados. Necessário desenvolver área logada
function showUserContent(user) {
  console.log(user)
  if(user.providerData[0].providerId != 'password'){
    emailVerified.innerHTML = 'Verificado por provador Confiável'
    hideItem(sendEmailVerificationDiv)
    } else{
      if(user.emailVerified) {
        emailVerified.innerHTML == 'e-mail Verificado'
        hideItem(sendEmailVerificationDiv)
      } else{
        emailVerified.innerHTML == 'e-mail não Verificado'
        showItem(sendEmailVerificationDiv)
      }
  }
  
  //Utilizando dados do Google Authentication
  userImg.src = user.photoURL ? user.photoURL : 'https://firebasestorage.googleapis.com/v0/b/studio-oz.appspot.com/o/public%2Fimg%2FunknownUser.png?alt=media&token=4a58a4ac-0845-4351-b3e3-2eafdb5d477c'
  userName.innerHTML = user.displayName ? user.displayName : 'Usuário Visitante'
  userEmail.innerHTML = user.email
  hideItem(auth)
  showItem(userContent)
}

//Função destinada a apresenta a tela de usuário não autenticados. Necessário desenvolver área institucional
function showAuth() {
  authForm.email.value = ""
  authForm.password.value = ""
  hideItem(userContent)
  showItem(auth)
}

//Central de tratamento de Erros para o Firebase
function showError(prefix, error) {
  console.log(error.code)
  hideItem(loading)

  switch (error.code) {
    case 'auth/invalid-email': alert(prefix + ' ' + 'Este não é um email válido!')
    break;
    case 'auth/email-already-in-use': alert(prefix  + ' ' + 'Este email já possui um cadastro!')
    break;
    case 'auth/weak-password': alert(prefix + ' ' + 'A senha precisa ter pelo menos 6 caracteres!')
    break;
    case 'auth/wrong-password': alert(prefix + ' ' + ' Senha ou Usuário inválido!')
    break;
    case 'auth/too-many-requests': alert(prefix + ' ' + ' Usuário está tentando logar várias vezes seguidas, por questão de segurança aguarde 1 min e tente novamente!')
    break;
    default: alert(prefix + ' ' + error.message)
  }
}

//Atributos extras para melhoria da experiência do cliente.
var actionCodeSettings = {
  url: 'https://studio-oz.web.app/'
}

//Função para atualizar foto do usuário