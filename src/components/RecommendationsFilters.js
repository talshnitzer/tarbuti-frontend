import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import FormLabel from "@material-ui/core/FormLabel";
import { ListItem } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

import FiltersContext from "../context/filters-context";
import { scope, holiday, audience, outInDoors } from "../services/tags-lists";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
  },
}));

const RecommendationsFilters = () => {
  const { filters, filtersDispatch } = useContext(FiltersContext);
  console.log("RecommendationsFilters--- filters", filters);

  const handleChange = (value, type, category) => {
    const currentIndex = category.indexOf(value);
    const newCheckedCategory = [...category];

    if (currentIndex === -1) {
      newCheckedCategory.push(value);
    } else {
      newCheckedCategory.splice(currentIndex, 1);
    }

    console.log("@@@handleChange---value", value);
    filtersDispatch({
      type,
      filters: newCheckedCategory,
    });
  };

  return (
    <div>
      <List>
        <ListItem>
          <CategorySelect
            title="תחום"
            category={filters.tags1}
            action="SET_TAGS1"
            categoryValues={scope}
            handleChange={handleChange}
          />
        </ListItem>

        <ListItem>
          <CategorySelect
            title="קהל יעד"
            category={filters.tags2}
            action="SET_TAGS2"
            categoryValues={audience}
            handleChange={handleChange}
          />
        </ListItem>
        <ListItem>
          <CategorySelect
            title="חג"
            category={filters.tags3}
            action="SET_TAGS3"
            categoryValues={holiday}
            handleChange={handleChange}
          />
        </ListItem>
        <ListItem>
          <CategorySelect
            title="בפנים או בחוץ"
            category={filters.tags4}
            action="SET_TAGS4"
            categoryValues={outInDoors}
            handleChange={handleChange}
          />
        </ListItem>
      </List>
    </div>
  );
};

const CategorySelect = ({
  title,
  category,
  action,
  categoryValues,
  handleChange,
}) => {
  const classes = useStyles();
  console.log(
    "CategorySelect---category---categoryValues---handleChange",
    category,
    categoryValues,
    handleChange
  );
  const [open, setOpen] = React.useState(false);

  const handleNestedClick = () => {
    setOpen(!open);
  };

  //()=>{handleChange(....)} this call syntax is necessery for React to call only upon onClick event firing
  return (
    <FormControl
      button
      onClick={handleNestedClick}
      className={classes.formControl}
    >
      <FormLabel component="legend">{title}</FormLabel>
      {open ? <ExpandLess /> : <ExpandMore />}
      <Collapse in={open} timeout="auto" unmountOnExit>
        {categoryValues.map((categoryValuesItem) => (
          <ListItem
            key={categoryValuesItem.value}
            onClick={() => {
              handleChange(categoryValuesItem.value, action, category);
            }}
          >
            <Checkbox
              checked={category.indexOf(categoryValuesItem.value) > -1}
            />
            <ListItemText primary={categoryValuesItem.label} />
          </ListItem>
        ))}
      </Collapse>
    </FormControl>
  );
};

export { RecommendationsFilters as default };
