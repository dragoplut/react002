// React app 002

// Spare parts:
//
// loadFromServer
//
//$.ajax({
//  url: 'http://localhost:3002/api/products',
//  dataType: 'json',
//  cache: false,
//  success: function(data) {
//    this.setState({data: data});
//  }.bind(this),
//  error: function(xhr, status, err) {
//    console.error(this.props.url, status, err.toString());
//  }.bind(this)
//});
//
// handleSubmit
//
//var products = this.state.data;
//product.id = Date.now();
//var newProduct = products.concat([product]);
//this.setState({data: newProduct});
//$.ajax({
//  url: 'http://localhost:3002/api/products',
//  dataType: 'json',
//  type: 'POST',
//  data: product,
//  success: function(data) {
//    this.setState({data: data});
//  }.bind(this),
//  error: function(xhr, status, err) {
//    this.setState({data: products});
//    console.error(this.props.url, status, err.toString());
//  }.bind(this)
//});
//
//
//ReactDOM.render(
//  <ItemsContainer url="/api/products" pollInterval={15000} />,
//  document.getElementById('container')
//);


