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
//var NewBlock = React.createClass({
//  render: function() {
//    return (
//      <div>
//      </div>
//    );
//  }
//});
//
//
//ReactDOM.render(
//  <ItemsContainer url="/api/products" pollInterval={15000} />,
//  document.getElementById('container')
//);


var ProductCategoryRow = React.createClass({
  render: function() {
    return (
      <tr>
        <th colSpan="2">{this.props.category}</th>
      </tr>
    );
  }
});

var ProductRow = React.createClass({
  render: function() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

var ProductTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product){
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var SearchBar = React.createClass({
  render: function() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
});

var FilterableProductTable = React.createClass({
  loadProductsFromServer: function() {
    $.ajax({
      url: 'http://localhost:3002/api/products',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadProductsFromServer();
    setInterval(this.loadProductsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="filterableProductTable">
        <SearchBar />
        <ProductTable products={this.state.data} />
      </div>
    );
  }
});

ReactDOM.render(
  <FilterableProductTable url="/api/products" pollInterval={15000} />,
  document.getElementById('container')
);
