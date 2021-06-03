FROM circleci/node:16-browsers

USER root
RUN mkdir /cypress && chmod 777 /cypress

VOLUME ["/cypress"]
