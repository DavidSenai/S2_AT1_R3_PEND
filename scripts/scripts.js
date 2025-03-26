console.log("JS CONECTADO!");

// Selecionando os elementos do formulário
const formulario = document.getElementById("cadastroForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");
const celular = document.getElementById("celular");
const cpf = document.getElementById("cpf");
const rg = document.getElementById("rg");
const msgError = document.getElementsByClassName("msgError");

/* ------ FUNÇÃO PARA EXIBIR MENSAGENS DE ERRO ------ */
const createDisplayMsgError = (mensagem) => {
  msgError[0].textContent = mensagem;
};

/* ------ VERIFICA SE O NOME CONTÉM APENAS LETRAS ------ */
const checkNome = () => {
  const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  return nomeRegex.test(nome.value);
};

/* ------ VERIFICA SE O EMAIL É VÁLIDO ------ */
const checkEmail = (email) => {
  const dominiosValidos = ["gmail.com", "outlook.com", "hotmail.com"];
  const partesEmail = email.split("@");

  return (
    partesEmail.length === 2 &&
    dominiosValidos.includes(partesEmail[1].toLowerCase())
  );
};

/* ------ VERIFICA SE AS SENHAS SÃO IGUAIS ------ */
function checkPasswordMatch() {
  return senha.value === confirmarSenha.value;
}

/* ------ MÁSCARA PARA O TELEFONE ------ */
function maskPhoneNumber(event) {
  let celular = event.target.value;

  if (/[A-Za-zÀ-ÿ]/.test(celular)) {
    createDisplayMsgError("O celular deve conter apenas números!");
  } else {
    createDisplayMsgError("");
  }

  celular = celular.replace(/\D/g, "").substring(0, 11); // Remove caracteres não numéricos e limita a 11 dígitos

  if (celular.length > 2) {
    celular = `(${celular.substring(0, 2)}) ${celular.substring(2)}`;
  }
  if (celular.length > 10) {
    celular = celular.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3");
  }

  event.target.value = celular;
}

/* ------ VERIFICA A FORÇA DA SENHA ------ */
function checkPasswordStrength(senha) {
  if (!/[a-z]/.test(senha))
    return "A senha deve ter pelo menos uma letra minúscula!";
  if (!/[A-Z]/.test(senha))
    return "A senha deve ter pelo menos uma letra maiúscula!";
  if (!/[\W_]/.test(senha))
    return "A senha deve ter pelo menos um caractere especial!";
  if (!/\d/.test(senha)) return "A senha deve ter pelo menos um número!";
  if (senha.length < 8) return "A senha deve ter pelo menos 8 caracteres!";

  return null;
}

/* ------ VERIFICA E ENVIA OS DADOS DO FORMULÁRIO ------ */
function fetchDatas(event) {
  event.preventDefault();

  if (!checkNome()) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    return;
  }

  if (!checkEmail(email.value)) {
    createDisplayMsgError("O e-mail digitado não é válido!");
    return;
  }

  if (!checkPasswordMatch()) {
    createDisplayMsgError("As senhas digitadas não coincidem!");
    return;
  }

  const senhaError = checkPasswordStrength(senha.value);
  if (senhaError) {
    createDisplayMsgError(senhaError);
    return;
  }

  if (celular.value && /[A-Za-zÀ-ÿ]/.test(celular.value)) {
    createDisplayMsgError("O telefone deve conter apenas números");
    return;
  }

  const formData = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
    celular: celular.value,
    cpf: cpf.value,
    rg: rg.value,
  };

  console.log("Formulário Enviado: ", JSON.stringify(formData, null, 2));
}

/* ------ ANIMAÇÃO DE CHUVA ------ */
const rainFunction = () => {
  let rain = document.createElement("span");
  let cont_rain = document.querySelector(".container_rain");
  let left = Math.floor(Math.random() * (310 - 65) + 65);
  let duration = Math.random() * 5;

  rain.classList.add("rain");
  cont_rain.appendChild(rain);
  rain.style.left = left + "px";
  rain.style.animationDuration = 1 + duration;

  setTimeout(() => {
    cont_rain.removeChild(rain);
  }, 1500);
};

setInterval(rainFunction, 250);

/* ------ EVENTOS PARA VERIFICAÇÕES EM TEMPO REAL ------ */
nome.addEventListener("input", () => {
  createDisplayMsgError(
    nome.value && !checkNome()
      ? "O nome não pode conter números ou caracteres especiais!"
      : ""
  );
});

email.addEventListener("input", () => {
  createDisplayMsgError(
    email.value && !checkEmail(email.value)
      ? "O e-mail digitado não é válido!"
      : ""
  );
});

senha.addEventListener("input", () => {
  createDisplayMsgError(
    senha.value && checkPasswordStrength(senha.value)
      ? checkPasswordStrength(senha.value)
      : ""
  );
});

formulario.addEventListener("submit", fetchDatas);

celular.addEventListener("input", maskPhoneNumber);

/* ------ MÁSCARA PARA CPF ------ */
function mascaraCPF(event) {
  let cpf = event.target.value.replace(/\D/g, "").substring(0, 11);

  if (/[A-Za-zÀ-ÿ]/.test(event.target.value)) {
    createDisplayMsgError("O CPF deve conter apenas números!");
  } else {
    createDisplayMsgError("");
  }

  if (cpf.length > 9) {
    cpf = cpf
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  event.target.value = cpf;
}

/* ------ MÁSCARA PARA RG ------ */
function mascaraRG(event) {
  let rg = event.target.value.replace(/\D/g, "").substring(0, 9);

  if (/[A-Za-zÀ-ÿ]/.test(event.target.value)) {
    createDisplayMsgError("O RG deve conter apenas números!");
  } else {
    createDisplayMsgError("");
  }

  if (rg.length > 8) {
    rg = rg
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  event.target.value = rg;
}

/* ------ APLICANDO AS MÁSCARAS ------ */
rg.addEventListener("input", mascaraRG);
cpf.addEventListener("input", mascaraCPF);
