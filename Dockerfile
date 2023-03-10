FROM rust AS build
WORKDIR /app
COPY . .
RUN cargo build --release


FROM debian:buster-slim
WORKDIR /app
COPY --from=build /app/target/release/apoor-dot-dev .

ENV APP_HOST=0.0.0.0
ENV APP_PORT=80

EXPOSE 80

CMD [ "./apoor-dot-dev" ]
