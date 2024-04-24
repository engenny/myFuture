<template>
  <div class="card">
    <div class="form-container">
      <div class="currentStepStyle">
        <p>Etapa {{ currentStep }} de 4</p>
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
          <input type="checkbox" v-model="formData.isIndividual"> Pessoa física
        </label>
        <label>
          <input type="checkbox" v-model="formData.isLegalEntity"> Pessoa Juridica
        </label>
      </div>
    </div>
    <div v-if="currentStep === 2 && formData.isIndividual" class="step2-container">
      <!-- Renderização condicional dos campos de entrada para pessoa física -->
      <span class="labelTitle">Nome</span>
      <input type="text" class="input" v-model="formData.name">
      <span class="labelTitle">CPF</span>
      <input type="text" class="input" v-model="formData.cpf">
      <span class="labelTitle">Data de Nascimento</span>
      <input type="date" class="input" v-model="formData.birthdate">
      <span class="labelTitle">Telefone</span>
      <input type="tel" class="input" v-model="formData.phone">
    </div>
    <div v-if="currentStep === 2 && formData.isLegalEntity" class="step2-container">
      <!-- Renderização condicional dos campos de entrada para pessoa jurídica -->
      <span class="labelTitle">Razão Social</span>
      <input type="text" class="input" v-model="formData.companyName">
      <span class="labelTitle">CNPJ</span>
      <input type="text" class="input" v-model="formData.cnpj">
      <span class="labelTitle">Data de Abertura</span>
      <input type="date" class="input" v-model="formData.openingDate">
      <span class="labelTitle">Telefone</span>
      <input type="tel" class="input" v-model="formData.phone">
    </div>
    <div v-if="currentStep === 3">
      <p class="label">Defina uma senha:</p>
      <input type="password" class="input" v-model="formData.password" placeholder="Senha">
    </div>
    <div v-if="currentStep === 4">
      <div class="step4-container">
        <span class="label">Email: {{ formData.email }}</span>
        <template v-if="formData.isIndividual">
          <span class="label">Nome: {{ formData.name }}</span>
          <span class="label">CPF: {{ formData.cpf }}</span>
          <span class="label">Data de Nascimento: {{ formData.birthdate }}</span>
        </template>
        <template v-else-if="formData.isLegalEntity">
          <span class="label">Razão Social: {{ formData.companyName }}</span>
          <span class="label">CNPJ: {{ formData.cnpj }}</span>
          <span class="label">Data de Abertura: {{ formData.openingDate }}</span>
        </template>
        <span class="label">Telefone: {{ formData.phone }}</span>
        <span class="label">Senha: {{ formData.password }}</span>
      </div>
    </div>
    <!-- Botões de navegação -->
    <div class="btns">
      <button @click="previousStep" v-if="currentStep !== 1" class="btn-back">
        Voltar
      </button>
      <button @click="nextStep" v-if="currentStep !== 4" class="btn-continue">
        Continuar
      </button>
    </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'FormCreateUser',
  setup() {
    const currentStep = ref(1);
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
      'Revisão das Informações'
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
      }
    };

    const previousStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    };

    const validateEmail = (email) => {
      // Utilize uma expressão regular para validar o formato do email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    return {
      currentStep,
      formData,
      stepTitles,
      nextStep,
      previousStep,
    };
  }
};
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 155px 140px;
  max-width: 500px;
  margin: 0 auto;
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 28vh;
}

.btns {
  display: flex;
  justify-content: center;
}

.btn-back,
.btn-continue {
  font-family: sans-serif;
  background-color: #FD8101;
  font-size: 20px;
  color: white;
  border-style: none;
  border-radius: 8px;
  padding: 8px 12px;
  margin-top: 20px;
  margin-left: 8px;
}

.checkbox-container {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  font-family: sans-serif;
  font-size: 14px;
  color: #000000;
}

.input {
  border-radius: 8px;
  margin-top: 8px;
  border: 1px solid #f2be94;
  width: 100%; /* Largura máxima */
  max-width: 400px; /* Defina uma largura máxima */
  padding: 8px 17px;
}

.label {
  font-family: sans-serif;
  font-size: 14px;
  color: #000000;
}

.labelTitle {
  font-family: sans-serif;
  font-size: 14px;
  color: #000000;
  margin-top: 8px;
}

.title {
  font-family: sans-serif;
  font-size: 28px;
  color: #000000;
}

.currentStepStyle {
  font-family: sans-serif;
  font-size: 14px;
  color: #000000;
}

.step2-container {
  display: flex;
  flex-direction: column;
}

.step4-container {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
}
</style>
