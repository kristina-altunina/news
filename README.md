# Northcoders News API

Follow these instructions to connect to the databases locally.

1. Clone the repository:
https://github.com/kristina-altunina/news.git

2. Go to the project directory and install the dependencies:
npm install


To connect to the databases locally, you will need to set up the environment variables. To do so: 

1. Create two .env files: .env.test and .env.development in the root of the project directory.

2. Into each file, add PGDATABASE=, with the correct database name for that environment:

In .env.development file add: 
PGDATABASE=nc_news

In .env.test file add:
PGDATABASE=nc_news_test

3. Double check that these .env files are .gitignored.

4. Once the environment variables have been set up, you are ready to work on the project.