# BookSnuggle Web

## Demo

[![BookSnuggle Demo](https://img.youtube.com/vi/VAQ0hqFr4Lo/0.jpg)](https://www.youtube.com/watch?v=VAQ0hqFr4Lo "BookSnuggle Demo")

## Prerequisites

- Node.js (Latest LTS version recommended)
- Yarn or npm package manager

## Dependencies

This project uses the following main dependencies:
- Next.js 14.2
- React 18.2
- NextAuth.js 4.22
- TailwindCSS 3.4

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd booksnuggle-web
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Environment Setup**
   - Create a `.env.local` file in the root directory
   - Add necessary environment variables (contact team for required values)

4. **Running the Development Server**
   ```bash
   yarn dev
   # or
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

5. **Other Available Commands**
   ```bash
   # Build for production
   yarn build
   
   # Start production server
   yarn start
   
   # Run linting
   yarn lint
   ```

## Development Tools

The project includes several development dependencies:
- TypeScript for type safety
- ESLint for code linting
- PostCSS for CSS processing
- TailwindCSS for styling

## Notes

- The project uses Next.js with TypeScript configuration
- Authentication is handled through NextAuth.js
- Styling is managed with TailwindCSS
- Environment variables should never be committed to the repository

## Contributing

1. Make sure to install dependencies using yarn/npm
2. Create a new branch for your feature
3. Follow the existing code style and TypeScript conventions
4. Submit a pull request
