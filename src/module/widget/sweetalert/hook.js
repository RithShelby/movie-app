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
    title: "Please try again !",
    text: "Check your email & password again !",
    icon: "error",
  });
};
export { SuccessAlert, ErrorAlert };
