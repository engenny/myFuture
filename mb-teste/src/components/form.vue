<template>
  <div class="card">
    <div class="form-container">
      <div class="currentStepStyle">
        <p>Etapa {{ currentStep }} de 5</p>
      </div>
    <div>
      <span class="title">{{ stepTitles[currentStep - 1] }}</span>
    </div>

    <!-- Cadastro email -->
    <div v-if="currentStep === 1">
      <p class="label">Endereço de email:</p>
      <input type="text" v-model="formData.email" class="input">
    </div>

    <!-- Checkbox para informar qual o tipo de cadastro -->
    <div v-if="currentStep === 1">
      <div class="checkbox-container">
        <label>
          <input type="radio" v-model="formData.isIndividual" @change="uncheckLegalEntity"> Pessoa física
        </label>
        <label>
          <input type="radio" v-model="formData.isLegalEntity" @change="uncheckIndividual"> Pessoa Juridica
        </label>
      </div>
    </div>

    <div v-if="currentStep === 2 && formData.isIndividual" class="step2-container">
      <!-- Renderização condicional dos campos de entrada para pessoa física -->
      <span class="labelTitle">Nome</span>
      <input type="text" class="input" v-model="formData.name">
      <span class="labelTitle">CPF</span>
      <input type="text" class="input" v-model="formData.cpf" placeholder="XXX-XXX-XXX-XX" @input="formatCPF">
      <span class="labelTitle">Data de Nascimento</span>
      <input type="text" class="input" v-model="formData.birthdate" placeholder="DD/MM/YYYY" @input="formatDate('birthdate')">
      <span class="labelTitle">Telefone</span>
      <input type="tel" class="input" v-model="formData.phone" placeholder="(xx) xxxx-xxxxx" @input="formatPhone">
    </div>
    <div v-if="currentStep === 2 && formData.isLegalEntity" class="step2-container">
      <!-- Renderização condicional dos campos de entrada para pessoa jurídica -->
      <span class="labelTitle">Razão Social</span>
      <input type="text" class="input" v-model="formData.companyName">
      <span class="labelTitle">CNPJ</span>
      <input type="text" class="input" v-model="formData.cnpj" placeholder="XX.XXX.XXX/XXXX-XX" @input="formatCNPJ">
      <span class="labelTitle">Data de Abertura</span>
      <input type="text" class="input" v-model="formData.openingDate" placeholder="DD/MM/YYYY" @input="formatDate('openingDate')">
      <span class="labelTitle">Telefone</span>
      <input type="tel" class="input" v-model="formData.phone" placeholder="(xx) xxxx-xxxxx" @input="formatPhone">
    </div>

    <div v-if="currentStep === 3">
      <p class="label">Defina uma senha:</p>
      <input type="password" class="input" v-model="formData.password" placeholder="Senha">
      <span v-if="formData.password && formData.password.length < 8" class="error-message">
        <br>
        senha deve ter no mínimo 8 caracteres
      </span>
    </div>

    <div v-if="currentStep === 4">
      <div class="step4-container">
        <span class="labelTitleReview">Email:</span>
        <input type="text" class="input" v-model="formData.email" readonly>
        <template v-if="formData.isIndividual">
          <span class="labelTitleReview">Nome:</span>
          <input type="text" class="input" v-model="formData.name" readonly>
          <span class="labelTitleReview">Cpf:</span>
          <input type="text" class="input" v-model="formData.cpf" placeholder="XXX-XXX-XXX-XX" readonly>
          <span class="labelTitleReview">Data de nascimento:</span>
          <input type="text" class="input" v-model="formData.birthdate" placeholder="DD/MM/YYYY" readonly>
        </template>
        <template v-else-if="formData.isLegalEntity">
          <span class="labelTitleReview">Razão social:</span>
          <input type="text" class="input" v-model="formData.companyName" readonly>
          <span class="labelTitleReview">Cnpj</span>
          <input type="text" class="input" v-model="formData.cnpj" placeholder="XX.XXX.XXX/XXXX-XX" readonly>
          <span class="labelTitleReview">Data de nascimento:</span>
          <input type="text" class="input" v-model="formData.openingDate" placeholder="DD/MM/YYYY" readonly>
        </template>
        <span class="labelTitleReview">Telefone:</span>
        <input type="text" class="input" v-model="formData.phone" placeholder="(xx) xxxx-xxxx" readonly>
        <span class="labelTitleReview">Senha:</span>
        <input type="password" class="input" v-model="formData.password" placeholder="Senha" readonly>
        <span v-if="formData.password && formData.password.length < 8" class="error-message">
          <br>
          senha deve ter no mínimo 8 caracteres
        </span>
      </div>
    </div>

    <!-- Botões de navegação -->
    <div class="btns">
      <button @click="previousStep" v-if="currentStep !== 1 && currentStep !== 5" class="btn-back">
        Voltar
      </button>
      <button @click="nextStep" v-if="currentStep !== 4 && currentStep !== 5 && validateFields()" class="btn-continue">
        Continuar
      </button>
      <button @click="submitForm" v-if="currentStep === 4" class="btn-continue">
        Cadastrar
      </button>
        <div v-if="showSuccessMessage && currentStep === 5">
        <p class="success-message">Cadastro concluído com sucesso!</p>
        <img class="gifHappy" src="https://media.giphy.com/media/VIKa3CjZDCoymNcBY5/giphy.gif?cid=82a1493bnr9nysesmwadc9nik2dqnenq8p0z7fjrywivq5uf&ep=v1_gifs_trending&rid=giphy.gif&ct=g">
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import './formStyle.css';
// import { popostRegistrationUserst } from '../services/formCreateUserAuth'

