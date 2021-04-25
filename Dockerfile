FROM circleci/node:14-browsers

USER root
RUN mkdir /cypress && chmod 777 /cypress

VOLUME ["/cypress"]
