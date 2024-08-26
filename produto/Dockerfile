FROM maven:3.6.3-openjdk-17 AS build

COPY . .

WORKDIR /

RUN mvn clean package

EXPOSE 8081

RUN ["mvn", ""]