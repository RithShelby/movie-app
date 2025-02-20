import Swal from "sweetalert2";

const SuccessAlert = ({title,text}) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "success",
  });
};
const ErrorAlert = ({title,text}) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "error",
  });
};
export { SuccessAlert, ErrorAlert };
