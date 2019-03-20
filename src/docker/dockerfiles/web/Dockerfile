FROM nginx:1.14

RUN sed -i -e 's/worker_processes[ ]*1;/worker_processes auto;/' /etc/nginx/nginx.conf \
&&  rm -rf /etc/nginx/conf.d/*

ADD myapp.conf /etc/nginx/conf.d/
