import { Button, Stack, Autocomplete, TextField, Paper } from "@mui/material";
import React from "react";
export default function StatusSorting({ data, searchUser }) {
  return (
    <Stack direction="row" spacing={1}>
      <Paper sx={{ width: "100%" }} elevation={0}>
        <Autocomplete
          size="small"
          options={data.map((option) => option.name)}
          onChange={(event, newValue) => {
            searchUser(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              fullWidth
              color="textFielBorderColor"
              placeholder="Filter by name"
            />
          )}
        />
      </Paper>

      <Button
        variant="outlined"
        size="small"
        type="button"
        color="secondary"
        onClick={() => searchUser(" ")}
      >
        All
      </Button>
    </Stack>
  );
}
