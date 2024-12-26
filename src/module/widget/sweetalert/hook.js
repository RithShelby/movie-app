import Swal from "sweetalert2";

const SuccessAlert = ({title,text}) => {
  Swal.fire({
    title: title,
    text: text,
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
