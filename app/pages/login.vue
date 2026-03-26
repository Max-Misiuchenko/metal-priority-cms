<script setup lang="ts">
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginSchema),
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const api = useApi();
const { refresh } = useAuth();

const onSubmit = handleSubmit(async (values) => {
  await api("/api/auth/login", { method: "POST", body: values });
  await refresh();
  await navigateTo("/");
});
</script>

<template>
  <h1>Login Page</h1>
  <form @submit.prevent="onSubmit">
    <div>
      <input v-model="email" v-bind="emailAttrs" type="email" />
      <span>{{ errors.email }}</span>
    </div>
    <div>
      <input v-model="password" v-bind="passwordAttrs" type="password" />
      <span>{{ errors.password }}</span>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>
