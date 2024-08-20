FROM node:18.16.0

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app

# Add a custom script to wait for MySQL container
# COPY wait-for-mysql.sh /app/wait-for-mysql.sh
# RUN chmod +x /app/wait-for-mysql.sh

EXPOSE 3000

CMD npm start
