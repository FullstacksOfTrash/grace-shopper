import React from 'react'
import PropTypes from 'prop-types';
import { Select, MenuItem, InputLabel, FormControl, withStyles } from "@material-ui/core";

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class CategorySelector extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="category-selector">Categories</InputLabel>
          <Select
            value={this.props.value}
            onChange={this.props.handleChange}
            inputProps={{
              name: 'category',
              id: 'category-selector',
            }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {this.props.categories.map(category => {
              return (
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </form>
    );
  }
}

// ControlledOpenSelect.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(CategorySelector);