export default {
  name: 'FormCreateUser',
  setup() {
    const currentStep = ref(1);
    const showSuccessMessage = ref(false);
    const formData = ref({
      email: '',
      isIndividual: false,
      isLegalEntity: false,
      name: '',
      cpf: '',
      birthdate: '',
      companyName: '',
      cnpj: '',
      openingDate: '',
      phone: '',
      password: ''
    });

    const stepTitles = [
      'Seja bem-vindo(a)!',
      'Informações Pessoais',
      'Senha de Acesso',
      'Revisão das Informações',
      'Cadastro finalizado, entraremos em contato para mais informações <3'
    ];

    const nextStep = () => {
      if (currentStep.value === 1) {
        if (validateEmail(formData.value.email)) {
          if (formData.value.isIndividual || formData.value.isLegalEntity) {
            currentStep.value++;
          } else {
            alert('Selecione pelo menos uma opção');
          }
        } else {
          alert('Por favor, insira um email válido.');
        }
      } else if (currentStep.value === 2) {
        currentStep.value++;
      } else if (currentStep.value === 3) {
        currentStep.value++;
      } else if (currentStep.value === 4) {
        submitForm()
      }
    };

    const previousStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    };

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validateDate = (dateString) => {
      const [day, month, year] = dateString.split('/').map(Number);

      if (isNaN(day) || isNaN(month) || isNaN(year)) return false;

      if (year < 1000 || year > 2024) return false;

      if (month < 1 || month > 12) return false;

      const daysInMonth = new Date(year, month, 0).getDate();
      if (day < 1 || day > daysInMonth) return false;

      return true;
    };

    const validateCNPJ = (cnpj) => {
      const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
      if (!cnpjRegex.test(cnpj)) return false;

      const digits = cnpj.replace(/\D/g, '');

      let sum = 0;
      let factor = 5;
      for (let i = 0; i < 12; i++) {
        sum += parseInt(digits.charAt(i)) * factor--;
        if (factor < 2) factor = 9;
      }
      let remainder = sum % 11;
      let digit = remainder < 2 ? 0 : 11 - remainder;
      if (parseInt(digits.charAt(12)) !== digit) return false;

      sum = 0;
      factor = 6;
      for (let i = 0; i < 13; i++) {
        sum += parseInt(digits.charAt(i)) * factor--;
        if (factor < 2) factor = 9;
      }
      remainder = sum % 11;
      digit = remainder < 2 ? 0 : 11 - remainder;
      if (parseInt(digits.charAt(13)) !== digit) return false;

      return true;
    };

    const formatCNPJ = () => {
      let value = formData.value.cnpj.replace(/\D/g, '');
      if (value.length > 14) {
        value = value.slice(0, 14);
      }

      formData.value.cnpj = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    };


    const formatCPF = () => {
      let value = formData.value.cpf.replace(/\D/g, '');
      if (value.length > 11) {
        value = value.slice(0, 11);
      }
      formData.value.cpf = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1-$2-$3-$4');
    };

    const formatDate = (fieldName) => {
      let value = formData.value[fieldName].replace(/\D/g, '');
      if (value.length > 8) {
        value = value.slice(0, 8);
      }

      if (fieldName === 'openingDate') {
        formData.value[fieldName] = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
      } else {
        formData.value[fieldName] = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
      }
    };

    const formatPhone = () => {
      let value = formData.value.phone.replace(/\D/g, '');

      if (value.length > 11) {
        value = value.slice(0, 11);
      }
    
      formData.value.phone = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    };

    const validatePhone = () => {
      return formData.value.phone.replace(/\D/g, '').length >= 10;
    };

    const validatePassword = () => {
      return formData.value.password.length >= 8;
    };

    const validateFields = () => {
      if (currentStep.value === 1) {
        return formData.value.email.trim() !== '' &&
              (formData.value.isIndividual || formData.value.isLegalEntity);
      } else if (currentStep.value === 2) {
        if (formData.value.isIndividual) {
          return formData.value.name.trim() !== '' &&
                formData.value.cpf.replace(/\D/g, '').length === 11 &&
                validateDate(formData.value.birthdate) && 
                formData.value.phone.replace(/\D/g, '').length === 11;
        } else if (formData.value.isLegalEntity) {
          return formData.value.companyName.trim() !== '' &&
                formData.value.cnpj.replace(/\D/g, '').length === 14 &&
                validateDate(formData.value.openingDate) && 
                formData.value.phone.replace(/\D/g, '').length === 11;
        }
      } else if (currentStep.value === 3) {
        return formData.value.password.trim() !== '';
      }

      return false;
    };

    const uncheckIndividual = () => {
      formData.value.isIndividual = false;
    };

    const uncheckLegalEntity = () => {
      formData.value.isLegalEntity = false;
    };

    const submitForm = async () => {
      try {
        // aqui seria a chamada se houvesse o back ativo
        // await popostRegistrationUserst(formData.value);

        formData.value = {
          email: '',
          isIndividual: false,
          isLegalEntity: false,
          name: '',
          cpf: '',
          birthdate: '',
          companyName: '',
          cnpj: '',
          openingDate: '',
          phone: '',
          password: ''
        };
        currentStep.value = 5;
        showSuccessMessage.value = true;
      } catch (error) {
        console.error('Erro ao enviar o formulário de registro, revise suas informações ou entre em contato com seu representante', error.message);
      }
    };

    return {
      currentStep,
      formData,
      stepTitles,
      nextStep,
      previousStep,
      uncheckIndividual,
      uncheckLegalEntity,
      validateFields,
      submitForm,
      showSuccessMessage,
      formatCPF,
      formatDate,
      formatPhone,
      validatePhone,
      validatePassword,
      formatCNPJ,
      validateCNPJ,
    };
  }
};
</script>

