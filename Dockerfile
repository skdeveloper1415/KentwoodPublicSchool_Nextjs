# build environment
FROM node:18.17.0-alpine as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN npm run build
# RUN npm run export

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=react-build /app/out /usr/share/nginx/html


ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"