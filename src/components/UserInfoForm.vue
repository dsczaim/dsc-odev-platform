<template>
  <v-container>
    <v-form
      ref="userInfoForm"
      v-model="valid"
      lazy-validation
      @submit.prevent="update"
      class="my-0"
    >
      <v-row justify="center" style="padding: 0">
        <v-col cols="12" md="6" class="my-0" style="margin: 0">
          <v-text-field
            outlined
            type="text"
            v-model="fullName"
            :rules="fullNameRules"
            label="Tam isminiz (Zorunlu)"
            hint="Tam isminizi girin ve ok sembolüne tıklayın"
            prepend-inner-icon="mdi-account"
            append-icon="mdi-arrow-right"
            @click:append="update()"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "UserInfoForm",
  data() {
    return {
      valid: true,
      fullName: null,
      fullNameRules: [
        (v) => !!v || "Bu alanı boş bırakamazsınız",
        (v) =>
          (!!v && v.length > 3) || "Tam isminiz 3 karakterden fazla olmalıdır",
      ],
    };
  },
  methods: {
    ...mapActions("auth", ["updateFullName"]),
    validate() {
      this.$refs.userInfoForm.validate();
    },

    update() {
      this.validate();
      if (this.fullName) {
        this.updateFullName(this.fullName).then();
      }
    },
  },
};
</script>

<style>
</style>