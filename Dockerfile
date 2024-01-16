# get base image
FROM node:20.11-alpine3.18

# create the working directory
RUN mkdir -p /home/ph_locale

# set the working directory
WORKDIR /home/ph_locale

# copy files onto the image
COPY . /home/ph_locale

# install dependencies
RUN npm i

# run the application
CMD ["node", "/home/ph_locale/app.js"]

# open the port
EXPOSE 2525