FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /etc/ssl/certificate.crt /etc/ssl/certificate.crt
COPY /etc/ssl/private.key /etc/ssl/private.key

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
