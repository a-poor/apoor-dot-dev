FROM rust AS build
WORKDIR /app
COPY . .
RUN cargo build --release

FROM alpine
WORKDIR /app
COPY --from=build /app/target/release/apoor-dot-dev .