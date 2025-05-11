# Command to start backend

1.Enter PostgreSQL connection string in .env
  example : DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"

2.Install Backend Dependencies
    cd backend
    npm install

3.Setup Prisma & DATABASE
    npx prisma generate        # Generate Prisma client
    npx prisma migrate dev     # Create and apply migrations
    npx prisma db seed         # (Optional) Seed DB if you have seeding set up

4. Run Backend Server
    npm run dev


# Command to start frontend

1. cd frontend
2. npm i
3. npm run dev