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
    const { classes, imageUrl, productName } = this.props;

    return (
      <div>

        <Button onClick={this.handleOpen}>
          <img
            src={imageUrl}
            alt={productName}
            width="128"
          />
        </Button>
        <Modal
          aria-labelledby="product-modal"
          aria-describedby="product-image-modal"
          open={this.state.open}
          onClose={this.handleClose}
        >
           <div 
            className={classes.paper}
          >
            <img
              src={imageUrl}
              alt={productName}
              width="896"
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

const mapStateToProps = (state, {imageUrl, productName}) => ({
  state, imageUrl, productName
})

export default connect(mapStateToProps)(withStyles(styles)(ProductModal));