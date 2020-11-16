<template>
  <section>
    <success-dialog :isSent="isSent" v-on:isSentFalse="isSent = false" />
    <v-form class="mt-5" ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="userTeamNameFromRole"
        label="Ekip"
        readonly
        required
      ></v-text-field>
      <v-text-field
        v-model="title"
        :counter="40"
        :rules="titleRules"
        label="Ödev Başlığı"
        required
      ></v-text-field>
      <v-text-field
        v-model="shortDesc"
        :counter="40"
        :rules="shortDescRules"
        label="Ödev Açıklaması (Kısa)"
        required
      ></v-text-field>
      <v-row>
        <v-col cols="12" sm="3">
          <v-checkbox v-model="requiresFile">
            <template v-slot:label>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-on="on">Ödev dosyası gerekli</div>
                </template>
                Seçilmezse dosya alınmayacak
              </v-tooltip>
            </template>
          </v-checkbox>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="score"
            append-icon="mdi-star"
            :rules="scoreRules"
            label="Ödev Puanı"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-dialog
            ref="startDialog"
            v-model="startModal"
            :return-value.sync="startDate"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startDate"
                label="Başlangıç Tarihi"
                hint="Başlangıç tarihini değiştiremezsiniz"
                persistent-hint
                append-icon="mdi-calendar-today"
                readonly
                v-bind="attrs"
                v-on="on"
                @click:append="startDate = defaultDate"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="startDate"
              readonly
              scrollable
              :show-current="true"
              locale="tr-tr"
              :allowed-dates="allowedStartDates"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="startModal = false">
                İptal
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.startDialog.save(startDate)"
              >
                Tamam
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12" sm="3">
          <v-dialog
            ref="endDialog"
            v-model="endModal"
            :return-value.sync="endDate"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endDate"
                label="Bitiş Tarihi"
                hint="Başlangıç tarihine gitmek için takvim ikonuna tıklayın"
                persistent-hint
                append-icon="mdi-calendar-today"
                readonly
                v-bind="attrs"
                v-on="on"
                @click:append="endDate = startDate"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="endDate"
              scrollable
              :show-current="true"
              locale="tr-tr"
              :allowed-dates="allowedEndDates"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="endModal = false">
                İptal
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.endDialog.save(endDate)"
              >
                Tamam
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>

      <div class="my-3">Ödev Tanımı</div>

      <tiptap-vuetify v-model="content" :extensions="extensions" />

      <v-row>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mt-4 mr-3"
          @click="addHomeworkWithData()"
          :loading="isLoading"
        >
          Oluştur
        </v-btn>
      </v-row>
    </v-form>
  </section>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Image,
  Underline,
  Code,
  CodeBlock,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";
import SuccessDialog from "@/components/SuccessDialog";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AddHomeworkForm",
  components: {
    SuccessDialog,
    TiptapVuetify,
  },

  computed: {
    ...mapGetters("auth", ["getUser"]),
    ...mapGetters("teamConfig", ["getTeamConfig"]),
    userTeamNameFromRole() {
      return this.getTeamConfig.teams.get(this.getUser.role);
    },
    userTeamIdFromRole() {
      return this.getTeamConfig.ids.get(this.getUser.role);
    },
    defaultDate() {
      return moment().format("YYYY-MM-DD");
    },

    extensions() {
      return [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Image,
        Italic,
        ListItem,
        BulletList,
        OrderedList,

        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        Code,
        CodeBlock,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ];
    },
  },

  data() {
    return {
      valid: true,
      title: "",
      titleRules: [
        (v) => !!v || "Ödev Başlığı zorunludur",
        (v) => v.length <= 40 || "Ödev başlığı en fazla 40 karakter olmalıdır",
      ],
      score: 5,
      scoreRules: [
        (v) => !!v || "Ödev Puanı zorunludur",
        (v) => Number.isInteger(Number(v)) || "Ödev Puanı tam sayı olmalıdır",
        (v) =>
          (Number(v) > 0 && Number(v) <= 100) ||
          "Ödev Puanı 0 ile 100 arasında olmalıdır",
      ],

      shortDesc: "Kısa bir açıklama",
      shortDescRules: [
        (v) => !!v || "Kısa açıklama zorunludur",
        (v) => v.length <= 40 || "Kısa açıklama en fazla 40 karakter olmalıdır",
      ],

      checkbox: false,
      startModal: false,
      endModal: false,
      startDate: null,
      endDate: null,
      description: "Hello",
      isLoading: false,
      isSent: false,
      requiresFile: false,

      content: ``,
    };
  },

  methods: {
    ...mapActions("homeworks", ["addHomework"]),
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    addHomeworkWithData() {
      this.validate();
      this.isLoading = true;
      const homeWork = {
        title: this.title,
        score: parseInt(this.score),
        startDate: this.startDate,
        endDate: this.endDate,
        description: this.content,
        shortDesc: this.shortDesc,
        isFileRequired: this.requiresFile,
        teamId: this.userTeamIdFromRole,
      };
      this.addHomework(homeWork)
        .then(() => {
          this.isLoading = false;
          this.isSent = true;
        })
        .catch((err) => console.log(err));
    },

    allowedStartDates(val) {
      const today = moment().clone().hour(0).minute(0).second(0).millisecond(0);
      const date = moment(val);

      return date >= today;
    },
    allowedEndDates(val) {
      const today = moment(this.startDate)
        .clone()
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0);
      const date = moment(val);

      return date >= today;
    },
  },

  watch: {
    startDate: function (newDate) {
      if (moment(newDate) > moment(this.endDate)) {
        this.endDate = newDate;
      }
    },
  },

  created() {
    this.startDate = this.endDate = this.defaultDate;
    this.title = `Yeni ${this.userTeamNameFromRole} Ödevi`;
  },
};
</script>

<style>
.vueditor {
  min-height: 350px !important;
}
</style>