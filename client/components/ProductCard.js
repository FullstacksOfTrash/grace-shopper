import React from 'react';
import { connect } from 'react-redux';
import { getProduct, getCart, lineItemFinder, tracker } from '../store/utils'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 300,
  },
  media: {
    height: 140,
  },
};

function ProductCard({ classes, product }) {
  // const { classes } = props;
  const { name, imageUrl, price } = product
  return (
    <Card className={classes.card}>
      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
        <CardActionArea >
          <CardMedia
            className={classes.media}
            image={imageUrl}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography component="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget arcu dictum varius duis at.
          </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small" color="primary" onClick={() => alert('Thanks for sharing our trash!')}>
          Share
        </Button>
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
          <Button size="small" color="primary">
            Learn More
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ products }, { id }) => ({
  products,
  product: getProduct(id, products)
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductCard));