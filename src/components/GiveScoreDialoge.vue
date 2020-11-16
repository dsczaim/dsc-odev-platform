<template>
  <v-dialog v-model="dialoge" persistent max-width="290">
    <v-card color="white" class="info--text">
      <v-card-title class="headline"> Ödeve Puan Ver: </v-card-title>
      <v-card-subtitle class="mt-1">
        -{{ item && item.homeworkTitle ? item.homeworkTitle : "" }} <br />
        *{{ item && item.userFullName ? item.userFullName : "" }}
      </v-card-subtitle>
      <v-card-text class="black--text">
        Ödev puanı değiştirmek mümkün olsa da maliyetli bir işlemdir. Bu yüzden
        puanları değiştirmeye ihtiyaç kalmayacak şekilde önceden belirlemeye
        özen gösterelim.
        <v-form v-model="valid" class="mt-4" ref="attendForm">
          <v-text-field
            outlined
            required
            :hint="
              item && item.homeworkScore
                ? `Puan 0 ile ${item.homeworkScore} aralığında olmalıdır`
                : ''
            "
            persistent-hint
            v-model="score"
            label="Ödev puanı"
            :rules="scoreRules"
          >
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="isUploading"
          color="info"
          text
          @click="closeDialoge('cancel')"
        >
          İptal
        </v-btn>
        <v-btn
          readOnly
          text
          color="info"
          :disabled="!valid"
          :loading="isUploading"
          @click="giveScr()"
        >
          Gönder
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "GiveScoreDialog",
  data() {
    return {
      isUploading: false,
      valid: true,
      item: null,
      score: null,
      scoreRules: [
        (v) => !!v || "Puan girmek zorunludur",
        (v) =>
          (!!v && parseInt(v) >= 0 && parseInt(v) <= this.item.homeworkScore) ||
          `Puan 0 ile ${this.item.homeworkScore} aralığında olmalıdır`,
      ],
    };
  },

  props: {
    dialoge: Boolean,
    title: String,
  },

  methods: {
    ...mapActions("attendance", ["giveScore"]),
    giveScr() {
      this.isUploading = true;
      if (this.item && this.item.homeworkId && this.item.userId && this.score)
        this.giveScore({
          homeworkId: this.item.homeworkId,
          userId: this.item.userId,
          score: this.score,
        }).then(() => {
          this.isUploading = false;
          this.closeDialoge("sent");
        });
    },
    closeDialoge(type) {
      this.reset();
      this.resetValidation();
      this.$emit("closeDialoge", type);
    },
    validate() {
      this.$refs.attendForm.validate();
    },
    reset() {
      this.$refs.attendForm.reset();
    },
    resetValidation() {
      this.$refs.attendForm.resetValidation();
    },
  },
};
</script>
