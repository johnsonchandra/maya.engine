import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';

import { Loading } from '/imports/ui/widgets/Bootstrap/Loading/Loading.js';
import { Grid, Row, Col, Thumbnail, Alert } from 'react-bootstrap';

import { goLink } from '/imports/modules/utils';

import { Product } from '/imports/api/product/product_collection';

const productThumbnail = (images) => {
  if(images){
    const thumbnail = _.findWhere(images,{imgType:'Thumbnail'});
    if(thumbnail && thumbnail.imgUrl)
      return thumbnail.imgUrl;
  };
  return Meteor.settings.public.defaultProductThumbnail;
};

const ProductCard = ({products}) => (
  products.length > 0 
  ? <Grid>
  		<Row>
        { products.map( (product) => (
        	<Col key={product._id} xs={12} md={4}>
        		<Thumbnail alt="Product Name" src={ productThumbnail(product.images) } onClick={ goLink.bind(this, '/product/'+product._id) }>
        			<h3>{ product.name }</h3>
              <p>{ product.shop().name }</p>
        			<p>{ product.currency } { product.unitPrice.toLocaleString() }</p>
        		</Thumbnail>
        	</Col>
        ))}
    </Row>
  </Grid>
  : <Alert bsStyle="warning">No Product found...</Alert>
);

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('listActiveProduct',Session.get('searchText'),10); //FIXME make infinite scroll
  if (subscription.ready()){
    const products = Product.find().fetch();
    onData(null, { products: products });
  }  
};

export default composeWithTracker(composer, Loading)(ProductCard);
