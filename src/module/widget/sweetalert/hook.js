import Swal from "sweetalert2";

const SuccessAlert = () => {
  Swal.fire({
    title: "Payment Success 🙏🏼",
    text: "You clicked the button!",
    icon: "success",
  });
};
const ErrorAlert = () => {
  Swal.fire({
    title: "Try Again !",
    text: "Something went wrong!",
    icon: "error",
  });
};
export { SuccessAlert, ErrorAlert };
