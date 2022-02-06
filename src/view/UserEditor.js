import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";

export default function UserEditor({
  onSubmit,
  editedUser,
  isLoading,
  requiredOnly = false,
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState(editedUser);
  const handleChange = (key) => (event) => {
    setUser((u) => ({ ...u, [key]: event.target.value }));
  };

  const handleAddressChange = (key) => (event) => {
    console.log(key, event);
    setUser((u) => ({
      ...u,
      address: { ...u.address, [key]: event.target.value },
    }));
  };

  const handleCompanyChange = (key) => (event) => {
    setUser((u) => ({
      ...u,
      company: { ...u.company, [key]: event.target.value },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(user);
  };

  const cancel = () => navigate("/");

  return (
    <Stack spacing={3} component="form" sx={{ p: 2 }} onSubmit={handleSubmit}>
      <Typography variant="h4" component="h2">
        Form
      </Typography>
      <Stack spacing={2}>
        <TextField
          required
          label="Name"
          type="text"
          id="name"
          name="name"
          value={user?.name || ""}
          onChange={handleChange("name")}
        />

        <TextField
          required
          label="Email"
          type="email"
          id="email"
          name="email"
          value={user?.email || ""}
          onChange={handleChange("email")}
        />
        {!requiredOnly && (
          <>
            <TextField
              label="Username"
              type="text"
              id="username"
              name="username"
              value={user?.username || ""}
              onChange={handleChange("username")}
            />
            <TextField
              label="Phone"
              type="tel"
              id="phone"
              name="phone"
              value={user?.phone || ""}
              onChange={handleChange("phone")}
            />

            <TextField
              label="Website"
              type="text"
              id="website"
              name="website"
              value={user?.website || ""}
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
                  value={user?.address?.street || ""}
                  onChange={handleAddressChange("street")}
                />

                <TextField
                  label="Suite"
                  type="text"
                  id="suite"
                  name="suite"
                  value={user?.address?.suite || ""}
                  onChange={handleAddressChange("suite")}
                />

                <TextField
                  label="City"
                  type="text"
                  id="city"
                  name="city"
                  value={user?.address?.city || ""}
                  onChange={handleAddressChange("city")}
                />

                <TextField
                  label="Zipcode"
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  value={user?.address?.zipcode || ""}
                  onChange={handleAddressChange("zipcode")}
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
                  value={user?.company?.name || ""}
                  onChange={handleCompanyChange("name")}
                />
                <TextField
                  label="Catch phrase"
                  type="text"
                  id="catchPhrase"
                  name="catchPhrase"
                  value={user?.company?.catchPhrase || ""}
                  onChange={handleCompanyChange("catchPhrase")}
                />

                <TextField
                  label="BS"
                  type="text"
                  id="bs"
                  name="bs"
                  value={user?.company?.bs || ""}
                  onChange={handleCompanyChange("bs")}
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
