import { toast, Slide, Theme } from "react-toastify";
export default class NovaNotification {
  message: any;
  theme: string;
  configProperties: object;
  icon: any

  constructor(message: any, theme: Theme, icon: any = "") {
    this.message = message,
    this.theme = theme,
    this.icon = icon
    this.configProperties = 
    {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        theme: this.theme,
        closeOnClick: false,
        draggable: false,
        pauseOnHover: true,
        transition: Slide,
        icon: this.icon == "" ? true : icon
      };

  }
  successNotification = () => toast.success(this.message, this.configProperties);

  errorNotification = () => toast.error(this.message, this.configProperties);

  warningNotification = () => toast.warning(this.message, this.configProperties);
}
