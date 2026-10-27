<!-- filepath: e:\ckeditor5-vue-example-main-2nd\vee-validate-example\src\views\VeeValidateExam.vue -->
<template>
  <div>
    <h1>VeeValidate & Yup Example</h1>
    <form @submit.prevent="handleSubmit(onSubmit)">
      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="name" type="text" />
        <span v-if="nameError">{{ nameError }}</span>
      </div>

      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" />
        <span v-if="emailError">{{ emailError }}</span>
      </div>

      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" />
        <span v-if="passwordError">{{ passwordError }}</span>
      </div>

      <button type="submit" @click="onSubmit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

// 유효성 검사 스키마 정의
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

// vee-validate의 useForm 훅 사용
const { handleSubmit } = useForm({
  validationSchema: schema,
})

// 각 필드 정의
const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

// 폼 제출 핸들러
const onSubmit = (formValues: any) => {
  console.log('Form Submitted:', formValues)
  alert('Form Submitted Successfully!')
}
</script>

<style scoped>
h1 {
  color: #333;
}
form {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
div {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
span {
  color: red;
  font-size: 0.9em;
}
button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>