import React, { Component } from "react";
import { connect } from 'react-redux';

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: 640,
    boxShadow: theme.shadows[5],
    top: `50%`,
    left: `50%`,
    transform: 'translate(-50%, -50%)',
  }
});

class ProductModal extends Component {
  constructor() {
    super()
    this.state = {
      open: false
    };
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>

        <Button onClick={this.handleOpen}>
          <img
            src="https://d29mh04qrg9hzh.cloudfront.net/bmxbike_small.jpg"
            alt="an old red bmx bike"
            width="128"
          />
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
           <div 
            className={classes.paper}
          >
            <img
              src="https://d29mh04qrg9hzh.cloudfront.net/bmxbike_small.jpg"
              alt="an old red bmx bike"
              width="640"
            />
          </div>
        </Modal>
      </div>
    );
  }
}

ProductModal.propTypes = {
  classes: PropTypes.object.isRequired
};


export default connect()(withStyles(styles)(ProductModal));