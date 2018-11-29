FROM node:8-alpine
EXPOSE 3000
ENV INSTALL_PATH /

RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH
COPY . .
RUN npm install --only=production
