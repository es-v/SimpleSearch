FROM nginx:alpine


LABEL description="SimpleSearch"

RUN rm -rf /usr/share/nginx/html/* && \
    rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/

COPY . /usr/share/nginx/html/

WORKDIR /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]