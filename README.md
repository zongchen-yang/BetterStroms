# BetterStroms
Our team of four developed a client-side React web app in four weeks which contains product details, related products, reviews, and Q&A.

Product Details
This component will guide the customer through selecting a specific style and size to add to their cart. As such, portions of the Overview module, such as the image gallery and cart selection, will be specific to a SKU chosen as opposed to the overarching product.

Related Products
The Related Items & Comparison module will display two sets of related products.  The first set will be a list of products, determined internally, that are related to the product currently being viewed.  The second set will be a list, custom created by the user, of products which the user has grouped with the current product into an ‘outfit’.

Reviews
The Ratings & Reviews module will allow viewing and submission of reviews for the product selected. This component will extend the ability to write, read, and browse through reviews for the current product. All reviews will be saved per product.

Q&A
The Questions & Answers module will allow asking and answering of questions for the product selected. This component will extend the ability to view and search questions, ask questions, answer questions and provide feedback on questions about the current product. All questions will be asked and answered per product.

## Tech Stack
  °Javascript (ES5 & ES6)
  °React.js w/ React Hooks
  °Fetch/Axios,
  °localStorage
  °Webpack
  °Babel
  °Lighthouse
  °HTML, CSS
  °AWS(EC2, AMI)

## Setup
rename config.js.copy to config.js
add your github token
run npm install

## For client dev:
npm run react-dev

## Start server w/ nodemon:
npm run server-dev

## To test
npm run test