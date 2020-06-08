# farm-to-table
A RESTful/CRUD application to demonstrate knowledge
<hr>
<h2>Farm To Table</h2>
In our ever changing world more people want to know where their food comes from.  The farm 2 table application will bring small farms in direct contact with the consumer.  The consumer can view products that are produced at a local farm and track how it was raised.  From the time it was born/planted/baked until the product is ready to harvest. The local farmer will be able to keep the consumer up-to-date with the growing/raising of the product by including notes about the products they are selling.
<hr>
<h2>Scope</h2>
The final application will allow the farm owner to display their products to the consumer and allow the consumer to purchase the products directly from the farm. It will also allow for the consumer to view the growth history of the products they purchased. The application will use the following technologies:
<ul>
  <li>HTML/CSS</li>
  <li>Javascript</li>
  <li>Node.js</li>
  <li>Mongo</li>
  <li>Mongoose</li>
</ul>
<hr>
<h2>Farm ~2~ Market Screenshots</h2>
<h3>Main Page</h3>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/F2MMain.png" width="500px">
<hr>
<h3>Product Display</h3>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/F2MProds.png" width="500px">
<hr>
<h3>Shopping Cart</h3>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/F2MCart.png" width="500px">
<hr>
<h3>Administration Main</h3>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/F2MAdmin.png" width="500px">
<hr>
<h3>Product Administration</h3>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/F2MAdProds.png" width="500px">
<hr>
<h3>Customer Administration</h3>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/F2MAdCusts.png" width="500px">
<hr>
<h2>User Stories</h2>
  <h4>Farm Owner (site owner):</h4>
  <ul>
    <li>create new products</li>
    <li>update existing products</li>
    <li>delete products</li>
    <li>manage customers</li>
  </ul>
  <h4>Consumers (site users):</h4>
  <ul>
    <li>view available products</li>
    <li>purchase products</li>
    <li>view product growth history</li>
  </ul>
<hr>
<h2>Milestones</h2>
  <h4>Sprint 1 – June 1st</h4>
  <ul>
    <li>file structure is created</li>
    <li>node server and mongodb is running</li>
    <li>routes are created</li>
    <li>data models are created</li>
    <li>all *.ejs page skeletons are in place</li>
    <li>header.ejs and footer.ejs are created and placed with *.ejs files</li>
    <li>gather all picture reference material</li>
  </ul>
  <h4>Sprint 2 – June 2nd</h4>
  <ul>
    <li>Product management page is completed with create, update, delete functionality.</li>
    <li>Landing page is completed</li>
    <li>All Products display display page is completed.</li>
    <li>Product description page is completed.</li>
    <li>About page is completed</li>
    <li>Commit to MASTER branch</li>
  </ul>
  <h4>Sprint 3 – June 3rd </h4>
  <ul>
    <li>All styling is completed.  Universal color pallet, fonts, inputs, buttons, etc</li>
    <li>Commit to MASTER branch</li>
    <li>User 'build your own basket' completed – stretch goal</li>
    <li>Commit to MASTER branch</li>
  </ul>
  <h4>Sprint 4 – June 4th </h4>
  <ul>
    <li>Complete shopping cart - stretch goal</li>
    <li>Commit to Master branch</li>
    <li>Complete News Letter signup page – stretch goal</li>
    <li>Commit to Master branch</li>
  </ul>
<hr>
<h2>Data Models</h2>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/Screen Shot 2020-06-07 at 12.28.31 PM.png">
<hr>
<h2>Views</h2>
<h3>/FarmShop (Public View)</h3>
<ul>
  <li>Index(Langing Page)</li>
  <li>View Products</li>
  <li>Show Products</li>
  <li>About</li>
  <li>Newsletter Signup</li>
  <li>SignIn (Stretch)</li>
  <li>View Cart (Stretch)</li>
  <li>User Profile (Stretch)</li>
</ul>
<h3>/Mgmt (Private View)</h3>
<ul>
  <li>ProductMgmt</li>
  <li>EditProduct</li>
  <li>NewProduct</li>
  <li>CustomerMgmt</li>
  <li>NewUpdateCustomer</li>
  <li>CustomerInvoice (Stretch)</li>
</ul>
<h4>Landing Page</h4>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/LandingPage.png">
<h4>View All Products</h4>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/AllProducts.png">
<h4>Show Product</h4>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/ShowPage.png">
<h4>About Page</h4>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/AboutPage.png">
<h4>Product Edit Page</h4>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/EditPage.png">
<h4>Product Management Page</h4>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/ProductMgmt.png">
<h4>Newletter Signup Page</h4>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/Newletter.png">
<h4>Sign In Page</h4>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/SignIn.png">
<h4>View Cart Page</h4>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/UserView.png">
<h4>User Profile Page</h4>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/ProfilePage.png">
<h4>New Customer Page</h4>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/NewCustomer.png">
<h4>Customer Management Page</h4>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/CustomerMgmt.png">
<h4>Customer Invoice Page</h4>
<img src="https://git.generalassemb.ly/JeffJackson/farm-to-table/blob/master/images/CustomerInvoice.png">
