import Swal from "sweetalert2";

const Success = () => {
  Swal.fire({
    title: "Success!",
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
export { Success, ErrorAlert };
