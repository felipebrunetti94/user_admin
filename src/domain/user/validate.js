export default function validate(user) {
  let errors = { empty: true };

  if (user.name === "") {
    errors.empty = false;
    errors.name = "Name is required";
  }
  if (user.email === "") {
    errors.empty = false;
    errors.email = "Email is required";
  }

  return errors;
}
