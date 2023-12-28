FROM mysql:latest

# Set environment variables
ENV MYSQL_DATABASE clinic_reservation
ENV MYSQL_USER root
ENV MYSQL_PASSWORD 1234

# Copy any additional initialization scripts or configuration files
COPY . .
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the MySQL port
EXPOSE 3306
