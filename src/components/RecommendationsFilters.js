import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

import FiltersContext from "../context/filters-context";
import { scope, holiday, audience, outInDoors } from "../services/tags-lists";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
}));

const RecommendationsFilters = () => {
  const { filters, filtersDispatch } = useContext(FiltersContext);
  console.log("RecommendationsFilters--- filters", filters);
  const classes = useStyles();

  const handleChange = (event, type) => {
    console.log("@@@handleChange---event", event);
    filtersDispatch({
      type,
      filters: event.target.value,
    });
  };

  return (
    <div>

      <FormControl className={classes.formControl}>
        <InputLabel id="scope-filter">תחום</InputLabel>
        {/* P.Z: Please see my comment on SignUpPage:99 */}
        <Select
          labelId="scope-filter"
          id="scope-filter"
          multiple
          value={filters.tags1}
          onChange={(e) => handleChange(e, "SET_TAGS1")}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
        >
          {scope.map((scopeItem) => (
            <MenuItem key={scopeItem.value} value={scopeItem.value}>
              <Checkbox checked={filters.tags1.indexOf(scopeItem.value) > -1} />
              <ListItemText primary={scopeItem.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="audience-filter">קהל יעד</InputLabel>
        <Select
          labelId="audience-filter"
          id="audience-filter"
          multiple
          value={filters.tags2}
          onChange={(e) => handleChange(e, "SET_TAGS2")}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
        >
          {audience.map((audienceItem) => (
            <MenuItem key={audienceItem.value} value={audienceItem.value}>
              <Checkbox
                checked={filters.tags2.indexOf(audienceItem.value) > -1}
              />
              <ListItemText primary={audienceItem.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="holiday-filter">חג</InputLabel>
        <Select
          labelId="holiday-filter"
          id="holiday-filter"
          multiple
          value={filters.tags3}
          onChange={(e) => handleChange(e, "SET_TAGS3")}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
        >
          {holiday.map((holidayItem) => (
            <MenuItem key={holidayItem.value} value={holidayItem.value}>
              <Checkbox
                checked={filters.tags3.indexOf(holidayItem.value) > -1}
              />
              <ListItemText primary={holidayItem.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="outdoor-filter">בפנים או בחוץ</InputLabel>
        <Select
          labelId="outdoor-filter"
          id="outdoor-filter"
          multiple
          value={filters.tags4}
          onChange={(e) => handleChange(e, "SET_TAGS4")}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
        >
          {outInDoors.map((outInDoorsItem) => (
            <MenuItem key={outInDoorsItem.value} value={outInDoorsItem.value}>
              <Checkbox
                checked={filters.tags4.indexOf(outInDoorsItem.value) > -1}
              />
              <ListItemText primary={outInDoorsItem.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export { RecommendationsFilters as default };
