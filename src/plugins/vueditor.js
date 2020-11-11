import Vue from "vue";
import Vueditor from "vueditor";
import "vueditor/dist/style/vueditor.min.css";

let config = {
  toolbar: [
    "removeFormat",
    "undo",
    "|",
    "elements",
    "fontName",
    "fontSize",
    "foreColor",
    "backColor",
    "|",
    "bold",
    "italic",
    "underline",
    "strikeThrough",
    "links",
    "|",
    "subscript",
    "superscript",
    "|",
    "justifyLeft",
    "justifyCenter",
    "justifyRight",
    "justifyFull",
    "|",
    "indent",
    "outdent",
    "insertOrderedList",
    "insertUnorderedList",
    "|",
    "code",
    "sourceCode",
    "switchView",
  ],
  fontName: [
    { val: "arial black" },
    { val: "times new roman" },
    { val: "Courier New" },
  ],
  fontSize: [
    "12px",
    "14px",
    "16px",
    "18px",
    "0.8rem",
    "1.0rem",
    "1.2rem",
    "1.5rem",
    "2.0rem",
  ],
};

Vue.use(Vueditor, config);

export default Vueditor;
