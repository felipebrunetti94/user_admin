import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function UserEditor({
  updateField,
  onSubmit,
  user,
  cancel,
  isLoading,
  errors,
  requiredOnly = false,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };
  const handleChange = (fieldname) => (event) => {
    updateField({ fieldname, value: event.target.value });
  };

  return (
    <Stack spacing={3} component="form" sx={{ p: 2 }} onSubmit={handleSubmit}>
      <Typography variant="h4" component="h2">
        Form
      </Typography>
      <Stack spacing={2}>
        <TextField
          required
          error={!!errors["name"]}
          helperText={errors["name"]}
          label="Name"
          type="text"
          id="name"
          name="name"
          value={user.name || ""}
          onChange={handleChange("name")}
        />

        <TextField
          required
          error={!!errors["email"]}
          helperText={errors["email"]}
          label="Email"
          type="email"
          id="email"
          name="email"
          value={user.email || ""}
          onChange={handleChange("email")}
        />
        {!requiredOnly && (
          <>
            <TextField
              label="Username"
              type="text"
              id="username"
              name="username"
              value={user.username || ""}
              onChange={handleChange("username")}
            />
            <TextField
              label="Phone"
              type="tel"
              id="phone"
              name="phone"
              value={user.phone || ""}
              onChange={handleChange("phone")}
            />

            <TextField
              label="Website"
              type="text"
              id="website"
              name="website"
              value={user.website || ""}
              onChange={handleChange("website")}
            />

            <FormControl component="fieldset" variant="filled" disabled>
              <Stack spacing={2}>
                <FormLabel component="legend">Address</FormLabel>
                <TextField
                  label="Street"
                  type="text"
                  id="street"
                  name="street"
                  value={user.address.street || ""}
                  onChange={handleChange("street")}
                />

                <TextField
                  label="Suite"
                  type="text"
                  id="suite"
                  name="suite"
                  value={user.address.suite || ""}
                  onChange={handleChange("suite")}
                />

                <TextField
                  label="City"
                  type="text"
                  id="city"
                  name="city"
                  value={user.address.city || ""}
                  onChange={handleChange("city")}
                />

                <TextField
                  label="Zipcode"
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  value={user.address.zipcode || ""}
                  onChange={handleChange("zipcode")}
                />
              </Stack>
            </FormControl>

            <FormControl component="fieldset" variant="filled" disabled>
              <Stack spacing={2}>
                <FormLabel component="legend">Company</FormLabel>
                <TextField
                  label="Name"
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={user.company.name || ""}
                  onChange={handleChange("name")}
                />
                <TextField
                  label="Catch phrase"
                  type="text"
                  id="catchPhrase"
                  name="catchPhrase"
                  value={user.company.catchPhrase || ""}
                  onChange={handleChange("catchPhrase")}
                />

                <TextField
                  label="BS"
                  type="text"
                  id="bs"
                  name="bs"
                  value={user.company.bs || ""}
                  onChange={handleChange("bs")}
                />
              </Stack>
            </FormControl>
          </>
        )}
      </Stack>
      <Stack justifyContent="flex-end" direction="row" spacing={2}>
        <Button
          disabled={isLoading}
          variant="outlined"
          size="small"
          color="error"
          name="cancel"
          onClick={cancel}
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          variant="contained"
          size="small"
          color="success"
          name="submit"
          type="submit"
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
