#!/bin/bash

echo "🚀 Setting up IDenclave 2.0 MVP..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."

# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd backend
npm install
cd ..

echo "✅ Dependencies installed successfully"

# Create environment file
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cp env.example .env
    echo "✅ Environment file created. Please edit .env with your configuration."
else
    echo "✅ Environment file already exists."
fi

# Setup database
echo "🗄️ Setting up database..."

cd backend

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Check if PostgreSQL is available
if command -v psql &> /dev/null; then
    echo "📊 PostgreSQL detected. You can run 'npm run db:migrate' to set up the database."
else
    echo "⚠️ PostgreSQL not detected. Please install PostgreSQL and update DATABASE_URL in .env"
fi

cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your configuration"
echo "2. Set up PostgreSQL database"
echo "3. Run 'npm run dev' to start development servers"
echo ""
echo "Frontend will be available at: http://localhost:3000"
echo "Backend API will be available at: http://localhost:4000"
echo ""
echo "Happy coding! 🚀"
