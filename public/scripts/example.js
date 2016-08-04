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
    this.props.products.forEach(product => {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
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
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    );
  },
  render: function() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={this.handleChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            ref="inStockOnlyInput"
            onChange={this.handleChange}
          />
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
        this.setState({
          data: data,
          filterText: '',
          inStockOnly: false
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      data: [],
      filterText: '',
      inStockOnly: false
    };
  },
  componentDidMount: function() {
    this.loadProductsFromServer();
    setInterval(this.loadProductsFromServer, this.props.pollInterval);
  },
  handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },
  render: function() {
    return (
      <div className="filterableProductTable">
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onUserInput={this.handleUserInput}
        />
        <ProductTable
          products={this.state.data}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
});

ReactDOM.render(
  <FilterableProductTable url="/api/products" pollInterval={15000} />,
  document.getElementById('container')
);
