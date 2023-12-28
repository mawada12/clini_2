FROM mysql:latest

# Set environment variables
ENV MYSQL_DATABASE clinic_reservation
ENV MYSQL_ALLOW_EMPTY_PASSWORD yes

# Copy any additional initialization scripts or configuration files
COPY . .
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the MySQL port
EXPOSE 3306
