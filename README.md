# Book Store

A modern, responsive web application for browsing, viewing, and purchasing books. Built with Angular and Angular Material, this app demonstrates a full e-commerce flow including book listing, detailed views, cart management, and checkout.

## Features

- **Book Catalog**: Browse a list of books with title, author, price, rating, and a short description.
- **Book Details**: View detailed information about each book, including author, description, genre, price, ratings, and more.
- **Add to Cart**: Add books to a shopping cart, adjust quantities, or remove items.
- **Cart Management**: View and manage your cart, including quantity adjustments and removal of books.
- **Checkout**: Review your order and place it with a single click. Cart is cleared after a successful order.
- **Order Success**: Confirmation screen after placing an order.
- **Persistent Cart**: Cart contents are stored in browser cookies for a seamless experience.
- **Responsive UI**: Built with Angular Material for a clean, mobile-friendly interface.

## Screenshots

> _Add screenshots here if desired (e.g., book list, book details, cart, checkout, order success)._ 

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Angular CLI](https://angular.dev/cli) (`npm install -g @angular/cli`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/book-store.git
   cd book-store
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
ng serve
```
Open your browser at [http://localhost:4200](http://localhost:4200) to view the app.

### Building for Production

To build the app for production:
```bash
ng build
```
The output will be in the `dist/` directory.

### Running Tests

To run unit tests:
```bash
ng test
```

## Project Structure

```
src/app/
  app.ts, app.html, app.scss      # Main app shell and layout
  app.routes.ts                   # Main route definitions
  features/
    book-list/                    # Book list feature (catalog)
    book-details/                 # Book details feature
    cart/                         # Cart feature (add/remove/adjust)
    checkout/                     # Checkout and order success
assets/
  book_data.json                  # Book data source
public/
  book_data.json                  # Book data (served at /book_data.json)
```

## Data Source

- Book data is loaded from a static JSON file (`public/book_data.json`).
- Each book includes fields like `title`, `author`, `ISBN`, `genre`, `price`, `ratings`, and more.
- No backend or API is required; all data is loaded client-side.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Deployment to GitHub Pages

To deploy this Angular app to GitHub Pages:

1. Install the deploy tool (if not already):
   ```bash
   npm install -g angular-cli-ghpages
   ```
2. Build the project with the correct base href:
   ```bash
   ng build --base-href "/book-store/"
   ```
3. Deploy to GitHub Pages:
   ```bash
   npx angular-cli-ghpages --dir=dist/book-store
   ```

Your app will be available at: `https://<your-github-username>.github.io/book-store/`
