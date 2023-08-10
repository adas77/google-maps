import axios from "axios";
import CSV_FORM_CONFIG from "../utils/consts";

const mapService = {
  getDefaultCSV: async () => {
    try {
      const res = await axios.get("/api");
      const data: Pair[] = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  uploadCSV: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append(CSV_FORM_CONFIG.form_key, file);
      const res = await axios.post("/api", formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
      const data: Pair[] = await res.data;
      return data;
    } catch (err) {
      console.error(err);
    }
  },
};

export default mapService;
