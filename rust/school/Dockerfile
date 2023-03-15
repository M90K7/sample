FROM alpine:3.17.2

COPY ./target/release /app

RUN chmod 0755 /app/school

ENTRYPOINT [ "/app/school" ]