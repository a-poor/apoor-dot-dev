FROM rust:1-alpine3.16 AS build
WORKDIR /app
RUN apk add --update alpine-sdk
COPY . .
RUN cargo build --release


FROM alpine:3.16
COPY --from=build /app/target/release/apoor-dot-dev /apoor-dot-dev

ENV APP_HOST=0.0.0.0
ENV APP_PORT=80

EXPOSE 80

ENTRYPOINT [ "/apoor-dot-dev" ]
