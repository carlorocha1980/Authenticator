// Como traduzir no código as informações de autenticação do Firebase, permite uso de multilanguage.
firebase.auth().languageCode = "pt-BR"
// Função que trata a submissão do formulário de autenticação
authForm.onsubmit = function(event) {
  showItem(loading) /*esta função será apresentada sempre que for necessário apresentar o icon Loading*/
  event.preventDefault()
  if (authForm.submitAuthForm.innerHTML == 'Acessar') {
      firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error){
            showError('Falha no acesso:' , error)
      })
  } else {
          firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).then(function (user) {
            alert ('Usuário cadastrado com Sucesso!')  
            console.log(user)
          }).catch(function (error){
              showError('Falha no Cadastro:' , error)
              console.log(error)
          })
  }
}

/* teremos dois estados para usuário, auth e noauth
Função para validar o status do usuário, utilizando um função anônima
A aplicação desta função permite a retirada do .then do User ".then(function (user)" para efeito de estudo vira comentário */
// função que centraliza e trata a autenticação
firebase.auth().onAuthStateChanged((user) => {
        hideItem(loading)
        if (user) {
            showUserContent(user)
            console.log('Usuário Autenticado')
            console.log(user)
        }
        else {
            showAuth()
            console.log('Usuário não não atenticado')
        }
    })

//Função que permite ao usuário deslogar do App, catch importante para captura erros
function signOut() {
  firebase.auth().signOut().catch(function(error) {
      showError('Falha no logout:' , error)
      console.log(user)
      console.log('Não foi possivel deslogar!')
      console.log(error)
  }).finally(function (){
      hideItem(loading)
  })
}
  
//Função que permite a validação do email do usuário
function sendEmailVerification() {
    var user = firebase.auth().currentUser
    showItem(loading)
    user.sendEmailVerification(actionCodeSettings).then(function() {
        alert(`Email de verificação enviado para, ${user.email}, verifique sua caixa de spam!`)
        console.log(sendEmailVerification)
    }).catch(function(erro){
        showError('Erro ao enviar o email de verificação!' , error)
    }).finally(function (){
        hideItem(loading)
    })
}

//Função que permite reset de senha
function sendPasswordResetEmail() {
    var email = prompt('Insira seu email para redefinir sua senha!', authForm.email.value)
    if (email) {
        showItem(loading)
        firebase.auth().sendPasswordResetEmail(email, actionCodeSettings).then(function () {
            alert(`Email de redefinição de senha enviado para, ${email}, verifique sua caixa de spam!`)
        }).catch(function(error) {
            showError('Erro ao enviar o email redefinição de senha!' , error)
            //alert('Erro ao enviar o email redefinição de senha!')
            console.log(error)
        }).finally(function () {
            hideItem(loading)
            })
    }else {
        alert('É necessário preencher o campo email redefinição de senha!')
    }
}

//Função autenticação com Google
function signInWithGoogle() {
    showItem(loading)
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function(error){
        alert('Erro no login com Google Account')
        console.log(error)
        hideItem(loading)
        showError('Falha no login com Google Account' , error)
    })
}

//Função autenticação com GitHub
function signInWithGithub() {
    showItem(loading)
    firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider()).catch(function(error){
        alert('Erro no login com GitHub Account')
        console.log(error)
        hideItem(loading)
        showError('Erro ao enviar o email redefinição de senha!' , error)
    })
}

//Função autenticação com Facebook
function signInWithFacebook() {
    showItem(loading)
    firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).catch(function(error){
        alert('Erro no login com Facebook')
        console.log(error)
        hideItem(loading)
        showError('Erro ao enviar o email redefinição de senha!' , error)
    })
}

//Função para alterar user information
function updateUserInfo() {
    var user = firebase.auth().currentUser
    var newUserName = prompt('Informe um novo nome de usuário', userName.innerHTML)
    if (newUserName) {
        userName.innerHTML = newUserName
        firebase.auth().currentUser.updateProfile({
            displayName: newUserName
        }).catch(function(error) {
            alert('Houve um erro na atualização do nome')
            console.log(error)
            hideItem(loading)
            showError('Erro ao enviar o email redefinição de senha!' , error)
        })
    }else {
        alert('O nome do usuário não pode estar vazio!')
        console.log(error)
    }
}

//Função para excluir conta de usuário da base de dados do Firebase
function deleteUserAccount() {
    showItem(loading)
    var user = firebase.auth().currentUser
    var confirmation = confirm('Você realmente deseja excluir a sua conta? Seu histórico será perdido!')
    var secondConfirmation = confirm('Você tem certeza? Esta ação não poderá ser desfeita!')
    if (secondConfirmation) {
        firebase.auth().currentUser.delete().then(function () {
            alert('Conta excluída com sucesso!')
        }).finally(function() {
            hideItem(loading)
        })
    }else {
        alert('Não foi possível excluir seu usuário!')
        hideItem(loading)
    }
}