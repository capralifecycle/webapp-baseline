FROM circleci/node:15-browsers

USER root
RUN mkdir /cypress && chmod 777 /cypress

VOLUME ["/cypress"]
